const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const book = require("./models/book");
const user = require("./models/user");

// Setup express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,HEAD,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization ,Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../fe/build")));

// Routes & Handlers
app.post("/signup", user.signup);
app.post("/signin", user.signin);

app
  .route("/books")
  // GET endpoint
  .get(book.getBooks)
  // POST endpoint
  .post(book.addBook);

// Anything that doesn't match the above, send back the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../fe/build/index.html"));
});

const port = process.env.PORT || 3001;
// Start server
app.listen(port, () => console.log(`Server is listening on port: ${port}`));
