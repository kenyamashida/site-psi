const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Configuração de CORS: permite que o seu React fale com o Node
app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
  res.json({ status: 'online' });
});

app.get('/api/cidades', (req, res) => {
  res.json([
    { id: 1, nome: 'Rio de Janeiro', clima: 'Tropical' },
    { id: 2, nome: 'Salvador', clima: 'Quente' },
    { id: 3, nome: 'Manaus', clima: 'Húmido' },
    { id: 4, nome: 'Florianópolis', clima: 'Temperado' }
  ]);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend ativo em http://localhost:${PORT}`);
});