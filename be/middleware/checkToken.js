const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = (req, res, next) => {
  let token = req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (!token) {
    return res.status(401).json({
      error: "Not authorized.",
    });
  }

  if (token) {
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          error: "Invalid token.",
        });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

module.exports = checkToken;
