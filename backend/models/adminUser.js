const db = require('../db/database');

const AdminUser = {
  findByEmail: (email, callback) => {
    const query = `
      SELECT au.*, p.name as psychologist_name, p.specialty
      FROM admin_users au
      LEFT JOIN contact_psychologist p ON au.psychologist_id = p.id
      WHERE au.email = ?
    `;
    db.get(query, [email], callback);
  },

  findById: (id, callback) => {
    const query = `
      SELECT au.*, p.name as psychologist_name, p.specialty
      FROM admin_users au
      LEFT JOIN contact_psychologist p ON au.psychologist_id = p.id
      WHERE au.id = ?
    `;
    db.get(query, [id], callback);
  },

  create: (data, callback) => {
    const query = `
      INSERT INTO admin_users (email, password_hash, name, role, psychologist_id)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(
      query,
      [data.email, data.password_hash, data.name, data.role || 'admin', data.psychologist_id || null],
      callback
    );
  },

  list: (callback) => {
    const query = `
      SELECT au.*, p.name as psychologist_name, p.specialty
      FROM admin_users au
      LEFT JOIN contact_psychologist p ON au.psychologist_id = p.id
      ORDER BY au.created_at DESC
    `;
    db.all(query, [], callback);
  },

  update: (id, data, callback) => {
    const query = `
      UPDATE admin_users
      SET email = ?, name = ?, role = ?, psychologist_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    db.run(
      query,
      [data.email, data.name, data.role || 'admin', data.psychologist_id || null, id],
      callback
    );
  },

  delete: (id, callback) => {
    db.run('DELETE FROM admin_users WHERE id = ?', [id], callback);
  },
};

module.exports = AdminUser;
