const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const db = require('./config/db');
const { app, server } = require('./socket/socket')

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes'); // 
const searchRoutes = require('./routes/searchRoutes');
const messageRoutes = require('./routes/messageRoute')

dotenv.config();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
db.connect();

// Middleware to serve static files with custom headers
app.use(express.static('public', {
    setHeaders: (res, path) => {
        if (path.endsWith('.mp4')) {
            res.set('Content-Type', 'video/mp4');
        }
    }
}));

// Middleware
app.use('/public/images/uploads', express.static(path.join(__dirname, 'public', 'images', 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, '/public/images/uploads')));
app.use(express.json());
app.use(cookieParser());

// Route handling
app.use('/api', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/message', messageRoutes);

// Serve the React frontend
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('done')
})

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});




