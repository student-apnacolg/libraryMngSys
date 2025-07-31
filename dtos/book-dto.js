// Data Transfer Object

class issuedBooks{
  _id;
  title;
  author;
  publishedYear;
  genre;
  issuedBy;
  issuedDate;
  returnDate;

  constructor(user) {
    this._id = user.issuedBooks._id;
    this.title = user.issuedBooks.title;
    this.author = user.issuedBooks.author;
    this.publishedYear = user.issuedBooks.publishedYear;
    this.genre = user.issuedBooks.genre;
    this.issuedBy = user.name;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
  }
}