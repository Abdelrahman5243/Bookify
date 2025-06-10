const Book = require('../models/Book');

// 🟢 Get all books for current user
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Add a new book
exports.addBook = async (req, res) => {
  const { title, author, status, rating, notes } = req.body;
  try {
    const newBook = new Book({
      user: req.user.id,
      title,
      author,
      status,
      rating,
      notes,
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Update book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    Object.assign(book, req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 Delete book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
