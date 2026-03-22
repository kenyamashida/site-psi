module.exports = {
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'localhost',
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173,http://localhost:5174,http://localhost:5175,http://localhost:3000,http://localhost:80,http://localhost:8000').split(','),
  dbPath: process.env.DB_PATH || './db.sqlite3',
  
  validation: {
    nameMaxLength: 150,
    crpMaxLength: 20,
    messageMinLength: 10,
    nameMinLength: 3
  },

  messages: {
    success: 'Operation completed successfully',
    error: 'An error occurred while processing your request',
    notFound: 'Resource not found',
    validationError: 'Validation error',
    missingFields: 'Missing required fields'
  }
};
