const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();

// Rotas
const professionalsRouter = require('./routes/professionals');
const contactsRouter = require('./routes/contacts');
const blogRouter = require('./routes/blog');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

// Middleware
app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/professionals', professionalsRouter);
app.use('/api/request', contactsRouter);
app.use('/api/blog', blogRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);

// Health check (Render, Vercel, etc.)
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'SitePsicologia API' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint não encontrado' });
});

const PORT = process.env.PORT || config.port || 10000;
const HOST = process.env.HOST || config.host || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`\n🚀 SitePsicologia API em http://${HOST}:${PORT}`);
  console.log(`📡 CORS habilitado para origens configuradas`);
  console.log(`\n📚 Rotas da API:`);
  console.log(`  GET    /api/health                - Status do servidor`);
  console.log(`  GET    /api/professionals/        - Lista psicólogos ativos`);
  console.log(`  GET    /api/professionals/all     - Lista todos os psicólogos`);
  console.log(`  GET    /api/professionals/:id     - Um psicólogo`);
  console.log(`  POST   /api/professionals/        - Criar psicólogo`);
  console.log(`  PUT    /api/professionals/:id     - Atualizar psicólogo`);
  console.log(`  DELETE /api/professionals/:id     - Remover psicólogo`);
  console.log(`\n  GET    /api/request/             - Lista solicitações de contato`);
  console.log(`  GET    /api/request/psychologist/:id - Solicitações por psicólogo`);
  console.log(`  GET    /api/request/:id           - Uma solicitação`);
  console.log(`  POST   /api/request/              - Criar solicitação`);
  console.log(`  PUT    /api/request/:id           - Atualizar solicitação`);
  console.log(`  PATCH  /api/request/:id/read      - Marcar como lida`);
  console.log(`  DELETE /api/request/:id           - Remover solicitação`);
  console.log(`  GET    /api/blog                 - Lista posts do blog`);
  console.log(`  GET    /api/blog/:id              - Um post do blog`);
  console.log(`\n  POST   /api/auth/login           - Login (email, senha)`);
  console.log(`  GET    /api/auth/me              - Usuário atual (Bearer token)`);
  console.log(`  GET    /api/admin/psychologists  - Lista psicólogos (auth)`);
  console.log(`  POST   /api/admin/psychologists  - Criar psicólogo (auth)`);
  console.log(`  PUT    /api/admin/psychologists/:id - Atualizar (auth)`);
  console.log(`  DELETE /api/admin/psychologists/:id - Remover (auth)`);
  console.log(`  GET    /api/admin/requests       - Lista solicitações (auth)`);
  console.log(`\n`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
