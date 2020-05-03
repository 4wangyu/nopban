const { pool } = require("../config");

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
  if (author && title) {
    pool.query(
      "insert into Book (Author, Title) values ($1, $2)",
      [author, title],
      (error) => {
        if (error) {
          console.log(error);
        }
        response
          .status(201)
          .json({ status: "success", message: "Book added." });
      }
    );
  } else {
    response.status(400).json({ error: "Failed to add book." });
  }
};

module.exports = {
  getBooks,
  addBook,
};
