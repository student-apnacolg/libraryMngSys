const mongoose = require('mongoose');

const schema = mongoose.Schema;

const bookSchema = new schema ({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
}, {timestamps: true,})

module.exports = mongoose.model('Book', bookSchema);