const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'your_zitadel_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }

    // Store the decoded user information in the request object
    req.user = decoded;
    next();
  });
};

module.exports = authenticateToken;
