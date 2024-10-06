const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-secret'; // Use a secure secret or set it in environment variables

// Register user
const register = async (req, res) => {
    try {
        const { email, password, username, name } = req.body;

        // Check if the user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already registered' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await userModel.create({
            username,
            email,
            name,
            password: hashedPassword,
        });

        const token = jwt.sign({ email: newUser.email, userid: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set the token in the cookies
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour expiry

        res.status(201).json({ message: 'User registered successfully', newUser });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while registering the user', error: error.message });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        // console.log(user)

        // Generate a JWT token
        const token = jwt.sign({ email: user.email, userid: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Set the token in the cookies
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1 hour expiry

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while logging in', error: error.message });
    }
};

// Logout user
const logout = (req, res) => {
    // Clear the token cookie
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};

module.exports = { register, login, logout };
