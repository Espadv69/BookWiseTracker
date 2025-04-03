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
    // Destructure book data from the request body
    const { title, totalPages } = req.body

    // Validate required fields
    if (!title || !totalPages) {
      return res
        .status(400)
        .json({ message: 'Title and total pages are required' })
    }

    // Create a new book instance
    const newBook = new BOOK_MODEL({
      title,
      totalPages,
    })

    const savedBook = await newBook.save()

    // Send the saved book as JSON response
    res.status(201).json(savedBook)
  } catch (err) {
    res.status(500).json({ message: 'Error creating book', error: err.message })
  }
}

// Update a book by ID 📖
export const updateBook = async (req, res) => {
  try {
    const { id } = req.params
    const { title, author, coverImage, totalPages, currentPage, status } =
      req.body

    // Validate if the book exists 👮
    const book = await BOOK_MODEL.findById(id)

    if (!book) {
      return res.status(404).json({ message: 'Book not found' })
    }

    // Validate required fields
    if (!title || !totalPages) {
      return res
        .status(400)
        .json({ message: 'Title and total pages are required' })
    }

    // Update book details with the provided data
    const updatedBook = await BOOK_MODEL.findByIdAndUpdate(
      id,
      {
        title,
        author,
        coverImage,
        totalPages,
        currentPage,
        status,
      },
      { new: true, runValidators: true },
    )

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
  } catch (err) {}
}
