const jwt = require('jsonwebtoken');

const JWT_SECRET = 'ANGULAR_JWT_SECRET';

const JWT_TOKEN = (username) => {
    return jwt.sign(
        { username },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
}

module.exports = {
    JWT_TOKEN
}