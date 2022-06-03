const express = require('express');
const router = express.Router();

const SeatController = require('../controllers/seats.controller');

// get all seats

router.get('/seats', SeatController.getAll);

router.get('/seats/:id', SeatController.getById);

router.post('/seats', SeatController.post);

router.delete('/seats/:id', SeatController.delete);

router.put('/seats/:id', SeatController.put);

module.exports = router;