// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//     const token = req.cookies.token;
//     console.log(token)
//     if (!token) return res.status(401).json({ message: "Unauthorized" });

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         console.log(user)
//         if (err) return res.status(403).json({ message: "Forbidden" });
//         req.user = user;
//         next();
//     });
// };

// module.exports = authenticateToken;


const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Ensure you have this set up in your app

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Ensure cookie-parser middleware is used
    // console.log('Token:', token); // Debugging line to check token value

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('JWT Error:', err); // Log error for debugging
            return res.status(403).json({ message: "Forbidden" });
        }

        // console.log('Decoded User:', user); // Debugging line to check user object
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
