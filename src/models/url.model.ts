import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: false,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  lastAccessed: {
    type: Date,
  },
  visitInfo: [{
    timestamp: { type: Number }
  }]
}, { timestamps: true });

const URL = mongoose.models.URL || mongoose.model('URL', urlSchema);

export default URL;
