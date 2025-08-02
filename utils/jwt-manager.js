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
    let TOKEN_VALID = undefined;

    try {
        if (!token) {
            throw new Error('Empty token provided');
        }

        TOKEN_VALID = jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('Token validation error:', error);
        TOKEN_VALID = undefined;
    }

    return TOKEN_VALID;
}

module.exports = {
    JWT_TOKEN,
    validateToken
}