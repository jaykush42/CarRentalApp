const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const carController = require('../controllers/carController');

router.get('/', carController.getCars);
router.get('/:id', carController.getCar);
router.post('/', auth, carController.addCar);
router.put('/:id',auth, carController.updateCar);
router.put('/:id/rating',auth, carController.updateRating);
router.delete('/:id',auth, carController.deleteCar);
router.post('/search', carController.searchCars); 

module.exports = router;
