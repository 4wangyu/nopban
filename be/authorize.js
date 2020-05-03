require("dotenv").config();

const authorize = (req, res, next) => {
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
        req.username = decoded.username;
        next();
      }
    });
  }
};

module.exports = authorize;
