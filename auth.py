from datetime import datetime, timezone, timedelta

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from typing import Optional, Annotated
import sqlite3
import uuid

import models

# --- Configurações de Segurança ---
SECRET_KEY = "SUA_CHAVE_SECRETA_MUITO_FORTE_AQUI"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Contexto para hashing de senha
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# --- Modelos Pydantic para Autenticação ---
class TokenData(BaseModel):
    email: Optional[str] = None
    role: Optional[str] = None

class UsuarioAuth(BaseModel):
    id: uuid.UUID
    nome: str
    email: str
    role: str
    inscritoNewsletter: bool

    class Config:
        from_attributes = True

# --- Funções Utilitárias de Autenticação ---
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user_from_db(email: str, db: sqlite3.Connection) -> Optional[UsuarioAuth]:
    cursor = db.execute("SELECT * FROM usuarios WHERE email = ?", (email,))
    user_data = cursor.fetchone()
    if user_data:
        return UsuarioAuth.model_validate(dict(user_data))
    return None

# --- Dependências de Autorização ---
def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: sqlite3.Connection = Depends(models.get_db_connection)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Não foi possível validar as credenciais.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        role: str = payload.get("role")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email, role=role)
    except JWTError:
        raise credentials_exception

    user = get_user_from_db(email=token_data.email, db=db)
    if user is None:
        raise credentials_exception
    return user

def get_current_active_user(current_user: Annotated[UsuarioAuth, Depends(get_current_user)]):
    return current_user

def get_current_admin_user(current_user: Annotated[UsuarioAuth, Depends(get_current_active_user)]):
    if current_user.role != "ADMIN":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Permissão negada. Requer privilégios de administrador."
        )
    return current_user