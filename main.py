from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel
from typing import List, Optional, Annotated
import sqlite3
from datetime import date, timedelta, timezone, datetime 
import models 
from passlib.context import CryptContext 
from jose import JWTError, jwt 

# --- Configurações de Segurança ---
SECRET_KEY = "SUA_CHAVE_SECRETA_MUITO_FORTE_AQUI" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Contexto Passlib para hashing de senha usando Argon2
# Certifique-se de que 'argon2-cffi' está no seu requirements.txt
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# --- Configuração da Aplicação ---
app = FastAPI(
    title="Site GEM API",
    description="API para gerenciar dados do Grupo Economia do Mar, com autenticação Argon2.",
    version="0.3.1" # Versão incrementada
)

# --- Modelos Pydantic ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel): 
    email: Optional[str] = None

class UserBase(BaseModel):
    email_integrante: str
    nome_integrante: str
    id_subgrupo: Optional[int] = None

class UserCreate(UserBase):
    password: str 
    role: str = "membro"

class UserInDB(UserBase):
    id_integrante: int
    role: str

    class Config:
        from_attributes = True 

class SubgrupoBase(BaseModel):
    nome_subgrupo: str

class SubgrupoCreate(SubgrupoBase):
    pass

class Subgrupo(SubgrupoBase):
    id_subgrupo: int

    class Config:
        from_attributes = True

class PublicacaoBase(BaseModel):
    titulo: str
    tipo: str
    data_publicacao: Optional[date] = None
    id_subgrupo: Optional[int] = None

class PublicacaoCreate(PublicacaoBase):
    pass

class Publicacao(PublicacaoBase):
    id_publicacao: int

    class Config:
        from_attributes = True

# --- Funções de Dependência (para gerenciar a conexão com o BD) ---
def get_db():
    db = models.get_db_connection()
    try:
        yield db
    finally:
        db.close()

# --- Funções Utilitárias de Autenticação ---
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password): # Não usado diretamente aqui, mas models.py usa um similar
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user_from_db(email: str, db: sqlite3.Connection) -> Optional[UserInDB]:
    cursor = db.execute("SELECT id_integrante, nome_integrante, email_integrante, role FROM integrantes WHERE email_integrante = ?", (email,))
    user_data_row = cursor.fetchone() # user_data_row é um sqlite3.Row
    if user_data_row:
        # Converter sqlite3.Row para um dicionário antes de passar para Pydantic
        user_data_dict = dict(user_data_row)
        return UserInDB.model_validate(user_data_dict) # Usar model_validate para Pydantic v2
    return None

def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: sqlite3.Connection = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais",
        headers={"WWW-Authenticate": "Bearer"},
    )
    email_from_payload: str
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email_from_token: Optional[str] = payload.get("sub")
        if email_from_token is None:
            raise credentials_exception
        email_from_payload = email_from_token
    except JWTError:
        raise credentials_exception
    
    user = get_user_from_db(email=email_from_payload, db=db) 
    if user is None:
        raise credentials_exception
    return user

def get_current_active_user(current_user: Annotated[UserInDB, Depends(get_current_user)]):
    return current_user

def get_current_admin_user(current_user: Annotated[UserInDB, Depends(get_current_active_user)]):
    if current_user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Permissão negada. Requer privilégios de administrador.")
    return current_user

# --- Inicialização ---
@app.on_event("startup")
async def startup_event(): 
    print("Iniciando aplicação e verificando tabelas do banco de dados...")
    models.create_tables() 
    print("Tabelas verificadas/criadas.")
    print("Verificando/Criando usuário administrador padrão...")
    # IMPORTANTE: A função models.create_default_admin() (no seu arquivo models.py)
    # deve usar o mesmo esquema de hashing de senha (Argon2) que o pwd_context aqui.
    models.create_default_admin() 

# --- Endpoint de Autenticação (Login) ---
@app.post("/token", response_model=Token, tags=["Autenticação"])
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("SELECT id_integrante, nome_integrante, email_integrante, role, hashed_password FROM integrantes WHERE email_integrante = ?", (form_data.username,))
    user_db_row = cursor.fetchone() 
    if not user_db_row or not verify_password(form_data.password, user_db_row["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user_db_row["email_integrante"], "role": user_db_row["role"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# --- Endpoint de Teste de Usuário Autenticado ---
@app.get("/users/me/", response_model=UserInDB, tags=["Usuários"])
def read_users_me(current_user: Annotated[UserInDB, Depends(get_current_active_user)]):
    return current_user

# --- Endpoints da API (CRUD) ---
@app.post("/subgrupos/", response_model=Subgrupo, status_code=201, tags=["Subgrupos"])
def criar_subgrupo(subgrupo: SubgrupoCreate, 
                     db: sqlite3.Connection = Depends(get_db),
                     current_admin: UserInDB = Depends(get_current_admin_user)):
    try:
        cursor = db.execute("INSERT INTO subgrupo (nome_subgrupo) VALUES (?)", (subgrupo.nome_subgrupo,))
        db.commit()
        id_subgrupo_criado = cursor.lastrowid
        created_subgrupo_row = db.execute("SELECT id_subgrupo, nome_subgrupo FROM subgrupo WHERE id_subgrupo = ?", (id_subgrupo_criado,)).fetchone()
        if created_subgrupo_row:
            return Subgrupo.model_validate(dict(created_subgrupo_row))
        raise HTTPException(status_code=500, detail="Erro ao buscar subgrupo após criação.")
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Subgrupo com este nome já existe.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao criar subgrupo: {str(e)}")

@app.get("/subgrupos/", response_model=List[Subgrupo], tags=["Subgrupos"])
def listar_subgrupos(db: sqlite3.Connection = Depends(get_db)): 
    cursor = db.execute("SELECT id_subgrupo, nome_subgrupo FROM subgrupo")
    subgrupos_rows = cursor.fetchall()
    return [Subgrupo.model_validate(dict(s_row)) for s_row in subgrupos_rows]

@app.get("/subgrupos/{id_subgrupo}", response_model=Subgrupo, tags=["Subgrupos"])
def obter_subgrupo(id_subgrupo: int, db: sqlite3.Connection = Depends(get_db)): 
    cursor = db.execute("SELECT id_subgrupo, nome_subgrupo FROM subgrupo WHERE id_subgrupo = ?", (id_subgrupo,))
    subgrupo_row = cursor.fetchone()
    if subgrupo_row is None:
        raise HTTPException(status_code=404, detail="Subgrupo não encontrado.")
    return Subgrupo.model_validate(dict(subgrupo_row))

@app.put("/subgrupos/{id_subgrupo}", response_model=Subgrupo, tags=["Subgrupos"])
def atualizar_subgrupo(id_subgrupo: int, subgrupo_update: SubgrupoCreate,
                        db: sqlite3.Connection = Depends(get_db),
                        current_admin: UserInDB = Depends(get_current_admin_user)): 
    cursor = db.execute("SELECT * FROM subgrupo WHERE id_subgrupo = ?", (id_subgrupo,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Subgrupo não encontrado para atualização.")
    try:
        db.execute("UPDATE subgrupo SET nome_subgrupo = ? WHERE id_subgrupo = ?", (subgrupo_update.nome_subgrupo, id_subgrupo))
        db.commit()
        updated_subgrupo_row = db.execute("SELECT id_subgrupo, nome_subgrupo FROM subgrupo WHERE id_subgrupo = ?", (id_subgrupo,)).fetchone()
        if updated_subgrupo_row:
            return Subgrupo.model_validate(dict(updated_subgrupo_row))
        raise HTTPException(status_code=500, detail="Erro ao buscar subgrupo após atualização.")
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Já existe um subgrupo com este nome.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao atualizar subgrupo: {str(e)}")

@app.delete("/subgrupos/{id_subgrupo}", status_code=status.HTTP_204_NO_CONTENT, tags=["Subgrupos"])
def deletar_subgrupo(id_subgrupo: int,
                       db: sqlite3.Connection = Depends(get_db),
                       current_admin: UserInDB = Depends(get_current_admin_user)): 
    cursor = db.execute("SELECT * FROM subgrupo WHERE id_subgrupo = ?", (id_subgrupo,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Subgrupo não encontrado para deleção.")
    try:
        db.execute("DELETE FROM subgrupo WHERE id_subgrupo = ?", (id_subgrupo,))
        db.commit()
    except sqlite3.IntegrityError as e: 
         raise HTTPException(status_code=400, detail=f"Erro ao deletar subgrupo: {str(e)}. Verifique se ele não está associado a publicações.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao deletar subgrupo: {str(e)}.")

@app.post("/publicacoes/", response_model=Publicacao, status_code=201, tags=["Publicações"])
def criar_publicacao(publicacao: PublicacaoCreate, 
                       db: sqlite3.Connection = Depends(get_db),
                       current_admin: UserInDB = Depends(get_current_admin_user)): 
    if publicacao.id_subgrupo:
        cursor_subgrupo = db.execute("SELECT id_subgrupo FROM subgrupo WHERE id_subgrupo = ?", (publicacao.id_subgrupo,))
        if cursor_subgrupo.fetchone() is None:
            raise HTTPException(status_code=404, detail=f"Subgrupo com id {publicacao.id_subgrupo} não encontrado.")
    try:
        cursor = db.execute(
            "INSERT INTO publicacao (titulo, tipo, data_publicacao, id_subgrupo) VALUES (?, ?, ?, ?)",
            (publicacao.titulo, publicacao.tipo, publicacao.data_publicacao, publicacao.id_subgrupo)
        )
        db.commit()
        id_publicacao_criada = cursor.lastrowid
        created_publicacao_row = db.execute("SELECT * FROM publicacao WHERE id_publicacao = ?", (id_publicacao_criada,)).fetchone()
        if created_publicacao_row:
            return Publicacao.model_validate(dict(created_publicacao_row))
        raise HTTPException(status_code=500, detail="Erro ao buscar publicação após criação.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno ao criar publicação: {str(e)}")

@app.get("/publicacoes/", response_model=List[Publicacao], tags=["Publicações"])
def listar_publicacoes(skip: int = 0, limit: int = 100, db: sqlite3.Connection = Depends(get_db)): 
    cursor = db.execute("SELECT * FROM publicacao LIMIT ? OFFSET ?", (limit, skip))
    publicacoes_rows = cursor.fetchall()
    return [Publicacao.model_validate(dict(p_row)) for p_row in publicacoes_rows]

@app.get("/publicacoes/{id_publicacao}", response_model=Publicacao, tags=["Publicações"])
def obter_publicacao(id_publicacao: int, db: sqlite3.Connection = Depends(get_db)): 
    cursor = db.execute("SELECT * FROM publicacao WHERE id_publicacao = ?", (id_publicacao,))
    publicacao_row = cursor.fetchone()
    if publicacao_row is None:
        raise HTTPException(status_code=404, detail="Publicação não encontrada.")
    return Publicacao.model_validate(dict(publicacao_row))

@app.put("/publicacoes/{id_publicacao}", response_model=Publicacao, tags=["Publicações"])
def atualizar_publicacao(id_publicacao: int, publicacao_update: PublicacaoCreate,
                          db: sqlite3.Connection = Depends(get_db),
                          current_admin: UserInDB = Depends(get_current_admin_user)): 
    cursor = db.execute("SELECT * FROM publicacao WHERE id_publicacao = ?", (id_publicacao,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Publicação não encontrada para atualização.")
    if publicacao_update.id_subgrupo:
        cursor_subgrupo = db.execute("SELECT id_subgrupo FROM subgrupo WHERE id_subgrupo = ?", (publicacao_update.id_subgrupo,))
        if cursor_subgrupo.fetchone() is None:
            raise HTTPException(status_code=404, detail=f"Subgrupo com id {publicacao_update.id_subgrupo} não encontrado para associação.")
    try:
        db.execute(
            """UPDATE publicacao SET titulo = ?, tipo = ?, data_publicacao = ?, id_subgrupo = ?
               WHERE id_publicacao = ?""",
            (publicacao_update.titulo, publicacao_update.tipo, publicacao_update.data_publicacao, publicacao_update.id_subgrupo, id_publicacao)
        )
        db.commit()
        updated_publicacao_row = db.execute("SELECT * FROM publicacao WHERE id_publicacao = ?", (id_publicacao,)).fetchone()
        if updated_publicacao_row:
            return Publicacao.model_validate(dict(updated_publicacao_row))
        raise HTTPException(status_code=500, detail="Erro ao buscar publicação após atualização.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno ao atualizar publicação: {str(e)}")

@app.delete("/publicacoes/{id_publicacao}", status_code=status.HTTP_204_NO_CONTENT, tags=["Publicações"])
def deletar_publicacao(id_publicacao: int,
                         db: sqlite3.Connection = Depends(get_db),
                         current_admin: UserInDB = Depends(get_current_admin_user)): 
    cursor = db.execute("SELECT * FROM publicacao WHERE id_publicacao = ?", (id_publicacao,))
    if cursor.fetchone() is None:
        raise HTTPException(status_code=404, detail="Publicação não encontrada para deleção.")
    try:
        db.execute("DELETE FROM publicacao WHERE id_publicacao = ?", (id_publicacao,))
        db.commit()
    except sqlite3.IntegrityError as e: 
        raise HTTPException(status_code=400, detail=f"Erro ao deletar publicação: {str(e)}. Verifique se não está associada a downloads.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro interno ao deletar publicação: {str(e)}")

@app.get("/", tags=["Root"])
async def root(): 
    return {
        "message": "Bem-vindo à API do Site GEM!",
        "docs_url": "/docs",
        "redoc_url": "/redoc"
    }
