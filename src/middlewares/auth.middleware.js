// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).json({ result: { message: 'No token provided' } });
    }

    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ result: { message: 'Invalid token format' } });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next();
    } catch (err) {
        return res.status(403).json({ result: { message: 'Token is invalid or expired' } });
    }
};

module.exports = authMiddleware;

