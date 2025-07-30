## 1. Visão Geral

A **API de Notícias GEM** é o backend para uma plataforma de conteúdo do Grupo Economia do Mar. Ela foi projetada para ser robusta, segura e escalável, permitindo o gerenciamento completo de usuários, publicações e o envio de newsletters.

A API utiliza um banco de dados **SQLite** para armazenamento, **FastAPI** como framework web, **Pydantic** para validação de dados e um sistema de autenticação seguro baseado em **JWT** com hashing de senhas **Argon2**.

---

## 2. Começando

Siga estes passos para configurar e executar o projeto localmente.

### Pré-requisitos

- Python 3.10 ou superior
- Um gerenciador de pacotes `pip`

### Passos para Instalação

1. **Clone o Repositório**Bash
    
    `git clone <url-do-seu-repositorio>
    cd Site-GEM`
    
2. **Crie e Ative um Ambiente Virtual** Isso isola as dependências do seu projeto.Bash
    
    `python3 -m venv venv
    source venv/bin/activate`
    
    *(No Windows, use `venv\Scripts\activate`)*
    
3. **Instale as Dependências** O arquivo `requirements.txt` contém todas as bibliotecas necessárias.Bash
    
    `pip install -r requirements.txt`
    
4. **Configure as Variáveis de Ambiente para E-mail** Crie um arquivo chamado `.env` na raiz do projeto. Ele guardará as credenciais para o envio de e-mails.Snippet de código
    
    `touch .env`
    
    Abra o arquivo `.env` e adicione as seguintes informações (exemplo para Gmail):
    
    `# .env
    EMAIL_HOST=smtp.gmail.com
    EMAIL_PORT=587
    EMAIL_USER=seu-email@gmail.com
    EMAIL_PASSWORD=sua-senha-de-app-de-16-digitos`
    
    > Importante: Para o Gmail, você precisa gerar uma "Senha de App" na sua conta Google. Não use sua senha de login principal.
    > 
5. **Execute a API** Com o ambiente virtual ativo, inicie o servidor Uvicorn.Bash
    
    `python3 -m uvicorn main:app --reload`
    
    O servidor estará rodando em `http://127.0.0.1:8000`. A documentação interativa estará disponível em `http://127.0.0.1:8000/docs`.
    

---

## 3. Autenticação e Permissões

A API utiliza tokens JWT para proteger endpoints que modificam dados.

### Fluxo de Autenticação

1. O usuário envia `email` e `senha` para o endpoint `POST /login`.
2. A API valida as credenciais e retorna um `access_token`.
3. Para acessar rotas protegidas, o cliente deve incluir este token no cabeçalho `Authorization` de cada requisição no formato: `Bearer <seu_token>`.

### Papéis de Usuário (`role`)

- **`ADMIN`**: Acesso **CRUD completo** (Criar, Ler, Atualizar, Deletar) a todas as entidades. É o único que pode gerenciar outros usuários e enviar newsletters.
- **`COMUM`**: Acesso restrito. Pode ler conteúdo público, gerenciar o próprio perfil e a inscrição na newsletter.

---

## 4. Estrutura das Entidades

### 4.1. Usuário

| Atributo | Tipo | Descrição |
| --- | --- | --- |
| `id` | UUID | Identificador único. |
| `nome` | String | Nome do usuário. |
| `email` | String | E-mail único (usado para login). |
| `senha` | String | Senha armazenada com hash Argon2. |
| `fotoPerfilUrl` | URL | (Opcional) Link para a foto de perfil. |
| `role` | Enum | `ADMIN` ou `COMUM`. |
| `inscritoNewsletter` | Booleano | Status da inscrição na newsletter. |

Exportar para as Planilhas

### 4.2. Subgrupo

| Atributo | Tipo | Descrição |
| --- | --- | --- |
| `id` | UUID | Identificador único. |
| `nome` | String | Nome único do subgrupo. |
| `descricao` | String | (Opcional) Descrição do subgrupo. |

Exportar para as Planilhas

### 4.3. Publicação

| Atributo | Tipo | Descrição |
| --- | --- | --- |
| `id` | UUID | Identificador único. |
| `titulo` | String | Título da publicação. |
| `conteudo` | String | Conteúdo principal (suporta HTML). |
| `descricao` | String | Resumo da publicação. |
| `dataPublicacao` | Timestamp | Data de criação (automática). |
| `autor` | String | Nome do autor (texto livre). |
| `subgrupoId` | UUID | ID do subgrupo associado. |

Exportar para as Planilhas

---

## 5. Endpoints da API

### 5.1. Autenticação

- **`POST /login`**: Autentica um usuário e retorna um `access_token`.

### 5.2. Perfil de Usuário (Requer Autenticação `COMUM` ou `ADMIN`)

- **`GET /usuarios/me`**: Retorna os detalhes do usuário logado.
- **`PUT /usuarios/me`**: Atualiza o perfil do usuário logado (nome, foto, senha).
- **`PUT /usuarios/me/newsletter`**: Altera o status da inscrição na newsletter do usuário logado.
    - **Query Param:** `inscrever` (boolean). Ex: `/usuarios/me/newsletter?inscrever=true`.

### 5.3. Subgrupos

- **`GET /subgrupos`** (Público): Lista todos os subgrupos.
- **`GET /subgrupos/{subgrupo_id}`** (Público): Retorna um subgrupo específico.
- **`POST /subgrupos`** (**Admin**): Cria um novo subgrupo.
- **`PUT /subgrupos/{subgrupo_id}`** (**Admin**): Atualiza um subgrupo.
- **`DELETE /subgrupos/{subgrupo_id}`** (**Admin**): Deleta um subgrupo.

### 5.4. Publicações

- **`GET /publicacoes`** (Público): Lista publicações com filtros avançados.
    - **Filtros (Query Params):**
        - `subgrupo_id` (UUID): Filtra por subgrupo.
        - `ano` (inteiro): Filtra por ano.
        - `mes` (inteiro): Filtra por mês (requer `ano`).
        - `data_inicio` / `data_fim` (AAAA-MM-DD): Filtra por um intervalo de datas.
- **`GET /publicacoes/{publicacao_id}`** (Público): Retorna uma publicação específica.
- **`POST /publicacoes`** (**Admin**): Cria uma nova publicação.
- **`PUT /publicacoes/{publicacao_id}`** (**Admin**): Atualiza uma publicação.
- **`DELETE /publicacoes/{publicacao_id}`** (**Admin**): Deleta uma publicação.

### 5.5. Gerenciamento de Usuários (Requer `ADMIN`)

- **`GET /usuarios`**: Lista todos os usuários.
- **`GET /usuarios/{usuario_id}`**: Retorna um usuário específico.
- **`POST /usuarios`**: Cria um novo usuário.
- **`PUT /usuarios/{usuario_id}`**: Atualiza um usuário.
- **`DELETE /usuarios/{usuario_id}`**: Deleta um usuário.

### 5.6. Serviço de Newsletter (Requer `ADMIN`)

- **`POST /newsletter/enviar`**: Envia uma newsletter para todos os usuários inscritos. O endpoint é flexível e aceita diferentes formatos de conteúdo no corpo da requisição.

**Exemplo 1: Envio com HTML completo**

JSON

`{
  "assunto": "Nosso Template Exclusivo!",
  "corpo_html": "<html><body><h1>Olá!</h1><p>Este é o nosso template.</p></body></html>"
}`

**Exemplo 2: Envio com texto simples e imagens**

JSON

`{
  "assunto": "Veja Nossas Novas Fotos!",
  "corpo_texto": "Confira as imagens do nosso último evento.",
  "imagens_urls": [
    "https://example.com/imagem1.jpg",
    "https://example.com/imagem2.png"
  ]
}`

**Resposta de Sucesso (202 Accepted):**

JSON

`{
  "message": "Envio da newsletter 'Título do Assunto' iniciado para X assinante(s)."
}`