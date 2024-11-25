//to handle operations related to books
const { query } = require("../DB");

const createBook = async ({ title, author, cover_url, rating, review }) => {
  const query = `
        INSERT INTO books (title, author, cover_url, rating, review)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
  const values = [title, author, cover_url, rating, review];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Update an existing book
const updateBook = async (id, { title, author, cover_url, rating, review }) => {
  const query = `
        UPDATE books
        SET title = $1, author = $2, cover_url = $3, rating = $4, review = $5
        WHERE id = $6
        RETURNING *;
    `;
  const values = [title, author, cover_url, rating, review, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// Delete a book by ID
const deleteBook = async (id) => {
  const query = `DELETE FROM books WHERE id = $1;`;
  await pool.query(query, [id]);
};

// Get all books with optional sorting
const getAllBooks = async ({ column = "id", order = "ASC" }) => {
  const query = `
        SELECT * FROM books
        ORDER BY ${column} ${order};
    `;
  const { rows } = await pool.query(query);
  return rows;
};

module.exports = { createBook, updateBook, deleteBook, getAllBooks };