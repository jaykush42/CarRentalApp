const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

router.get('/', carController.getCars);
router.post('/', carController.addCar);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);
router.post('/search', carController.searchCars); // Add search route

module.exports = router;
