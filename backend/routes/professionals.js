const express = require('express');
const router = express.Router();
const psychologistController = require('../controllers/psychologistController');

// Routes
router.get('/', psychologistController.listActive);
router.get('/all', psychologistController.listAll);
router.get('/:id', psychologistController.getById);
router.post('/', psychologistController.create);
router.put('/:id', psychologistController.update);
router.delete('/:id', psychologistController.deleteOne);

module.exports = router;
