
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const hostRoutes = require('./routes/hostRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(cors({
    origin:'*',
    credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/hosts', hostRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(notFound);

app.use(errorHandler);

// Database connection and server start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch((error) => {
    console.error('MongoDB connection error:', error.message);
});
