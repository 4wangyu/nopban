const express = require("express"),
  router = express.Router();

const book = require("./models/book");
const user = require("./models/user");

router.post("/signup", user.signup);
router.post("/signin", user.signin);

router
  .route("/book")
  // GET endpoint
  .get(book.getBooks)
  // POST endpoint
  .post(book.addBook);

module.exports = router;
