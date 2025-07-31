const express = require('express');
const {books} = require('../data/books.json');
const {users} = require('../data/users.json');

const {UserModel, BookModel} = require('../models/index-model.js');
const { getAllBooks, getBookById, addNewBook, getIssuedBooksForUsers, updateBook, deleteBook } = require('../controllers/book-controller.js');

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get the full list of books
 * Access: Public
 * Parameters: None
 */
router.get('/', getAllBooks);

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by ID
 * Access: Public
 * Parameters: id
 */
router.get('/:id', getBookById);

/**
 * Route: /books
 * Method: POST
 * Description: Create/Register a new book
 * Access: Public
 * Parameters: None
 */
router.post('/', addNewBook);

/** 
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by their ID
 * Access: Public
 * Parameters: id
 */
router.put('/:id', updateBook)

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete a book by their ID
 * Access: Public
 * Parameters: id
 */
router.delete('/:id', deleteBook);

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all books that are currently issued
 * Access: Public
 * Parameters: None
 */
router.get('/issued/for-users', getIssuedBooksForUsers)


module.exports = router;