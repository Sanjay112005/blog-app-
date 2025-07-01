const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']; // readind the authorization header from the incoming request 
  const token = authHeader && authHeader.split(' ')[1];  // extracting the token from the header, and splitting it to get the actual token part which is the second part after the space so we gave [1]

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //  console.log("✅ Decoded token:", decoded); 
    req.user = decoded; 
    next(); 
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token.' });
  }
}

module.exports = verifyToken;
