import mongoose from 'mongoose';

/**
 * User Schema
 * Defines the structure for both Students and Administrators
 */
const userSchema = new mongoose.Schema({
    // Identity Number (T.Z) - used as a unique identifier
    tz: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    // The user's encrypted password
    passWord: {
        type: String,
        required: true
    },
    // User role to handle permissions (Student by default)
    role: {
        type: String,
        enum: ['student', 'admin'],
        default: 'student'
    }
}, {
    // Automatically creates 'createdAt' and 'updatedAt' fields
    timestamps: true
});

export default mongoose.model('User', userSchema);