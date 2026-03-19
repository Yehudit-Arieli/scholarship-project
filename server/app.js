import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import requestRoutes from './routes/requestRoutes.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

/**
 * Middleware setup
 */
app.use(cors());
app.use(express.json());


/**
 * Database Connection
 */
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB successfully'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

/**
 * API Routes
 */
app.use('/api/requests', requestRoutes);
app.use('/api/users', userRoutes);

/**
 * Static Files Configuration
 * Serves uploaded documents/files from the 'uploads' directory
 */
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

/**
 * Server Configuration
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});