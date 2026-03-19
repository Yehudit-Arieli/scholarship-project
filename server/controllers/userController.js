import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
export const register = async (req, res) => {
    try {
        const { tz, firstName, lastName, passWord } = req.body;

        const existingUser = await User.findOne({ tz });

        // Check credentials
        if (existingUser) {
            return res.status(400).json({ message: "Invalid ID or password" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passWord, salt);

        const newUser = new User({
            tz,
            firstName,
            lastName,
            passWord: hashedPassword
        });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                tz: newUser.tz,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during login", error: error.message });
    }
};


/**
 * @desc    Authenticate user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
export const login = async (req, res) => {
    try {
        const { tz, passWord } = req.body;
        const user = await User.findOne({ tz });

        // Verify user existence and password validity
        if (!user || !(await bcrypt.compare(passWord, user.passWord))) {
            return res.status(401).json({ message: "Invalid ID or password" });
        }
        // Generate JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.status(200).json({
            message: "Logged in successfully",
            token: token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                tz: user.tz,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server error during authentication", error: error.message });
    }
};