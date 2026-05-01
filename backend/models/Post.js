const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [200, 'Title cannot be more than 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add some content'],
    trim: true
  },
  author: {
    type: String,
    default: 'Anonymous',
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  coverImage: {
    type: String,
    default: ''
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create excerpt virtual field
PostSchema.virtual('excerpt').get(function() {
  if (!this.content) return '';
  return this.content.substring(0, 150) + (this.content.length > 150 ? '...' : '');
});

// Create readTime virtual field
PostSchema.virtual('readTime').get(function() {
  if (!this.content) return 1;
  const wordCount = this.content.split(' ').length;
  return Math.ceil(wordCount / 200);
});

module.exports = mongoose.model('Post', PostSchema);