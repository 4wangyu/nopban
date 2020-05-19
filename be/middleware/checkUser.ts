const findByEmail = require("../models/user")["findByEmail"];

const checkUser = (req: any, res: any, next: any) => {
  const form = req.body;
  findByEmail(form.email).then((user: any) => {
    if (user) {
      return res.status(400).json({
        error: "User already exists.",
      });
    } else {
      next();
    }
  });
};

export default checkUser;
