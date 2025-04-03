import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: 'Unknown' },
  coverImage: { type: String },
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['reading', 'completed'],
    default: 'reading',
  },
})
