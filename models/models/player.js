const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  position: {
    type: String,
    enum: ['GK', 'DEF', 'MID', 'FWD'],
    required: true
  },
  number: Number,
  nationality: String,
  age: Number,
  photo: String,
  stats: {
    appearances: { type: Number, default: 0 },
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },
    rating: { type: Number, default: 0, min: 0, max: 10 }
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Player', playerSchema);
