import BOOK_MODEL from '../models/Book.js'

// Get all books 📚
export const getBooks = async (req, res) => {
  try {
    // Fetch all books from the database
    const books = await BOOK_MODEL.find()

    // Send books as JSON response
    res.status(200).json(books)
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Error fetching books', error: err.message })
  }
}

// Create a new book 📖
export const createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      coverImage,
      totalPages,
      currentPage,
      progress,
      status,
    } = req.body

    if (!title || !totalPages) {
      return res
        .status(400)
        .json({ message: 'Title and total pages are required' })
    }

    const newBook = new BOOK_MODEL({
      title,
      author,
      coverImage,
      totalPages: Number(totalPages),
      currentPage: Number(currentPage),
      progress: Number(progress),
      status,
    })

    const savedBook = await newBook.save()
    res.status(201).json(savedBook)
  } catch (err) {
    res.status(500).json({ message: 'Error creating book', error: err.message })
  }
}

// Update a book by ID 📖
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params
    let updateData = req.body

    const book = await BOOK_MODEL.findById(id)
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    if ('title' in updateData && !updateData.title) {
      return res.status(400).json({ message: 'Title cannot be empty' })
    }
    if ('totalPages' in updateData && !updateData.totalPages) {
      return res.status(400).json({ message: 'Total pages cannot be empty' })
    }

    const currentPage =
      updateData.currentPage !== undefined
        ? updateData.currentPage
        : book.currentPage
    const totalPages =
      updateData.totalPages !== undefined
        ? updateData.totalPages
        : book.totalPages

    if ('currentPage' in updateData || 'totalPages' in updateData) {
      const progress = Math.min((currentPage / totalPages) * 100, 100)
      updateData = {
        ...updateData,
        currentPage,
        totalPages,
        progress: Math.max(0, progress),
      }
    }

    const updatedBook = await BOOK_MODEL.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })

    res.status(200).json(updatedBook)
  } catch (err) {
    res.status(500).json({ message: 'Error updating book', error: err.message })
  }
}

// Delete a book by ID 📖
export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params

    // Search for the book by ID
    const book = await BOOK_MODEL.findByIdAndDelete(id)

    // Check if the book exists
    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    res.status(200).json({ message: 'Book deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting book', error: err.message })
  }
}
