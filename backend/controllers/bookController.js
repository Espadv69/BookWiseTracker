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
  } catch (err) {}
}
