const db = require('../db/database');

const ContactRequest = {
  list: (callback) => {
    const query = `
      SELECT cr.*, p.name as psychologist_name 
      FROM contact_contactrequest cr
      LEFT JOIN contact_psychologist p ON cr.psychologist_id = p.id
      ORDER BY cr.created_at DESC
    `;
    db.all(query, [], callback);
  },

  getById: (id, callback) => {
    const query = `
      SELECT cr.*, p.name as psychologist_name 
      FROM contact_contactrequest cr
      LEFT JOIN contact_psychologist p ON cr.psychologist_id = p.id
      WHERE cr.id = ?
    `;
    db.get(query, [id], callback);
  },

  listByPsychologist: (psychologist_id, callback) => {
    const query = `
      SELECT * FROM contact_contactrequest 
      WHERE psychologist_id = ?
      ORDER BY created_at DESC
    `;
    db.all(query, [psychologist_id], callback);
  },

  create: (data, callback) => {
    const query = `
      INSERT INTO contact_contactrequest (psychologist_id, name, email, phone, message)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [data.psychologist_id, data.name, data.email, data.phone, data.message], callback);
  },

  update: (id, data, callback) => {
    const query = `
      UPDATE contact_contactrequest 
      SET psychologist_id = ?, name = ?, email = ?, phone = ?, message = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    db.run(query, [data.psychologist_id, data.name, data.email, data.phone, data.message, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM contact_contactrequest WHERE id = ?';
    db.run(query, [id], callback);
  },

  markAsRead: (id, callback) => {
    const query = 'UPDATE contact_contactrequest SET is_read = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    db.run(query, [id], callback);
  }
};

module.exports = ContactRequest;
