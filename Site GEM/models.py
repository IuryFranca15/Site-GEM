import sqlite3
#cria uma conexão que conecta com o bd e faz um cursor para executar comandos sql

class Product: 
    def __init__(self):
        self.con = sqlite3.connect(":memory:")
        self.cur = self.con.cursor()
    
    def create_tables(self):
        # subgrupo
        self.cur.execute("""
            CREATE TABLE IF NOT EXISTS subgrupo (
                id_subgrupo INTEGER PRIMARY KEY AUTOINCREMENT,
                nome_subgrupo TEXT NOT NULL
            )
        """)
        
        # publicacao
        self.cur.execute("""
            CREATE TABLE IF NOT EXISTS publicacao (
                id_publicacao INTEGER PRIMARY KEY AUTOINCREMENT,
                id_subgrupo INTEGER,
                tipo TEXT NOT NULL,
                data_publicacao DATE,
                FOREIGN KEY (id_subgrupo) REFERENCES subgrupo(id_subgrupo)
            )
        """)
        
        # download
        self.cur.execute("""
            CREATE TABLE IF NOT EXISTS download (
                id_download INTEGER PRIMARY KEY AUTOINCREMENT,
                id_publicacao INTEGER,
                data_download DATE,
                FOREIGN KEY (id_publicacao) REFERENCES publicacao(id_publicacao)
            )
        """)
        
        # integrantes
        self.cur.execute("""
            CREATE TABLE IF NOT EXISTS integrantes (
                id_integrante INTEGER PRIMARY KEY AUTOINCREMENT,
                id_subgrupo INTEGER,
                nome_integrante TEXT NOT NULL,
                email_integrante TEXT UNIQUE NOT NULL,
                FOREIGN KEY (id_subgrupo) REFERENCES subgrupo(id_subgrupo)
            )
        """)
        
        # newsletter
        self.cur.execute("""
            CREATE TABLE IF NOT EXISTS newsletter (
                id_inscricao INTEGER PRIMARY KEY AUTOINCREMENT,
                email_inscrito TEXT UNIQUE NOT NULL,
                data_inscricao DATE
            )
        """)
        
        self.con.commit()
