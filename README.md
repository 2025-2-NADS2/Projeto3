FECAP - Fundação de Comércio Álvares Penteado

<p align="center">
<a href= "https://www.fecap.br/"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhZPrRa89Kma0ZZogxm0pi-tCn_TLKeHGVxywp-LXAFGR3B1DPouAJYHgKZGV0XTEf4AE&usqp=CAU" alt="FECAP - Fundação de Comércio Álvares Penteado" border="0"></a>
</p>

Site Institucional - Instituto Alma

<p align="center">
    <img src="https://placehold.co/800x400/111F44/C5FFEE?text=Projeto+Instituto+Alma" alt="Site do Instituto Alma">
</p>

Global SI

Integrantes: <a href="https://www.linkedin.com/in/gustavomoura3112?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">Gustavo Moura</a>, <a href="https://www.linkedin.com/in/lucas-soares-corsino-885306288/">Lucas Corsino</a> , Guilherme Gomes Salvadeo, <a href="https://www.linkedin.com/in/manoel-rondon">Manoel Rondon</a>

Professores Orientadores: <a href="https://www.linkedin.com/in/eduardo-savino-gomes-77833a10/"> Eduardo Savino Gomes</a>, <a href="https://www.linkedin.com/in/francisco-escobar/">Francisco de Souza Escobar</a>, <a href="https://www.linkedin.com/in/jbuesso/">José Carlos Buesso Junior</a>, <a href="https://www.linkedin.com/in/ronaldo-araujo-pinto-3542811a/">Ronaldo Araujo Pinto</a>, <a href="https://www.linkedin.com/in/victorbarq/">Victor Bruno Alexander Rosetti de Quiroz</a>

📖 Descrição

Este projeto é um site institucional completo para o Instituto Alma, uma organização sem fins lucrativos focada em "promover o desenvolvimento humano e a inclusão social por meio de ações educativas e de solidariedade". O site foi desenvolvido como Projeto Integrado (PI) do curso de Análise e Desenvolvimento de Sistemas da FECAP.

O objetivo é criar um portal digital funcional, moderno e impactante, que sirva como o principal canal de comunicação da ONG, permitindo:

Apresentar a história, missão e valores do Instituto.

Divulgar as atividades e eventos realizados.

Captar doações de forma transparente.

Oferecer um portal para doadores e administradores (login/cadastro).

Manter um canal de Ouvidoria para contato direto.

🚀 Tecnologias Utilizadas

Este projeto é uma aplicação Full-Stack completa, dividida em duas partes principais: um Frontend (React) e um Backend (Node.js/API).

Frontend: React.js (com Vite) para construir a interface de usuário moderna e reativa, com React Router para a navegação (SPA).

Backend: Node.js com Express.js para construir uma API RESTful robusta e segura.

Banco de Dados: MySQL hospedado na Nuvem Azure, permitindo que o projeto seja acessado de qualquer lugar.

Autenticação & Segurança: JSON Web Tokens (JWT) para proteger as rotas do painel de admin e doador, e Bcrypt.js para criptografar as senhas dos usuários no banco de dados.

🛠 Estrutura de Pastas (Arquitetura Frontend/Backend)

O projeto é um monorepo (dois projetos em um repositório) que separa claramente as responsabilidades do Frontend e do Backend.

📁 PI - Atualizado/
   |
   |-- 📁 instituto-alma-api/   (O Backend - API Node.js)
   |    ├── middleware/
   |    │   └── authMiddleware.js (O "segurança" que verifica o token JWT)
   |    ├── .env                  (Armazena as credenciais do banco Azure e o segredo JWT)
   |    ├── db.js                 (Configura a conexão com o MySQL + SSL do Azure)
   |    ├── package.json          (Dependências: express, mysql2, bcryptjs, jsonwebtoken, cors)
   |    └── server.js             (Arquivo principal com todas as rotas da API)
   |
   └── 📁 instituto-alma-react/ (O Frontend - React)
       ├── public/
       │   ├── images/
       │   └── documentos/         (PDFs da Transparência, ex: CNPJ_ALMA.pdf)
       ├── src/
       │   ├── assets/             (CSS global: style.css, admin.style.css)
       │   ├── components/         (Ex: ProtectedRoute.jsx - Rota protegida)
       │   ├── layouts/            (AdminLayout, PublicLayout, AuthLayout)
       │   ├── pages/              (Todas as 20+ páginas/telas do site)
       │   ├── utils/              (authFetch.js - Helper para enviar o token JWT)
       │   ├── App.jsx             (Define todas as rotas do React Router)
       │   └── main.jsx            (Ponto de entrada do React)
       └── package.json          (Dependências: react, react-router-dom)


🛠 Instalação e Configuração (Como Rodar Localmente)

Este projeto é uma aplicação full-stack e requer que dois servidores (Backend e Frontend) sejam executados simultaneamente em terminais separados.

Pré-requisitos

Node.js (v18 ou superior): Baixe aqui

Git: Baixe aqui

MySQL Workbench (ou outro cliente SQL): Baixe aqui

Passo 1: Clonar o Repositório

git clone https://[URL-DO-SEU-REPOSITORIO].git
cd [NOME-DA-PASTA-DO-PROJETO]


Passo 2: Configurar e Rodar o Backend (API)

Abra o Terminal 1 e execute os seguintes comandos:

Navegue até a pasta da API:

cd instituto-alma-api


Instale as dependências:

npm install


Configure as Variáveis de Ambiente:

Crie um arquivo chamado .env na raiz da pasta instituto-alma-api.

Copie o conteúdo abaixo para dentro dele e preencha com suas credenciais do banco Azure:

# Credenciais do Banco de Dados (Azure MySQL)
DB_HOST="institutoalmasql.mysql.database.azure.com"
DB_USER="seu_usuario_admin_do_azure"
DB_PASSWORD="sua_senha_do_azure"
DB_NAME="instituto_alma"

# Segredo para o JWT
JWT_SECRET="sua-chave-secreta-muito-segura"


Execute o script do Banco de Dados:

Abra o MySQL Workbench e conecte-se ao seu servidor Azure.

Execute o arquivo instituto_alma_schema.sql (disponível no repositório) para criar todas as tabelas, views e dados de teste.

Inicie o servidor da API:

npm run dev


O terminal deve mostrar: 🚀 Servidor da API rodando em http://localhost:3001 e ✅ Conectado ao banco de dados MySQL (Azure)!

Passo 3: Configurar e Rodar o Frontend (React)

Abra um Terminal 2 (não feche o Terminal 1) e execute os seguintes comandos:

Navegue até a pasta do React:

cd instituto-alma-react


Instale as dependências:

npm install


Inicie o servidor do React:

npm run dev


O terminal deve mostrar: VITE ... ready in ...ms

Passo 4: Acessar o Projeto

Abra seu navegador e acesse: http://localhost:5173

O site completo estará funcionando, conectado à sua API e ao banco de dados do Azure.

🗺️ Rotas da API (Endpoints)

O backend (server.js) fornece as seguintes rotas principais:

Autenticação (Abertas)

POST /api/auth/register: Cria um novo usuário (Doador) com senha criptografada.

POST /api/auth/login: Autentica um usuário (Doador ou Admin) e retorna um token JWT.

Conteúdo (Públicas)

GET /api/atividades: Retorna todas as atividades.

GET /api/eventos: Retorna todos os eventos.

GET /api/documentos: Retorna todos os documentos de transparência.

POST /api/ouvidoria: Recebe uma nova mensagem do formulário público.

Painel de Admin (Rotas Protegidas - Exigem Token JWT)

POST /api/atividades: Cria uma nova atividade.

PUT /api/atividades/:id: Atualiza uma atividade existente.

DELETE /api/atividades/:id: Exclui uma atividade.

(O mesmo padrão CRUD existe para /api/eventos e /api/documentos)

GET /api/ouvidoria: Lista todas as mensagens recebidas.

DELETE /api/ouvidoria/:id: Exclui uma mensagem.

GET /api/admin/doacoes: Retorna o relatório de doações (com filtros de data/status).

GET /api/admin/grafico-doacoes: Retorna os dados agregados para o gráfico.

Portal do Doador (Rotas Protegidas)

GET /api/perfil: Busca os dados (nome, email, cpf) do usuário logado.

PUT /api/perfil: Atualiza o telefone do usuário logado.

PUT /api/perfil/senha: Atualiza a senha do usuário logado.

GET /api/doador/doacoes: Busca o histórico de doações apenas do usuário logado.

📋 Licença

Este projeto é licenciado sob a Licença Creative Commons CC BY 4.0.
Para ver uma cópia da licença, visite https://chooser-beta.creativecommons.org/ ou veja o arquivo de licença no repositório.

🎓 Referências

Templates de README: Usado como base inicial para este documento.

Gerador de .gitignore: Ferramenta para criar o arquivo .gitignore.

Creative Commons: Ferramenta para escolha de licença.