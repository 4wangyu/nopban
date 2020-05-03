const environment = process.env.NODE_ENV || "development";
const configuration = require("../../knexfile")[environment];
const database = require("knex")(configuration);
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash);
    })
  );
};

const createUser = (user) => {
  return database
    .raw(
      "INSERT INTO Users (Username, PwdDigest, Token, CreatedAt) VALUES (?, ?, ?, ?) RETURNING Id, Username, CreatedAt, Token",
      [user.username, user.pwdDigest, user.token, new Date()]
    )
    .then((data) => data.rows[0]);
};

const createToken = (username) => {
  return new Promise((resolve, reject) => {
    jwt.sign({ username }, process.env.SECRET, (err, token) => {
      err ? reject(err) : resolve(token);
    });
  });
};

const signup = (request, response) => {
  const user = request.body;

  hashPassword(user.password)
    .then((hashedPassword) => {
      delete user.password;
      user.pwdDigest = hashedPassword;
    })
    .then(() => createToken(user.username))
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

const findUser = (userReq) => {
  return database
    .raw("SELECT * FROM users WHERE username = ?", [userReq.username])
    .then((data) => data.rows[0]);
};

const checkPassword = (reqPassword, foundUser) => {
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

const updateUserToken = (token, user) => {
  return database
    .raw(
      "UPDATE users SET token = ? WHERE id = ? RETURNING id, username, token",
      [token, user.id]
    )
    .then((data) => data.rows[0]);
};

const signin = (request, response) => {
  const userReq = request.body;
  let user;

  findUser(userReq)
    .then((foundUser) => {
      user = foundUser;
      console.log(user);
      console.log(userReq);

      return checkPassword(userReq.password, foundUser);
    })
    .then((res) => createToken())
    .then((token) => updateUserToken(token, user))
    .then(() => {
      delete user.pwdDigest;
      response.status(200).json(user);
    })
    .catch((err) => {
      console.error(err);
      response.status(400).json({ error: "Unable to sign in." });
    });
};

const findByToken = (token) => {
  return database
    .raw("SELECT * FROM users WHERE token = ?", [token])
    .then((data) => data.rows[0]);
};

const authenticate = (userReq) => {
  findByToken(userReq.token).then((user) => {
    if (user && user.username == userReq.username) {
      return true;
    } else {
      return false;
    }
  });
};

module.exports = {
  signup,
  signin,
  authenticate,
};
