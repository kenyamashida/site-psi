const express = require('express');
const cors = require('cors');
const config = require('./config');

const app = express();

// Import routes
const professionalsRouter = require('./routes/professionals');
const contactsRouter = require('./routes/contacts');

// Middleware
app.use(cors({
  origin: config.corsOrigins,
  optionsSuccessStatus: 200
}));
app.use(express.json());

// Routes
app.use('/api/professionals', professionalsRouter);
app.use('/api/request', contactsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = config.port;
const HOST = config.host;

const server = app.listen(PORT, HOST, () => {
  console.log(`\n🚀 Server running on http://${HOST}:${PORT}`);
  console.log(`📡 CORS enabled for: ${config.corsOrigins.join(', ')}`);
  console.log(`\n📚 API Routes:`);
  console.log(`  GET    /api/professionals/       - List active psychologists`);
  console.log(`  GET    /api/professionals/all    - List all psychologists`);
  console.log(`  GET    /api/professionals/:id    - Get one psychologist`);
  console.log(`  POST   /api/professionals/       - Create psychologist`);
  console.log(`  PUT    /api/professionals/:id    - Update psychologist`);
  console.log(`  DELETE /api/professionals/:id    - Delete psychologist`);
  console.log(`\n  GET    /api/request/             - List contact requests`);
  console.log(`  GET    /api/request/:id          - Get one request`);
  console.log(`  GET    /api/request/psychologist/:id - Get requests for psychologist`);
  console.log(`  POST   /api/request/             - Create contact request`);
  console.log(`  PUT    /api/request/:id          - Update request`);
  console.log(`  PATCH  /api/request/:id/read     - Mark as read`);
  console.log(`  DELETE /api/request/:id          - Delete request`);
  console.log(`\n`);
});

// Error handling
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});