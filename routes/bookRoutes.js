const router = require('express').Router();
const {
  getBooks,
  addBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getBooks);             // Get user's books
router.post('/', auth, addBook);             // Add new book
router.put('/:id', auth, updateBook);        // Update book
router.delete('/:id', auth, deleteBook);     // Delete book

module.exports = router;
