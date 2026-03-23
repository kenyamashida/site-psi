const express = require('express');
const router = express.Router();
const { auth, requireAdmin } = require('../middleware/auth');
const psychologistController = require('../controllers/psychologistController');
const contactRequestController = require('../controllers/contactRequestController');

router.use(auth);
router.use(requireAdmin);

router.get('/psychologists', psychologistController.listAll);
router.get('/psychologists/:id', psychologistController.getById);
router.post('/psychologists', psychologistController.create);
router.put('/psychologists/:id', psychologistController.update);
router.delete('/psychologists/:id', psychologistController.deleteOne);

router.get('/requests', contactRequestController.list);
router.get('/requests/:id', contactRequestController.getById);
router.patch('/requests/:id/read', contactRequestController.markAsRead);
router.delete('/requests/:id', contactRequestController.delete);

module.exports = router;
