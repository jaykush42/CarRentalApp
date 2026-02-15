const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

dotenv.config();

const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const hostRoutes = require('./routes/hostRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

/* ================= Middleware ================= */

const allowedOrigins = [
  "http://localhost:5173",
  ...(process.env.CLIENT_URLS
    ? process.env.CLIENT_URLS.split(",")
    : [])
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "x-auth-token"],
  })
);


app.use(express.json()); // replaces bodyParser.json()
app.use(cookieParser());

/* ================= Routes ================= */

app.use('/api/users', userRoutes);
app.use('/api/hosts', hostRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/bookings', bookingRoutes);

app.use(notFound);
app.use(errorHandler);

/* ================= Database & Server ================= */

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });
