const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  home: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  away: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  venue: String,
  status: {
    type: String,
    enum: ['upcoming', 'live', 'finished', 'postponed', 'cancelled'],
    default: 'upcoming'
  },
  time: {
    type: String,
    default: '19:00'
  },
  homeScore: {
    type: Number,
    default: 0,
    min: 0
  },
  awayScore: {
    type: Number,
    default: 0,
    min: 0
  },
  events: [{
    time: String,
    type: {
      type: String,
      enum: ['goal', 'yellow', 'red', 'substitution', 'injury']
    },
    player: String,
    team: String,
    description: String
  }],
  stats: {
    possession: { home: Number, away: Number },
    shots: { home: Number, away: Number },
    shotsOnTarget: { home: Number, away: Number },
    corners: { home: Number, away: Number }
  },
  motm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  referee: String,
  attendance: Number,
  isPublished: { type: Boolean, default: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('Match', matchSchema);
            
