import sqlite3
import os
import uuid
from passlib.context import CryptContext

# Define o caminho para o arquivo do banco de dados
DATABASE_URL = os.path.join(os.path.dirname(__file__), "site_gem_refatorado.db")
ADMIN_EMAIL = "admin@example.com"
ADMIN_PASSWORD = "adminpassword"

# Contexto Passlib para hashing de senha usando Argon2
pwd_context_models = CryptContext(schemes=["argon2"], deprecated="auto")

def get_db_connection():
    """Cria e retorna uma conexão com o banco de dados SQLite."""
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    """Cria as tabelas no banco de dados se elas não existirem."""
    conn = get_db_connection()
    cur = conn.cursor()

    # Tabela de Usuários
    cur.execute("""
        CREATE TABLE IF NOT EXISTS usuarios (
            id TEXT PRIMARY KEY,
            nome TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            senha TEXT NOT NULL,
            fotoPerfilUrl TEXT,
            role TEXT NOT NULL CHECK(role IN ('ADMIN', 'COMUM')),
            inscritoNewsletter BOOLEAN NOT NULL DEFAULT 0
        )
    """)

    # Tabela de Subgrupos de Publicação
    cur.execute("""
        CREATE TABLE IF NOT EXISTS subgrupos (
            id TEXT PRIMARY KEY,
            nome TEXT UNIQUE NOT NULL,
            descricao TEXT
        )
    """)

    # Tabela de Publicações
    cur.execute("""
        CREATE TABLE IF NOT EXISTS publicacoes (
            id TEXT PRIMARY KEY,
            titulo TEXT NOT NULL,
            conteudo TEXT NOT NULL,
            descricao TEXT NOT NULL,
            dataPublicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            autor TEXT NOT NULL,
            subgrupoId TEXT NOT NULL,
            FOREIGN KEY (subgrupoId) REFERENCES subgrupos(id)
        )
    """)

    conn.commit()
    conn.close()
    print("Tabelas criadas/verificadas com sucesso.")

def create_default_admin():
    """Cria o usuário administrador padrão se ele não existir."""
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT id FROM usuarios WHERE email = ?", (ADMIN_EMAIL,))
    admin_exists = cur.fetchone()

    if not admin_exists:
        hashed_password = pwd_context_models.hash(ADMIN_PASSWORD)
        admin_id = str(uuid.uuid4())
        try:
            cur.execute("""
                INSERT INTO usuarios (id, nome, email, senha, role, inscritoNewsletter)
                VALUES (?, ?, ?, ?, ?, ?)
            """, (admin_id, "Admin GEM", ADMIN_EMAIL, hashed_password, "ADMIN", 0))
            conn.commit()
            print(f"Usuário administrador padrão '{ADMIN_EMAIL}' criado com sucesso.")
        except sqlite3.IntegrityError:
            print(f"O email '{ADMIN_EMAIL}' já está em uso.")
        except Exception as e:
            print(f"Erro ao criar usuário admin padrão: {e}")
    else:
        print(f"Usuário administrador padrão '{ADMIN_EMAIL}' já existe.")

    conn.close()

if __name__ == "__main__":
    print(f"Inicializando banco de dados em: {DATABASE_URL}")
    create_tables()
    create_default_admin()