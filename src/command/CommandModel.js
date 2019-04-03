const mongoose = require('mongoose');

const commandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  costData: {
    cost: {
      type: Number,
      required: true,
      default: 0,
    },
    hasCost: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  allowedRoles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  }],
  cooldown: {
    hasCooldown: {
      type: Boolean,
      required: true,
      default: true
    },
   executionPerMinute: {
     type: Number,
     required: true,
     default: 0,
   },
   cooldownInMinutes: {
      type: Number,
      required: true,
      default: 0,
   },
  },
});

module.exports = mongoose.model('Command', commandSchema);