const {UserModel, BookModel} = require('../models/index-model.js');
const issuedBooks = require('../dtos/book-dto.js');

exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find({});

  if (!books) {
    return res.status(404).json({
      success: false,
      message: 'No books found',
    });
  }

  res.status(200).json({
    success: true,
    data: books,
  });
}

exports.getBookById = async (req, res) => {
  const {id} = req.params;

  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `Book not found for the ID: ${id}`,
    });
  }

  res.status(200).json({
    success: true,
    data: book,
  });
}

exports.addNewBook = async(req, res) => {
  const {data} = req.body;

  // Validate all required fields are present
  if (!data || Object.keys(data).length === 0) {
    // If any field is missing, return 400 Bad Request
    return res.status(400).json({
      success: false,
      message: 'Please provide the data to add a new Book',
    });
  }

  await BookModel.create(data);
  const allBooks = await BookModel.find();

  // Respond with success message and updated books list
  res.status(201).json({
    success: true,
    message: 'book added successfully',
    data: allBooks,
  });
}

exports.updateBook = async(req, res) => {
  const {id} = req.params;
  const {data} = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({
      success: false,
      message: "Please provide the data to update",
    })
  }

const updatedBook = await BookModel.findOneAndUpdate(
  {_id: id},
  data,
  {new: true}
);

  if(!updatedBook) {
    return res.status(404).json({
      success: false,
      message: `Book not found for id: ${id}`
    })
  }

  res.status(200).json({
    success: true,
    message: "Book updated succesfully",
    data: updatedBook
  })
}

exports.deleteBook = async (req, res) => {
  const {id} = req.params;
  // Check if book with the given ID exists
  const book = await BookModel.findById(id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: `book not found for the ID: ${id}`,
    });
  }

  await BookModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: 'book deleted successfully',
  });
}

exports.getIssuedBooksForUsers = async (req, res) => {
  const usersWithIssuedBooks = await UserModel.find({
    issuedBooks: { $exists: true},}).populate('issuedBooks')

  const allIssuedBooks = usersWithIssuedBooks.map((each) => {
    return new issuedBooks(each);
  });

  if (allIssuedBooks.length === 0) {
    return res.status(404).json({
      success: false,
      message: 'No books are currently issued',
    })
  }

  res.status(200).json({
    success: true,
    data: allIssuedBooks,
  });
};

