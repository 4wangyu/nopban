import jwt from "jsonwebtoken";
require("dotenv").config();

const checkToken = (req: any, res: any, next: any) => {
  let token = req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (!token) {
    return res.status(401).json({
      error: "Not authorized.",
    });
  }

  if (token) {
    jwt.verify(
      token,
      process.env.SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({
            error: "Invalid token.",
          });
        } else {
          req.email = decoded.email;
          next();
        }
      }
    );
  }
};

export default checkToken;
