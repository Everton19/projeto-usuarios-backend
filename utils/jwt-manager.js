const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ANGULAR_JWT_SECRET';

const JWT_TOKEN = (username) => {
    return jwt.sign(
        { username },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
}

const validateToken = (token) => {
    try {
        if (!token) {
            throw new Error('Empty token provided');
        }
        jwt.verify(token, JWT_SECRET);
        return true;
    } catch (error) {
        console.error('Token validation error:', error);
        return false;
    }
}

module.exports = {
    JWT_TOKEN,
    validateToken
}