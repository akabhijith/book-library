const express = require('express');
const router=express.Router();
const Book=require('../model/bookModel');
const {getBookCover}=require('../helpers/openLibrary');

//Create a new book
router.post('/books',async(req,res)=>{
    const{title,author,isbn,rating,review}=req.body;
    const cover_url=isbn ? await getBookCover(isbn) : 'default_cover_url.jpg';

    try{
        const newBook= await Book.createBook({title, author, cover_url, rating, review});
        res.json(newBook);
    }
    catch(error){
        console.error(error);
        res.status(500).send("Error creating book");
    }
});

//Read all books
router.get('/books',async(req,res)=>{
    try{
        const books=await Book.getAllBooks();
        res.json(books);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error retrieving books');

    }
})

//Read a single book by id
router.get('/book/:id',async(req,res)=>{
    const {id}=req.params;

    try{
        const book=await Book.getBookById(id);
        res.json(book);
    }catch(error){
        console.error(error);
        res.status(500).send('Error retrieving book');
    }
});

// Update a book
router.put('/books/:id',async(req,res)=>{
    const {id}=req.params;
    const {title,author,isbn,rating,review}=req.body;
    const cover_url=isbn ? await getBookCover(isbn): null;

    try{
        const updatedBook=await Book.updateBook(id,{title,author,isbn,rating,review});
        res.json(updatedBook);
    }
    catch(error){
        console.error(error);
        res.status(500).send('Error updating book')
    }
});

// Delete a book
router.delete('/books/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Book.deleteBook(id);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting book');
    }
});

module.exports=router;  