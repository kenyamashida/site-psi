const ContactRequest = require('../models/contactRequest');

const contactRequestController = {
  list: (req, res) => {
    ContactRequest.list((err, rows) => {
      if (err) {
        console.error('Error fetching contact requests:', err);
        return res.status(500).json({ error: 'Error fetching contact requests' });
      }
      res.json(rows || []);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    ContactRequest.getById(id, (err, row) => {
      if (err) {
        console.error('Error fetching contact request:', err);
        return res.status(500).json({ error: 'Error fetching contact request' });
      }

      if (!row) {
        return res.status(404).json({ error: 'Contact request not found' });
      }

      res.json(row);
    });
  },

  listByPsychologist: (req, res) => {
    const { psychologist_id } = req.params;

    if (!psychologist_id || isNaN(psychologist_id)) {
      return res.status(400).json({ error: 'Invalid psychologist ID' });
    }

    ContactRequest.listByPsychologist(psychologist_id, (err, rows) => {
      if (err) {
        console.error('Error fetching contact requests:', err);
        return res.status(500).json({ error: 'Error fetching contact requests' });
      }
      res.json(rows || []);
    });
  },

  create: (req, res) => {
    const { psychologist_id, name, email, phone, message } = req.body;

    // Validations
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields: name, email, message' });
    }

    if (name.length < 3) {
      return res.status(400).json({ error: 'Name must be at least 3 characters' });
    }

    if (message.length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const data = { psychologist_id, name, email, phone, message };

    ContactRequest.create(data, (err) => {
      if (err) {
        console.error('Error creating contact request:', err);
        return res.status(500).json({ error: 'Error creating contact request' });
      }

      res.status(201).json({ message: 'Contact request created successfully' });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { psychologist_id, name, email, phone, message } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = { psychologist_id, name, email, phone, message };

    ContactRequest.update(id, data, (err) => {
      if (err) {
        console.error('Error updating contact request:', err);
        return res.status(500).json({ error: 'Error updating contact request' });
      }

      res.json({ message: 'Contact request updated successfully' });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    ContactRequest.delete(id, (err) => {
      if (err) {
        console.error('Error deleting contact request:', err);
        return res.status(500).json({ error: 'Error deleting contact request' });
      }

      res.json({ message: 'Contact request deleted successfully' });
    });
  },

  markAsRead: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid request ID' });
    }

    ContactRequest.markAsRead(id, (err) => {
      if (err) {
        console.error('Error marking as read:', err);
        return res.status(500).json({ error: 'Error marking as read' });
      }

      res.json({ message: 'Marked as read successfully' });
    });
  }
};

module.exports = contactRequestController;
