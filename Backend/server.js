const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());
app.use(express.json());

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/lectures', require('./routes/lectureRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
