const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    unique: true,
    sparse: true, // Allows null for PIN users
    trim: true,
    lowercase: true
  },
  pin: {
    type: String,
    select: false // Don't include in queries by default
  },
  authMethod: {
    type: String,
    enum: ['google', 'pin'],
    required: true
  },
  role: {
    type: String,
    enum: ['fan', 'player', 'coach', 'official', 'admin'],
    default: 'fan'
  },
  googleId: String,
  profilePhoto: String,
  favorites: {
    teams: [{ type: String }],
    players: [{ type: String }]
  },
  predictions: [{
    match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
    homeScore: Number,
    awayScore: Number,
    points: { type: Number, default: 0 }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date
}, {
  timestamps: true
});

// Hash PIN before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('pin') || !this.pin) return next();
  this.pin = await bcrypt.hash(this.pin, 12);
  next();
});

// Compare PIN method
userSchema.methods.comparePin = async function(candidatePin) {
  return await bcrypt.compare(candidatePin, this.pin);
};

module.exports = mongoose.model('User', userSchema);
            
