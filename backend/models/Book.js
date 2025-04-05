import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, default: '' },
  coverImage: { type: String, default: '' },
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, default: 0 },
  progress: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ['reading', 'completed'],
    default: 'reading',
  },
})

// Middleware to update progress before saving
bookSchema.pre('save', function (next) {
  if (this.totalPages > 0) {
    this.progress = Math.min((this.currentPage / this.totalPages) * 100, 100)
  }
  next()
})

const BOOK_IDENTIFIER = 'Book'

const BOOK_MODEL = mongoose.model(BOOK_IDENTIFIER, bookSchema)
export default BOOK_MODEL
