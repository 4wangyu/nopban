const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { pool } = require("./config");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../fe/build")));

const user = require("./models/user.js");

app.post("/signup", user.signup);

app.post("/signin", user.signin);

const getBooks = (request, response) => {
  pool.query("select * from Book", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const addBook = (request, response) => {
  const { author, title } = request.body;

  pool.query(
    "insert into Book (Author, Title) values ($1, $2)",
    [author, title],
    error => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "Book added." });
    }
  );
};

app
  .route("/books")
  // GET endpoint
  .get(getBooks)
  // POST endpoint
  .post(addBook);

// Anything that doesn't match the above, send back the index.html file
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../fe/build/index.html"));
});

// Start server
app.listen(process.env.PORT || 3002, () => {
  console.log(`Server listening`);
});
