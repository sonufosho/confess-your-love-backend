import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/connectDB.js'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000

// Middleware
app.use(express.json());
app.use(cookieParser());

// Connect db
connectDB();

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Catch-all route for any unmatched routes
app.get(/.*/, (req, res) => {
  res.send('Confess your love API');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});