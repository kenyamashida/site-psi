const Psychologist = require('../models/psychologist');
const config = require('../config');

const psychologistController = {
  listActive: (req, res) => {
    Psychologist.listActive((err, rows) => {
      if (err) {
        console.error('Erro ao buscar psicólogos:', err);
        return res
          .status(500)
          .json({ error: config.messages.error });
      }
      res.json(rows || []);
    });
  },

  listAll: (req, res) => {
    Psychologist.listAll((err, rows) => {
      if (err) {
        console.error('Erro ao buscar psicólogos:', err);
        return res
          .status(500)
          .json({ error: config.messages.error });
      }
      res.json(rows || []);
    });
  },

  getById: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID do psicólogo inválido' });
    }

    Psychologist.getById(id, (err, row) => {
      if (err) {
        console.error('Erro ao buscar psicólogo:', err);
        return res
          .status(500)
          .json({ error: config.messages.error });
      }

      if (!row) {
        return res.status(404).json({ error: 'Psicólogo não encontrado' });
      }

      res.json(row);
    });
  },

  create: (req, res) => {
    const { name, crp, specialty, description, full_bio, education, photo_url } = req.body;
    const { nameMaxLength, crpMaxLength } = config.validation;

    if (!name || !crp || !specialty || !description) {
      return res
        .status(400)
        .json({ error: 'Campos obrigatórios: nome, crp, especialidade e descrição' });
    }

    if (name.length > nameMaxLength) {
      return res
        .status(400)
        .json({ error: `Nome deve ter no máximo ${nameMaxLength} caracteres` });
    }

    if (crp.length > crpMaxLength) {
      return res
        .status(400)
        .json({ error: `CRP deve ter no máximo ${crpMaxLength} caracteres` });
    }

    const data = { name, crp, specialty, description, full_bio, education, photo_url };

    Psychologist.create(data, (err) => {
      if (err) {
        console.error('Erro ao criar psicólogo:', err);
        if (err.message && err.message.includes('UNIQUE constraint failed')) {
          return res.status(400).json({ error: 'CRP já cadastrado' });
        }
        return res.status(500).json({ error: config.messages.error });
      }

      res.status(201).json({ message: 'Psicólogo cadastrado com sucesso' });
    });
  },

  update: (req, res) => {
    const { id } = req.params;
    const { name, crp, specialty, description, full_bio, education, photo_url } = req.body;
    const { nameMaxLength, crpMaxLength } = config.validation;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID do psicólogo inválido' });
    }

    if (!name || !crp || !specialty || !description) {
      return res
        .status(400)
        .json({ error: 'Campos obrigatórios: nome, crp, especialidade e descrição' });
    }

    if (name.length > nameMaxLength || crp.length > crpMaxLength) {
      return res.status(400).json({ error: config.messages.validationError });
    }

    const data = { name, crp, specialty, description, full_bio, education, photo_url };

    Psychologist.update(id, data, (err) => {
      if (err) {
        console.error('Erro ao atualizar psicólogo:', err);
        return res.status(500).json({ error: config.messages.error });
      }

      res.json({ message: 'Psicólogo atualizado com sucesso' });
    });
  },

  deleteOne: (req, res) => {
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'ID do psicólogo inválido' });
    }

    Psychologist.delete(id, (err) => {
      if (err) {
        console.error('Erro ao remover psicólogo:', err);
        return res.status(500).json({ error: config.messages.error });
      }

      res.json({ message: 'Psicólogo removido com sucesso' });
    });
  },
};

module.exports = psychologistController;
