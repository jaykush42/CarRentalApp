const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const carRoutes = require('./routes/cars');
const bookingRoutes = require('./routes/bookings');
const authRoutes = require('./routes/auth');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;
console.log('Starting Database')
mongoose.connect(process.env.MONGO_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.error(error.message));
