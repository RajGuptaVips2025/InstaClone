const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Ensure you have this set up in your app

const authenticateToken = (req, res, next) => {
    const token = req.cookies.token; // Ensure cookie-parser middleware is used
    // console.log('Token:', token); // Debugging line to check token value

    if (!token) return res.status(401).json({ message: "Unauthorizedjshdjshdjwh" });

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











// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser'); // Ensure cookie-parser middleware is used

// const authenticateToken = (req, res, next) => {
//     const token = req.cookies.token ; // Look for token in cookies or Authorization header
//     console.log('Token:', token); // Debugging line to check token value

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized - No token provided" });
//     }

//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             console.error('JWT Error:', err); // Log error for debugging
//             return res.status(403).json({ message: "Forbidden" });
//         }

//         console.log('Decoded User:', user); // Debugging line to check user object
//         req.user = user;
//         next();
//     });
// };

// module.exports = authenticateToken;

















// const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser'); // Ensure you have this set up in your app

// const authenticateToken = (req, res, next) => {
//     // First, check for the token in the cookies
//     let token = req.cookies.token;

//     // If no token in cookies, check in the Authorization header (Bearer token)
//     if (!token && req.headers.authorization) {
//         const authHeader = req.headers.authorization;
//         if (authHeader.startsWith("Bearer ")) {
//             token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" string
//         }
//     }

//     console.log('Token:', token); // Debugging line to check token value

//     if (!token) return res.status(401).json({ message: "Unauthorized - No token provided" });

//     // Verify the token
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//             console.error('JWT Error:', err); // Log error for debugging
//             return res.status(403).json({ message: "Forbidden - Invalid token" });
//         }

//         console.log('Decoded User:', user); // Debugging line to check user object
//         req.user = user;
//         next();
//     });
// };

// module.exports = authenticateToken;
