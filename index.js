const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Importing routes for users and books
// This allows us to separate concerns and keep the code organized
const userRoutes = require('./routes/users.js');
const bookRoutes = require('./routes/books.js');


// Home Page route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Library Management System Home PAge',
  });
});

// Using the imported routes for users and books
app.use("/users", userRoutes);
app.use('/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});