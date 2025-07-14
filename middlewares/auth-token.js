const { validateToken } = require('../utils/jwt-manager');

const authToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'No token provided'
    });
  }

  const TOKEN_IS_VALID = validateToken(token);

  if (!TOKEN_IS_VALID) {
    return res.status(403).json({
      message: 'Invalid token'
    });
  }

  next();
}

module.exports = { authToken };