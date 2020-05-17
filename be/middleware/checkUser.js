const findByEmail = require("../models/user")["findByEmail"];

const checkUser = (req, res, next) => {
  const form = req.body;
  findByEmail(form.email).then((user) => {
    if (user) {
      return res.status(400).json({
        error: "User already exists.",
      });
    } else {
      next();
    }
  });
};

module.exports = checkUser;
