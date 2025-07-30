from fastapi import FastAPI, HTTPException, Depends, status, BackgroundTasks, Query  # << 1. IMPORTADO AQUI
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, Field, EmailStr, root_validator
from typing import List, Optional, Annotated
from services.email_service import enviar_newsletter_customizada
import sqlite3
from datetime import timedelta, date
import uuid
import models
from auth import (
    pwd_context,
    verify_password,
    create_access_token,
    get_current_active_user,
    get_current_admin_user,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

# --- Configuração da Aplicação ---
app = FastAPI(
    title="API de Notícias GEM",
    description="API para gerenciar publicações e usuários com diferentes níveis de acesso.",
    version="1.3.1"
)


# --- Modelos Pydantic (DTOs) ---
# ... (todos os seus modelos permanecem iguais)
# Modelos de Usuário
class UsuarioBase(BaseModel):
    nome: str
    email: EmailStr
    fotoPerfilUrl: Optional[str] = None


class UsuarioCreate(UsuarioBase):
    senha: str
    role: str = Field("COMUM", pattern="^(ADMIN|COMUM)$")


class Usuario(UsuarioBase):
    id: uuid.UUID
    role: str
    inscritoNewsletter: bool

    class Config:
        from_attributes = True


class UsuarioUpdate(BaseModel):
    nome: Optional[str] = None
    fotoPerfilUrl: Optional[str] = None
    senha: Optional[str] = None


class UsuarioUpdateAdmin(UsuarioUpdate):
    role: Optional[str] = Field(None, pattern="^(ADMIN|COMUM)$")
    inscritoNewsletter: Optional[bool] = None


# Modelo da Newsletter
class NewsletterCustomSchema(BaseModel):
    assunto: str
    corpo_html: Optional[str] = Field(None,
                                      description="Conteúdo completo do e-mail em HTML. Se fornecido, ignora os outros campos de corpo.")
    corpo_texto: Optional[str] = Field(None,
                                       description="Corpo do e-mail em texto simples. Pode ser combinado com imagens.")
    imagens_urls: Optional[List[str]] = Field(None, description="Lista de URLs de imagens a serem incluídas no e-mail.")

    @root_validator(pre=True)
    def check_content_provided(cls, values):
        """Valida se pelo menos um tipo de conteúdo foi enviado."""
        if not values.get('corpo_html') and not values.get('corpo_texto'):
            raise ValueError('É necessário fornecer ou "corpo_html" ou "corpo_texto".')
        return values


# Modelos de Subgrupo
class SubgrupoBase(BaseModel):
    nome: str
    descricao: Optional[str] = None


class SubgrupoCreate(SubgrupoBase):
    pass


class SubgrupoUpdate(SubgrupoBase):
    pass


class Subgrupo(SubgrupoBase):
    id: uuid.UUID

    class Config:
        from_attributes = True


# Modelos de Publicação
class PublicacaoBase(BaseModel):
    titulo: str
    conteudo: str = Field(..., description="Conteúdo principal da publicação")
    descricao: str = Field(..., description="Uma breve descrição ou resumo da publicação")
    autor: str = Field(..., description="Nome do autor (texto livre)")
    subgrupoId: uuid.UUID


class PublicacaoCreate(PublicacaoBase):
    pass


class PublicacaoUpdate(PublicacaoBase):
    pass


class Publicacao(PublicacaoBase):
    id: uuid.UUID
    dataPublicacao: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


# --- Dependências ---
def get_db():
    db = models.get_db_connection()
    try:
        yield db
    finally:
        db.close()


# --- Eventos de Inicialização ---
@app.on_event("startup")
async def startup_event():
    print("Iniciando aplicação e configurando o banco de dados...")
    models.create_tables()
    models.create_default_admin()


# --- Endpoints ---

# =================================================================
# 1. Autenticação (Sem alterações)
# =================================================================
@app.post("/login", response_model=Token, tags=["Autenticação"])
def login_for_access_token(form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
                           db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("SELECT id, email, senha, role FROM usuarios WHERE email = ?", (form_data.username,))
    user = cursor.fetchone()
    if not user or not verify_password(form_data.password, user["senha"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou senha incorretos",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user["email"], "role": user["role"]}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


# =================================================================
# 2. Perfil de Usuário (Sem alterações)
# =================================================================
@app.get("/usuarios/me", response_model=Usuario, tags=["Perfil de Usuário"])
def read_users_me(current_user: Annotated[Usuario, Depends(get_current_active_user)]):
    return current_user


@app.put("/usuarios/me", response_model=Usuario, tags=["Perfil de Usuário"])
def update_own_user(
        user_update: UsuarioUpdate,
        current_user: Annotated[Usuario, Depends(get_current_active_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    update_fields = user_update.model_dump(exclude_unset=True)
    if "senha" in update_fields and update_fields["senha"]:
        update_fields["senha"] = pwd_context.hash(update_fields["senha"])
    else:
        update_fields.pop("senha", None)

    set_clause = ", ".join([f"{field} = ?" for field in update_fields.keys()])
    values = list(update_fields.values())
    values.append(str(current_user.id))

    db.execute(f"UPDATE usuarios SET {set_clause} WHERE id = ?", tuple(values))
    db.commit()

    updated_user_cursor = db.execute("SELECT * FROM usuarios WHERE id = ?", (str(current_user.id),))
    return Usuario.model_validate(dict(updated_user_cursor.fetchone()))


@app.put("/usuarios/me/newsletter", response_model=Usuario, tags=["Perfil de Usuário"])
def update_newsletter_subscription(
        inscrever: bool,
        current_user: Annotated[Usuario, Depends(get_current_active_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    db.execute("UPDATE usuarios SET inscritoNewsletter = ? WHERE id = ?", (inscrever, str(current_user.id)))
    db.commit()

    updated_user_cursor = db.execute("SELECT * FROM usuarios WHERE id = ?", (str(current_user.id),))
    return Usuario.model_validate(dict(updated_user_cursor.fetchone()))


# =================================================================
# 3. CRUD de Subgrupos (Sem alterações)
# =================================================================
@app.get("/subgrupos", response_model=List[Subgrupo], tags=["Subgrupos"])
def listar_subgrupos(db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("SELECT id, nome, descricao FROM subgrupos")
    return [Subgrupo.model_validate(dict(row)) for row in cursor.fetchall()]


@app.get("/subgrupos/{subgrupo_id}", response_model=Subgrupo, tags=["Subgrupos"])
def obter_subgrupo(subgrupo_id: uuid.UUID, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("SELECT * FROM subgrupos WHERE id = ?", (str(subgrupo_id),))
    subgrupo = cursor.fetchone()
    if not subgrupo:
        raise HTTPException(status_code=404, detail="Subgrupo não encontrado.")
    return Subgrupo.model_validate(dict(subgrupo))


@app.post("/subgrupos", response_model=Subgrupo, status_code=status.HTTP_201_CREATED, tags=["Subgrupos (Admin)"])
def criar_subgrupo(
        subgrupo: SubgrupoCreate,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    subgrupo_id = str(uuid.uuid4())
    try:
        db.execute("INSERT INTO subgrupos (id, nome, descricao) VALUES (?, ?, ?)",
                   (subgrupo_id, subgrupo.nome, subgrupo.descricao))
        db.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Um subgrupo com este nome já existe.")
    return Subgrupo(id=subgrupo_id, **subgrupo.model_dump())


@app.put("/subgrupos/{subgrupo_id}", response_model=Subgrupo, tags=["Subgrupos (Admin)"])
def atualizar_subgrupo(
        subgrupo_id: uuid.UUID,
        subgrupo_update: SubgrupoUpdate,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    db.execute("UPDATE subgrupos SET nome = ?, descricao = ? WHERE id = ?",
               (subgrupo_update.nome, subgrupo_update.descricao, str(subgrupo_id)))
    db.commit()
    return obter_subgrupo(subgrupo_id, db)


@app.delete("/subgrupos/{subgrupo_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Subgrupos (Admin)"])
def deletar_subgrupo(
        subgrupo_id: uuid.UUID,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    db.execute("DELETE FROM subgrupos WHERE id = ?", (str(subgrupo_id),))
    db.commit()
    return


# =================================================================
# 4. CRUD de Publicações (Endpoint de listagem CORRIGIDO)
# =================================================================

@app.get("/publicacoes", response_model=List[Publicacao], tags=["Publicações"])
def listar_publicacoes(
        subgrupo_id: Optional[uuid.UUID] = Query(None, description="Filtra por um subgrupo específico."),
        ano: Optional[int] = Query(None, description="Filtra por ano de publicação."),
        mes: Optional[int] = Query(None, description="Filtra por mês de publicação (requer 'ano')."),
        data_inicio: Optional[date] = Query(None, description="Filtra por data de início (formato: AAAA-MM-DD)."),
        data_fim: Optional[date] = Query(None, description="Filtra por data de fim (formato: AAAA-MM-DD)."),
        db: sqlite3.Connection = Depends(get_db)
):
    if mes and not ano:
        raise HTTPException(status_code=400, detail="O filtro por 'mes' requer que o 'ano' também seja fornecido.")

    query = "SELECT * FROM publicacoes WHERE 1=1"
    params = []

    if subgrupo_id:
        query += " AND subgrupoId = ?"
        params.append(str(subgrupo_id))
    if ano:
        query += " AND strftime('%Y', dataPublicacao) = ?"
        params.append(str(ano))
    if mes:
        mes_formatado = f"{mes:02d}"
        query += " AND strftime('%m', dataPublicacao) = ?"
        params.append(mes_formatado)
    if data_inicio and data_fim:
        query += " AND DATE(dataPublicacao) BETWEEN ? AND ?"
        params.extend([data_inicio.strftime('%Y-%m-%d'), data_fim.strftime('%Y-%m-%d')])
    elif data_inicio:
        query += " AND DATE(dataPublicacao) >= ?"
        params.append(data_inicio.strftime('%Y-%m-%d'))
    elif data_fim:
        query += " AND DATE(dataPublicacao) <= ?"
        params.append(data_fim.strftime('%Y-%m-%d'))

    query += " ORDER BY dataPublicacao DESC"

    cursor = db.execute(query, tuple(params))
    publicacoes = cursor.fetchall()
    return [Publicacao.model_validate(dict(p)) for p in publicacoes]


@app.get("/publicacoes/{publicacao_id}", response_model=Publicacao, tags=["Publicações"])
def obter_publicacao(publicacao_id: uuid.UUID, db: sqlite3.Connection = Depends(get_db)):
    cursor = db.execute("SELECT * FROM publicacoes WHERE id = ?", (str(publicacao_id),))
    publicacao = cursor.fetchone()
    if not publicacao:
        raise HTTPException(status_code=404, detail="Publicação não encontrada.")
    return Publicacao.model_validate(dict(publicacao))


@app.post("/publicacoes", response_model=Publicacao, status_code=status.HTTP_201_CREATED, tags=["Publicações (Admin)"])
def criar_publicacao(
        publicacao: PublicacaoCreate,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    cursor = db.execute("SELECT id FROM subgrupos WHERE id = ?", (str(publicacao.subgrupoId),))
    if not cursor.fetchone():
        raise HTTPException(status_code=404, detail="Subgrupo não encontrado.")

    pub_id = str(uuid.uuid4())
    db.execute(
        "INSERT INTO publicacoes (id, titulo, conteudo, descricao, autor, subgrupoId) VALUES (?, ?, ?, ?, ?, ?)",
        (
            pub_id,
            publicacao.titulo,
            publicacao.conteudo,
            publicacao.descricao,
            publicacao.autor,
            str(publicacao.subgrupoId)
        )
    )
    db.commit()

    return obter_publicacao(pub_id, db)


@app.put("/publicacoes/{publicacao_id}", response_model=Publicacao, tags=["Publicações (Admin)"])
def atualizar_publicacao(
        publicacao_id: uuid.UUID,
        publicacao_update: PublicacaoUpdate,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    db.execute(
        "UPDATE publicacoes SET titulo = ?, conteudo = ?, descricao = ?, autor = ?, subgrupoId = ? WHERE id = ?",
        (
            publicacao_update.titulo,
            publicacao_update.conteudo,
            publicacao_update.descricao,
            publicacao_update.autor,
            str(publicacao_update.subgrupoId),
            str(publicacao_id)
        )
    )
    db.commit()
    return obter_publicacao(publicacao_id, db)


@app.delete("/publicacoes/{publicacao_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Publicações (Admin)"])
def deletar_publicacao(
        publicacao_id: uuid.UUID,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    db.execute("DELETE FROM publicacoes WHERE id = ?", (str(publicacao_id),))
    db.commit()
    return


# =================================================================
# 5. CRUD de Usuários (Sem alterações)
# =================================================================
@app.get("/usuarios", response_model=List[Usuario], tags=["Usuários (Admin)"])
def listar_usuarios(
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    cursor = db.execute("SELECT * FROM usuarios")
    return [Usuario.model_validate(dict(row)) for row in cursor.fetchall()]


@app.post("/usuarios", response_model=Usuario, status_code=status.HTTP_201_CREATED, tags=["Usuários (Admin)"])
def criar_usuario(
        usuario: UsuarioCreate,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    user_id = str(uuid.uuid4())
    hashed_password = pwd_context.hash(usuario.senha)
    try:
        db.execute("INSERT INTO usuarios (id, nome, email, senha, fotoPerfilUrl, role) VALUES (?, ?, ?, ?, ?, ?)",
                   (user_id, usuario.nome, usuario.email, hashed_password, usuario.fotoPerfilUrl, usuario.role))
        db.commit()
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="O email fornecido já está em uso.")

    new_user_cursor = db.execute("SELECT * FROM usuarios WHERE id = ?", (user_id,))
    return Usuario.model_validate(dict(new_user_cursor.fetchone()))


@app.get("/usuarios/{usuario_id}", response_model=Usuario, tags=["Usuários (Admin)"])
def obter_usuario(
        usuario_id: uuid.UUID,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    cursor = db.execute("SELECT * FROM usuarios WHERE id = ?", (str(usuario_id),))
    user = cursor.fetchone()
    if not user:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.")
    return Usuario.model_validate(dict(user))


@app.put("/usuarios/{usuario_id}", response_model=Usuario, tags=["Usuários (Admin)"])
def atualizar_usuario(
        usuario_id: uuid.UUID,
        user_update: UsuarioUpdateAdmin,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    update_fields = user_update.model_dump(exclude_unset=True)
    if "senha" in update_fields and update_fields["senha"]:
        update_fields["senha"] = pwd_context.hash(update_fields["senha"])
    else:
        update_fields.pop("senha", None)

    if not update_fields:
        raise HTTPException(status_code=400, detail="Nenhum campo para atualizar foi fornecido.")

    set_clause = ", ".join([f"{field} = ?" for field in update_fields.keys()])
    values = list(update_fields.values())
    values.append(str(usuario_id))

    db.execute(f"UPDATE usuarios SET {set_clause} WHERE id = ?", tuple(values))
    db.commit()
    return obter_usuario(usuario_id, current_admin, db)


@app.delete("/usuarios/{usuario_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["Usuários (Admin)"])
def deletar_usuario(
        usuario_id: uuid.UUID,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    if str(usuario_id) == str(current_admin.id):
        raise HTTPException(status_code=400, detail="Um administrador não pode deletar a própria conta.")
    db.execute("DELETE FROM usuarios WHERE id = ?", (str(usuario_id),))
    db.commit()
    return


# =================================================================
# 6. Newsletter (Sem alterações)
# =================================================================
@app.post("/newsletter/enviar", status_code=status.HTTP_202_ACCEPTED, tags=["Newsletter (Admin)"])
def enviar_newsletter_customizada_endpoint(
        newsletter: NewsletterCustomSchema,
        background_tasks: BackgroundTasks,
        current_admin: Annotated[Usuario, Depends(get_current_admin_user)],
        db: sqlite3.Connection = Depends(get_db)
):
    cursor_users = db.execute("SELECT email FROM usuarios WHERE inscritoNewsletter = 1")
    assinantes = [row['email'] for row in cursor_users.fetchall()]
    if not assinantes:
        raise HTTPException(status_code=404, detail="Nenhum assinante encontrado.")

    for email in assinantes:
        background_tasks.add_task(
            enviar_newsletter_customizada,
            destinatario=email,
            assunto=newsletter.assunto,
            corpo_html=newsletter.corpo_html,
            corpo_texto=newsletter.corpo_texto,
            imagens_urls=newsletter.imagens_urls
        )

    return {"message": f"Envio da newsletter '{newsletter.assunto}' iniciado para {len(assinantes)} assinante(s)."}


# =================================================================
# 7. Root (Sem alterações)
# =================================================================
@app.get("/", tags=["Root"])
async def root():
    return {"message": "Bem-vindo à API de Notícias GEM!"}