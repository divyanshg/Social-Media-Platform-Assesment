const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  let token = req.headers["authorization"];
  token = token.split(" ")[1];
  
  if (!token) {
    return res.status(403).json({
      err: "A token is required for authentication"
    });
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      err: "Invalid Token"
    });
  }
  return next();
};

module.exports = verifyToken;