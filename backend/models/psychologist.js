const db = require('../db/database');

const Psychologist = {
  listActive: (callback) => {
    const query = 'SELECT * FROM contact_psychologist WHERE is_active = 1';
    db.all(query, [], callback);
  },

  listAll: (callback) => {
    const query = 'SELECT * FROM contact_psychologist';
    db.all(query, [], callback);
  },

  getById: (id, callback) => {
    const query = 'SELECT * FROM contact_psychologist WHERE id = ?';
    db.get(query, [id], callback);
  },

  create: (data, callback) => {
    const query = `
      INSERT INTO contact_psychologist (name, crp, specialty, description, full_bio, education, photo_url)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(query, [data.name, data.crp, data.specialty, data.description, data.full_bio, data.education, data.photo_url], callback);
  },

  update: (id, data, callback) => {
    const query = `
      UPDATE contact_psychologist 
      SET name = ?, crp = ?, specialty = ?, description = ?, full_bio = ?, education = ?, photo_url = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    db.run(query, [data.name, data.crp, data.specialty, data.description, data.full_bio, data.education, data.photo_url, id], callback);
  },

  delete: (id, callback) => {
    const query = 'DELETE FROM contact_psychologist WHERE id = ?';
    db.run(query, [id], callback);
  }
};

module.exports = Psychologist;
