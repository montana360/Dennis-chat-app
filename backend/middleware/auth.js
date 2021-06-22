const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ message: 'No Token - Authorization Denied' });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(401)
        .json({ message: 'Cannot Verify - Authorization Denied' });
    }
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: err });
  }
};
