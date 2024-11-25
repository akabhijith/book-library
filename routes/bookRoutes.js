const express = require('express');
const router=express.Router();
const Book=require('../model/bookModel');
const {getBookCover}=require('../helpers/openLibrary');
const { body, validationResult } = require("express-validator");

// Display all books with sorting options
router.get('/', async (req, res) => {
    const sort = req.query.sort || 'recent'; //Default to 'recent'
    const sortOption =
        sort === 'title'
            ? { column: 'title', order: 'ASC' }
            : sort === 'rating'
            ? { column: 'rating', order: 'DESC' }
            : { column: 'created_at', order: 'DESC' }; // Default: Recent

    try {
        const books = await Book.getAllBooks(sortOption);
        res.render("index", { books, sort });
    } catch (error) {
        console.error(error);
        req.flash("error", "Error fetching books.");
        res.render("index", { books: [], sort: "recent" });
    }
});

// Display form to add a new book
router.get('/add-book', (req, res) => {
    res.render('bookForm');
});

// Display form to edit a book
router.get('/edit-book/:id', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    res.render('bookForm', { book });
});

// Display details of a single book
router.get('/books/:id', async (req, res) => {
    const book = await Book.getBookById(req.params.id);
    res.render('bookDetails', { book });
});

// Create a new book
router.post(
  "/books",
  [
    body("title").notEmpty().withMessage("Title is required").trim(),
    body("author").notEmpty().withMessage("Author is required").trim(),
    body("isbn").optional().isISBN().withMessage("Invalid ISBN format"),
    body("rating")
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("review")
      .optional()
      .isLength({ max: 500 })
      .withMessage("Review must not exceed 500 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash(
        "error",
        errors
          .array()
          .map((err) => err.msg)
          .join(", ")
      );
      return res.redirect("/add-book");
    }
    const { title, author, isbn, rating, review } = req.body;
    const cover_url = isbn ? await getBookCover(isbn) : "default_cover_url.jpg";

    try {
      const newBook = await Book.createBook({
        title,
        author,
        cover_url,
        rating,
        review,
      });
      req.flash("success", "Book added successfully!");
      res.redirect("/?sort=recent");
    } catch (error) {
      console.error(error);
      req.flash("error", "Error creating book.");
      res.redirect("/add-book"); // Redirect to the "Add Book" page or form
    }
  }
);

// Read a single book by ID
router.get('/book/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Book.getBookById(id);
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error retrieving book');
    }
});

// Update a book
router.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, isbn, rating, review } = req.body;
    const cover_url = isbn ? await getBookCover(isbn) : null;

    try {
        const updatedBook = await Book.updateBook(id, { title, author, cover_url, rating, review });
        req.flash('success', 'Book updated successfully!');
        res.redirect(`/books/${id}`); // Redirect to the updated book's details page
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error updating book.');
        res.redirect(`/edit-book/${id}`); // Redirect to the "Edit Book" form for the same book
    }
});

// Delete a book
router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Book.deleteBook(id);
        req.flash('success', 'Book deleted successfully!');
        res.redirect("/?sort=recent"); // Redirect to the homepage or book list
    } catch (error) {
        console.error(error);
        req.flash('error', 'Error deleting book.');
        res.redirect("/?sort=recent"); // Redirect to the homepage or book list
    }
});

module.exports=router;  