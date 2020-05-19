import database from "../database";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
require("dotenv").config();

const hashPassword = (password: string) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    })
  );
};

const createUser = (user: any) => {
  return database
    .raw(
      "INSERT INTO Users (Username, Email, PwdDigest, Token, CreatedAt) VALUES (?, ?, ?, ?, ?) RETURNING Id, Username, Email, CreatedAt, Token",
      [user.username, user.email, user.pwdDigest, user.token, new Date()]
    )
    .then((data: any) => data.rows[0]);
};

const createToken = (email: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { email },
      process.env.SECRET as string,
      (err: any, token: any) => {
        err ? reject(err) : resolve(token);
      }
    );
  });
};

const signup = (request: any, response: any) => {
  const user = request.body;

  hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password;
      user.pwdDigest = hashedPassword;
    })
    .then(() => createToken(user.email))
    .then((token) => (user.token = token))
    .then(() => createUser(user))
    .then((user) => {
      delete user.pwdDigest;
      response.status(201).json({ user });
    })
    .catch((err) => {
      console.error(err);
      response.status(400).json({ error: "Unable to sign up." });
    });
};

const findUser = (userReq: any) => {
  return database
    .raw("SELECT * FROM users WHERE email = ?", [userReq.email])
    .then((data: any) => data.rows[0]);
};

const checkPassword = (reqPassword: any, foundUser: any) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(reqPassword, foundUser.pwddigest, (err, response) => {
      if (err) {
        reject(err);
      } else if (response) {
        resolve(response);
      } else {
        reject(new Error("Passwords do not match."));
      }
    })
  );
};

const updateUserToken = (token: any, user: any) => {
  return database
    .raw("UPDATE users SET token = ? WHERE id = ? RETURNING id, email, token", [
      token,
      user.id,
    ])
    .then((data: any) => data.rows[0]);
};

const signin = (request: any, response: any) => {
  const userReq = request.body;
  let user: any;

  findUser(userReq)
    .then((foundUser: any) => {
      user = foundUser;
      console.log(user);
      console.log(userReq);

      return checkPassword(userReq.password, foundUser);
    })
    .then((res: any) => createToken(user.email))
    .then((token: string) => updateUserToken(token, user))
    .then(() => {
      response.status(200).json({
        user: user.username,
        email: user.email,
        token: user.token,
      });
    })
    .catch((err: any) => {
      console.error(err);
      response.status(400).json({ error: "Unable to sign in." });
    });
};

const findByEmail = (email: string) => {
  return database
    .raw("SELECT * FROM users WHERE email = ?", [email])
    .then((data: any) => data.rows[0]);
};

export { signup, signin, findByEmail };
