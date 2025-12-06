const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Tutorial','Entertainment','Documentary','Music','Sports'], default: 'Tutorial' },
  duration: Number,
  thumbnailUrl: String,
  videoUrl: String,
  uploadDate: Date,
  tags: [String],
  resolution: String,
  fileSize: Number,
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Video', videoSchema);
