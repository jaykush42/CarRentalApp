const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const { protect, protectRole } = require('../middlewares/protect');

// Public/User
router.get('/', carController.getCars);
router.get('/:id', carController.getCar);
router.post('/search', carController.searchCars);
router.put('/:id/rating', protect, carController.updateRating);

// Host-only
router.get('/host/:hostId', protect, protectRole(['host']), carController.getCarsByHost);
router.get('/host/:hostId/:id', protect, protectRole(['host']), carController.getCarByHost);
router.post('/host/:hostId', protect, protectRole(['host']), carController.addCar);
router.put('/host/:hostId/:id', protect, protectRole(['host']), carController.updateCar);
router.put('/status/host/:hostId/:id', protect, protectRole(['host']), carController.updateStatus);
router.delete('/host/:hostId/:id', protect, protectRole(['host']), carController.deleteCar);

module.exports = router;
