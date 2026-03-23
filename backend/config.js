/**
 * Configuração do backend SitePsicologia
 * Variáveis de ambiente sobrescrevem os valores padrão
 */
module.exports = {
  port: process.env.PORT || 10000,
  host: process.env.HOST || '0.0.0.0',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: (
    process.env.CORS_ORIGIN ||
    'http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:3000,http://localhost:80,http://localhost:8000,https://site-psi.vercel.app'
  ).split(','),
  dbPath: process.env.DB_PATH || './db.sqlite3',
  jwtSecret: process.env.JWT_SECRET || 'site-psi-secret-change-in-production',

  validation: {
    nameMaxLength: 150,
    crpMaxLength: 20,
    messageMinLength: 10,
    nameMinLength: 3,
  },

  messages: {
    success: 'Operação realizada com sucesso',
    error: 'Ocorreu um erro ao processar sua solicitação',
    notFound: 'Recurso não encontrado',
    validationError: 'Erro de validação',
    missingFields: 'Campos obrigatórios ausentes',
  },
};
