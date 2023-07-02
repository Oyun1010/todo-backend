const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = async (req, res, next) => {

  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
     req.user_id = decoded.id;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
