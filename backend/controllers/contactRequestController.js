const ContactRequest = require('../models/contactRequest');
const config = require('../config');
const { messageMinLength, nameMinLength } = config.validation;

const contactRequestController = {
  list: (req, res) => {
    ContactRequest.list((err, rows) => {
      if (err) {
        console.error('Erro ao buscar solicitações:', err);
        return res.status(500).json({ error: config.messages.error });
      }
      res.json(rows || []);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID da solicitação inválido' });
    }

    ContactRequest.getById(id, (err, row) => {
      if (err) {
        console.error('Erro ao buscar solicitação:', err);
        return res.status(500).json({ error: config.messages.error });
      }

      if (!row) {
        return res.status(404).json({ error: 'Solicitação não encontrada' });
      }

      res.json(row);
    });
  },

  listByPsychologist: (req, res) => {
    const { psychologist_id } = req.params;

    if (!psychologist_id || isNaN(psychologist_id)) {
      return res.status(400).json({ error: 'ID do psicólogo inválido' });
    }

    ContactRequest.listByPsychologist(psychologist_id, (err, rows) => {
      if (err) {
        console.error('Erro ao buscar solicitações:', err);
        return res.status(500).json({ error: config.messages.error });
      }
      res.json(rows || []);
    });
  },

  create: (req, res) => {
    const { psychologist_id, name, email, phone, message } = req.body;

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: 'Campos obrigatórios: nome, email e mensagem' });
    }

    if (name.length < nameMinLength) {
      return res
        .status(400)
        .json({ error: `Nome deve ter pelo menos ${nameMinLength} caracteres` });
    }

    if (message.length < messageMinLength) {
      return res
        .status(400)
        .json({ error: `Mensagem deve ter pelo menos ${messageMinLength} caracteres` });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const data = { psychologist_id: psychologist_id || null, name, email, phone: phone || null, message };

    ContactRequest.create(data, (err) => {
      if (err) {
        console.error('Erro ao criar solicitação:', err);
        return res.status(500).json({ error: config.messages.error });
      }

      res.status(201).json({ message: 'Solicitação enviada com sucesso! Entraremos em contato em breve.' });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { psychologist_id, name, email, phone, message } = req.body;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID da solicitação inválido' });
    }

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: 'Campos obrigatórios: nome, email e mensagem' });
    }

    if (name.length < nameMinLength || message.length < messageMinLength) {
      return res.status(400).json({ error: config.messages.validationError });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const data = { psychologist_id: psychologist_id || null, name, email, phone: phone || null, message };

    ContactRequest.update(id, data, (err) => {
      if (err) {
        console.error('Erro ao atualizar solicitação:', err);
        return res.status(500).json({ error: config.messages.error });
      }

      res.json({ message: 'Solicitação atualizada com sucesso' });
    });
  },

  delete: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID da solicitação inválido' });
    }

    ContactRequest.delete(id, (err) => {
      if (err) {
        console.error('Erro ao remover solicitação:', err);
        return res.status(500).json({ error: config.messages.error });
      }

      res.json({ message: 'Solicitação removida com sucesso' });
    });
  },

  markAsRead: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID da solicitação inválido' });
    }

    ContactRequest.markAsRead(id, (err) => {
      if (err) {
        console.error('Erro ao marcar como lida:', err);
        return res.status(500).json({ error: config.messages.error });
      }

      res.json({ message: 'Marcada como lida' });
    });
  },
};

module.exports = contactRequestController;
