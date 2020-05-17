const express = require("express"),
  router = express.Router();
const checkToken = require("./middleware/checkToken");
const checkUser = require("./middleware/checkUser");

const book = require("./models/book");
const user = require("./models/user");

router.post("/signup", checkUser, user.signup);
router.post("/signin", user.signin);

router
  .route("/book")
  // GET endpoint
  .get(book.getBooks)
  // POST endpoint
  .post(checkToken, book.addBook);

module.exports = router;
