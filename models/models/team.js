const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  abbr: {
    type: String,
    required: true,
    uppercase: true,
    maxlength: 4
  },
  logo: String,
  colors: {
    primary: String,
    secondary: String
  },
  stats: {
    played: { type: Number, default: 0 },
    won: { type: Number, default: 0 },
    drawn: { type: Number, default: 0 },
    lost: { type: Number, default: 0 },
    gf: { type: Number, default: 0 },
    ga: { type: Number, default: 0 },
    points: { type: Number, default: 0 }
  },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  coach: String,
  founded: Number,
  venue: String,
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

// Calculate points automatically
teamSchema.pre('save', function(next) {
  this.stats.points = (this.stats.won * 3) + (this.stats.drawn);
  next();
});

module.exports = mongoose.model('Team', teamSchema);
