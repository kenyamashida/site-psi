const express = require('express');
const router = express.Router();
const contactRequestController = require('../controllers/contactRequestController');

// Rotas específicas primeiro (evitar conflito com /:id)
router.get('/psychologist/:psychologist_id', contactRequestController.listByPsychologist);

// Rotas genéricas
router.get('/', contactRequestController.list);
router.get('/:id', contactRequestController.getById);
router.post('/', contactRequestController.create);
router.put('/:id', contactRequestController.update);
router.patch('/:id/read', contactRequestController.markAsRead);
router.delete('/:id', contactRequestController.delete);

module.exports = router;
