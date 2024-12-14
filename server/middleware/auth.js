// const jwt = require('jsonwebtoken');

// module.exports = (req, res, next) => {
//     const token = req.header('x-auth-token');
//     if (!token) return res.status(401).json({ message: 'No token, authorization denied' });
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         req.user = decoded.user;
//         next();
//     } catch (err) {
//         res.status(401).json({ message: 'Token is not valid' });
//     }
// };
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    let token;

    // Extract token from header or cookie
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.header('x-auth-token')) {
        token = req.header('x-auth-token');
    } else if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
    }

    // If no token found, deny access
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user info from token to request object
        req.user = decoded;

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Token verification failed:', err.message);
        }
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authMiddleware;
