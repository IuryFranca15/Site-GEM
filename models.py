import sqlite3
import os
from passlib.context import CryptContext # Importar para hashing de senha

# Define o caminho para o arquivo do banco de dados na mesma pasta do script
DATABASE_URL = os.path.join(os.path.dirname(__file__), "site_gem.db")
ADMIN_EMAIL = "admin@example.com" # Email do admin padrão
ADMIN_PASSWORD = "adminpassword" # Senha do admin padrão (será hasheada com Argon2)

# Contexto Passlib para hashing de senha usando Argon2
# Certifique-se de que 'argon2-cffi' está no seu requirements.txt
pwd_context_models = CryptContext(schemes=["argon2"], deprecated="auto")

def get_db_connection():
    """Cria e retorna uma conexão com o banco de dados."""
    conn = sqlite3.connect(DATABASE_URL)
    conn.row_factory = sqlite3.Row # Permite acessar colunas por nome
    return conn

def create_tables():
    """Cria as tabelas no banco de dados se elas não existirem."""
    conn = get_db_connection()
    cur = conn.cursor()
    
    # subgrupo
    cur.execute("""
        CREATE TABLE IF NOT EXISTS subgrupo (
            id_subgrupo INTEGER PRIMARY KEY AUTOINCREMENT,
            nome_subgrupo TEXT NOT NULL UNIQUE
        )
    """)
     # publicacao
    cur.execute("""
        CREATE TABLE IF NOT EXISTS publicacao (
            id_publicacao INTEGER PRIMARY KEY AUTOINCREMENT,
            id_subgrupo INTEGER,
            titulo TEXT NOT NULL,
            texto TEXT NOT NULL,
            tipo TEXT NOT NULL,
            data_publicacao DATE,
            FOREIGN KEY (id_subgrupo) REFERENCES subgrupo(id_subgrupo)
        )
    """)
    
    # download
    cur.execute("""
        CREATE TABLE IF NOT EXISTS download (
            id_download INTEGER PRIMARY KEY AUTOINCREMENT,
            id_publicacao INTEGER,
            data_download DATE,
            FOREIGN KEY (id_publicacao) REFERENCES publicacao(id_publicacao)
        )
    """)
    # admin
    cur.execute("""
        CREATE TABLE IF NOT EXISTS admin (
        id_admin INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_admin TEXT NOT NULL,
        email_admin TEXT UNIQUE NOT NULL,
        hashed_password TEXT NOT NULL, -- Campo para senha hasheada
        role TEXT NOT NULL DEFAULT 'admin' -- 'admin'
        )
    """)  
    # integrantes
    cur.execute("""
        CREATE TABLE IF NOT EXISTS integrantes (
            id_integrante INTEGER PRIMARY KEY AUTOINCREMENT,
            id_subgrupo INTEGER,
            nome_integrante TEXT NOT NULL,
            email_integrante TEXT UNIQUE NOT NULL,
            FOREIGN KEY (id_subgrupo) REFERENCES subgrupo(id_subgrupo)
        )
    """)
    
    # newsletter
    cur.execute("""
        CREATE TABLE IF NOT EXISTS newsletter (
            id_inscricao INTEGER PRIMARY KEY AUTOINCREMENT,
            email_inscrito TEXT UNIQUE NOT NULL,
            data_inscricao DATE
        )
    """)
    
    conn.commit()
    conn.close()
def insert_subgrupo():
    conn = get_db_connection()
    cur = conn.cursor()
    
    subgrupos = [
        'Blue Finance',
        'Clima e Meio Ambiente',
        'Conceitos e Métodos',
        'Defesa',
        'Defesa e Segurança',
        'Energias Offshore',
        'Geopolitica',
        'Minerais Offshore',
        'Pesca e Aquicultura',
        'Transporte Marítimo',
        'Transportes'
    ]
    
    for subgrupo in subgrupos:
        try:
            cur.execute("INSERT INTO subgrupo (nome_subgrupo) VALUES (?)", (subgrupo,))
        except sqlite3.IntegrityError:
            pass  # já existe, não insere de novo

    conn.commit()
    conn.close()

    
  
def create_default_admin():
    """Cria o usuário administrador padrão se ele não existir, usando Argon2 para a senha."""
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM admin WHERE email_admin = ?", (ADMIN_EMAIL,))
    admin_exists = cur.fetchone()

    if not admin_exists:
        # Hashear a senha do admin usando Argon2
        hashed_admin_password = pwd_context_models.hash(ADMIN_PASSWORD)
        try:
            cur.execute("""
                INSERT INTO admin (nome_admin, email_admin, hashed_password, role)
                VALUES (?, ?, ?, ?)
            """, ("Admin User", ADMIN_EMAIL, hashed_admin_password, "admin"))
            conn.commit()
            print(f"Usuário administrador padrão '{ADMIN_EMAIL}' criado com sucesso (senha hasheada com Argon2).")
        except sqlite3.IntegrityError:
            print(f"Não foi possível criar o admin '{ADMIN_EMAIL}', pode já existir um com esse email.")
        except Exception as e:
            print(f"Erro ao criar usuário admin padrão: {e}")
    else:
        print(f"Usuário administrador padrão '{ADMIN_EMAIL}' já existe.")
    
    conn.close()


if __name__ == "__main__":
    print(f"Verificando e criando banco de dados em: {DATABASE_URL}")
    create_tables() # Garante que as tabelas tenham as colunas 'hashed_password' e 'role'
    print("Tabelas verificadas/criadas com sucesso.")
    
    print("Verificando/Criando usuário administrador padrão...")
    create_default_admin() # Cria o admin com senha hasheada por Argon2

    # Adicionar subgrupo de exemplo
    conn = None 
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("SELECT * FROM subgrupo WHERE nome_subgrupo = ?", ("Blue Finance",))
        subgrupo_exists = cur.fetchone()
        if not subgrupo_exists:
            conn.execute("INSERT INTO subgrupo (nome_subgrupo) VALUES (?)", ("Blue Finance",))
            conn.commit()
            print("Subgrupo 'Blue Finance' adicionado para exemplo (se não existia).")
        else:
            print("Subgrupo 'Blue Finance' já existe.")
    except sqlite3.IntegrityError: 
        print("Subgrupo 'Blue Finance' já existe (erro de integridade).")
    except Exception as e:
        print(f"Erro ao adicionar subgrupo de exemplo: {e}")
    finally:
        if conn: 
            conn.close()
