/**
 * Seed de usuário admin para o painel
 * Uso: node scripts/seedAdmin.js
 */
const bcrypt = require('bcrypt');
const AdminUser = require('../models/adminUser');

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@sitepsicologia.com';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';
const ADMIN_NAME = process.env.ADMIN_NAME || 'Administrador';

const seedAdmin = async () => {
  console.log('🔐 Criando usuário admin...');

  const password_hash = await bcrypt.hash(ADMIN_PASSWORD, 10);

  AdminUser.create(
    {
      email: ADMIN_EMAIL,
      password_hash,
      name: ADMIN_NAME,
      role: 'admin',
    },
    (err) => {
      if (err) {
        if (err.message && err.message.includes('UNIQUE constraint failed')) {
          console.log('  ⏭ Admin já existe. Use ADMIN_EMAIL e ADMIN_PASSWORD para criar outro.');
        } else {
          console.error('  ✗ Erro:', err.message);
        }
      } else {
        console.log('  ✓ Admin criado:', ADMIN_EMAIL);
        console.log('  ✓ Senha padrão:', ADMIN_PASSWORD);
      }
      process.exit(0);
    }
  );
};

seedAdmin();
