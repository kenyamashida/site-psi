✈️ BrasilTour - Projeto Fullstack (React + Node.js)

Este é um projeto base estruturado para demonstrar a integração entre um Frontend em React (Vite) e um Backend em Node.js (Express).

📋 Pré-requisitos

Antes de começar, certifica-te de que tens instalado na tua máquina:

Node.js (Versão 18 ou superior recomendada)

npm (instalado automaticamente com o Node.js)

🛠️ Instalação e Execução

O projeto está dividido em duas pastas principais: frontend e backend.

1. Configurar o Backend (Servidor)

Abre o terminal e navega até à pasta do backend:

```
cd backend
```

Instala as dependências necessárias:
```
npm install express cors
```

Inicia o servidor:
```
node server.js
```

O servidor ficará ativo em: http://localhost:3001

2. Configurar o Frontend (Interface)

Abre um novo terminal (mantendo o do backend aberto) e navega até à pasta do frontend:
```
cd frontend
```

Instala as dependências do projeto:
```
npm install
```

Instala as bibliotecas de rotas e ícones (essenciais para este projeto):
```
npm install react-router-dom lucide-react
```

Inicia o ambiente de desenvolvimento:
```
npm run dev
```

A interface ficará disponível em: http://localhost:5173

🏗️ Estrutura de Pastas (Importante)

Para evitar erros de compilação, a estrutura de ficheiros deve ser rigorosamente seguida (atenção às maiúsculas):
```
frontend/src/
 ├── components/
 │    ├── Navbar.jsx    # Menu de navegação
 │    └── Footer.jsx    # Rodapé da página
 ├── pages/
 │    └── Home.jsx      # Página principal com os cards
 ├── App.jsx            # Orquestrador de rotas e estado
 └── main.jsx           # Ponto de entrada (contém o BrowserRouter)
```

📝 Notas de Resolução de Problemas (Troubleshooting)

Erro de "Casing" (App.jsx vs app.jsx)

Se o terminal indicar erro de diferença entre maiúsculas e minúsculas:

Renomeia app.jsx para temp.jsx.

Renomeia novamente para App.jsx.

Limpa o cache do Vite: rm -rf node_modules/.vite.

Erro de CORS

O backend já inclui o middleware cors(). Se houver erros de ligação, verifica se o servidor backend está a correr na porta 3001 e se o frontend aponta para o endereço correto.

📦 Tecnologias Utilizadas

Frontend: React, Vite, Tailwind CSS, Lucide React (ícones), React Router Dom (navegação).

Backend: Node.js, Express, CORS.