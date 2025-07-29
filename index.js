const express = require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Library Management System Home PAge',});
});

// app.all('*', (req, res) => {
//   res.status(404).json({
//     message: 'This route does not exist',
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});