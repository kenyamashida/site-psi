const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/adminUser');
const config = require('../config');

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    AdminUser.findByEmail(email, async (err, user) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        return res.status(500).json({ error: config.messages.error });
      }

      if (!user) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }

      const validPassword = await bcrypt.compare(password, user.password_hash);
      if (!validPassword) {
        return res.status(401).json({ error: 'Email ou senha incorretos' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role, psychologist_id: user.psychologist_id },
        config.jwtSecret,
        { expiresIn: '7d' }
      );

      res.json({
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          psychologist_id: user.psychologist_id,
          psychologist_name: user.psychologist_name,
        },
      });
    });
  },

  me: (req, res) => {
    AdminUser.findById(req.user.id, (err, user) => {
      if (err || !user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        psychologist_id: user.psychologist_id,
        psychologist_name: user.psychologist_name,
      });
    });
  },
};

module.exports = authController;
