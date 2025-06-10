const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  author: String,
  status: {
    type: String,
    enum: ['reading', 'completed', 'wishlist'],
    default: 'wishlist',
  },
  rating: { type: Number, min: 1, max: 5 },
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
