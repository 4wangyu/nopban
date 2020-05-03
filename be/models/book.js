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

  pool.query(
    "insert into Book (Author, Title) values ($1, $2)",
    [author, title],
    (error) => {
      if (error) {
        throw error;
      }
      response.status(201).json({ status: "success", message: "Book added." });
    }
  );
};

module.exports = {
  getBooks,
  addBook,
};
