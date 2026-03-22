const Psychologist = require('../models/psychologist');

const psychologistController = {
  listActive: (req, res) => {
    Psychologist.listActive((err, rows) => {
      if (err) {
        console.error('Error fetching psychologists:', err);
        return res.status(500).json({ error: 'Error fetching psychologists' });
      }
      res.json(rows || []);
    });
  },

  listAll: (req, res) => {
    Psychologist.listAll((err, rows) => {
      if (err) {
        console.error('Error fetching psychologists:', err);
        return res.status(500).json({ error: 'Error fetching psychologists' });
      }
      res.json(rows || []);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid psychologist ID' });
    }

    Psychologist.getById(id, (err, row) => {
      if (err) {
        console.error('Error fetching psychologist:', err);
        return res.status(500).json({ error: 'Error fetching psychologist' });
      }

      if (!row) {
        return res.status(404).json({ error: 'Psychologist not found' });
      }

      res.json(row);
    });
  },

  create: (req, res) => {
    const { name, crp, specialty, description, full_bio, education, photo_url } = req.body;

    // Validations
    if (!name || !crp || !specialty || !description) {
      return res.status(400).json({ error: 'Missing required fields: name, crp, specialty, description' });
    }

    if (name.length > 150) {
      return res.status(400).json({ error: 'Name must be less than 150 characters' });
    }

    if (crp.length > 20) {
      return res.status(400).json({ error: 'CRP must be less than 20 characters' });
    }

    const data = { name, crp, specialty, description, full_bio, education, photo_url };

    Psychologist.create(data, (err) => {
      if (err) {
        console.error('Error creating psychologist:', err);
        if (err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'CRP already exists' });
        }
        return res.status(500).json({ error: 'Error creating psychologist' });
      }

      res.status(201).json({ message: 'Psychologist created successfully' });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { name, crp, specialty, description, full_bio, education, photo_url } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid psychologist ID' });
    }

    if (!name || !crp || !specialty || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = { name, crp, specialty, description, full_bio, education, photo_url };

    Psychologist.update(id, data, (err) => {
      if (err) {
        console.error('Error updating psychologist:', err);
        return res.status(500).json({ error: 'Error updating psychologist' });
      }

      res.json({ message: 'Psychologist updated successfully' });
    });
  },

  deleteOne: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid psychologist ID' });
    }

    Psychologist.delete(id, (err) => {
      if (err) {
        console.error('Error deleting psychologist:', err);
        return res.status(500).json({ error: 'Error deleting psychologist' });
      }

      res.json({ message: 'Psychologist deleted successfully' });
    });
  }
};

module.exports = psychologistController;
