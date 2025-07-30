const express = require('express');
const {books} = require('../data/books.json');
const {users} = require('../data/users.json');
const e = require('express');

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get the full list of books
 * Access: Public
 * Parameters: None
 */
router.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    data: books,
  });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get a book by ID
 * Access: Public
 * Parameters: id
 */
router.get('/:id', (req, res) => {
  // Extract book ID from route parameters
  const {id} = req.params;
  // Find book with matching ID
  const book = books.find((each)=> each.id === id);

  // If book not found, return 404
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `book not found for the ID: ${id}`,
    });
  }

  // Respond with book data
  res.status(200).json({
    success: true,
    data: book,
  });
});

/**
 * Route: /books
 * Method: POST
 * Description: Create/Register a new book
 * Access: Public
 * Parameters: None
 */
router.post('/', (req, res) => {
  // Destructure required fields from request body
  const {id, title, author, publishedYear, genre} = req.body;

  // Validate all required fields are present
  if (!id || !title || !author || !publishedYear || !genre === undefined) {
    // If any field is missing, return 400 Bad Request
    return res.status(400).json({
      success: false,
      message: 'Please provide all the required fields',
    });
  }

  // Check if book with the same ID already exists
  const bookExists = books.find((each) => each.id === id);
  if (bookExists) {
    return res.status(400).json({
      success: false,
      message: `book with ID: ${id} already exists`,
    });
  }

  // Add new book to the books array
  books.push({
    id,
    title,
    author,
    publishedYear,
    genre,
  });

  // Respond with success message and updated books list
  res.status(201).json({
    success: true,
    message: 'book created successfully',
    data: {id, title, author, publishedYear, genre},
  });
})

/** 
 * Route: /books/:id
 * Method: PUT
 * Description: Update a book by their ID
 * Access: Public
 * Parameters: id
 */
router.put('/:id', (req, res) => {
  const {id} = req.params;
  const {data} = req.body;

  // Check if book with the given ID exists
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `book not found for the ID: ${id}`,
    });
  }
  // If book exists, update their data
  const updatedbook = books.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data, // Merge existing book data with new data
      };
    } 
    return each; // Return unchanged book
  })

  res.status(200).json({
    success: true,
    message: 'book updated successfully',
    data: updatedbook,
  });
})

/**
 * Route: /books/:id
 * Method: DELETE
 * Description: Delete a book by their ID
 * Access: Public
 * Parameters: id
 */
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  // Check if book with the given ID exists
  const book = books.find((each) => each.id === id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `book not found for the ID: ${id}`,
    });
  }

  // const index = books.indexOf(book);
  // books.splice(index, 1); // Remove book from the array
  // const updatedbooks = books;
  // Filter out the book with the given ID
  // This creates a new array without the book to be deleted
  const updatedbooks = books.filter((each) => each.id !== id);
  // Respond with success message and updated books list
  res.status(200).json({
    success: true,
    message: 'book deleted successfully',
    data: updatedbooks,
  });
});

/**
 * Route: /books/issued
 * Method: GET
 * Description: Get all books that are currently issued
 * Access: Public
 * Parameters: None
 */
router.get('/issued/for-users', (req, res) => {
  const userWithIssuedBooks = users.filter((each) => {
    if(each.issuedBooks) {
      return each;
    }
  });

  const issuedBooks = [];
  userWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBooks);
    book.issuedby = each.name; // Add the name of the user who issued the book
    book.issuedDate = each.issuedDate; // Add issued date
    book.returnDate = each.returnDate; // Add return date
    issuedBooks.push(book);
  });

  if(!issuedBooks === 0) {
    return res.status(404).json({
      success: false,
      message: 'No books are currently issued',
    });
  }

  res.status(200).json({
    success: true,
    data: issuedBooks,
  });
});


module.exports = router;