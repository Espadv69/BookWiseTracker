import BOOK_MODEL from '../models/Book.js'

// Get all books 📚
const getBooks = async (req, res) => {
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
