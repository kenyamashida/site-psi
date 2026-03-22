const express = require('express');
const router = express.Router();
const contactRequestController = require('../controllers/contactRequestController');

// Routes
router.get('/', contactRequestController.list);
router.get('/:id', contactRequestController.getById);
router.get('/psychologist/:psychologist_id', contactRequestController.listByPsychologist);
router.post('/', contactRequestController.create);
router.put('/:id', contactRequestController.update);
router.patch('/:id/read', contactRequestController.markAsRead);
router.delete('/:id', contactRequestController.delete);

module.exports = router;
