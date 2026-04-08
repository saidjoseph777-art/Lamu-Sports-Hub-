const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  image: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['match', 'transfer', 'injury', 'general'],
    default: 'general'
  },
  tags: [String],
  reactions: {
    likes: { type: Number, default: 0 },
    fire: { type: Number, default: 0 },
    celebrate: { type: Number, default: 0 }
  },
  isPublished: { type: Boolean, default: true },
  publishedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('News', newsSchema);
