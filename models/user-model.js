const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  registeredDate: {
    type: Date,
    default: Date.now,
  },
  issuedBooks: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Book',
  },
  issuedDate: {
    type: String,
    required: false,
  },
  returnDate: {
    type: String,
    required: false,
  },
  subscriptionType: {
    type: String,
    required: true,
  },
  subscriptionDate: {
    type: String,
    required: true,
  },
}, {timestamps: true,})

module.exports = mongoose.model('User', userSchema);