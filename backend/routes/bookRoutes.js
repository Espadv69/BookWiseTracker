import express from 'express'
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/bookController.js'
import { BOOKS_ROUTE, BOOKS_ID_ROUTE } from '../utils/const.js'

const router = express.Router()

// Route to get all books
router.get(BOOKS_ROUTE, getBooks)

// Route to create a new book
router.post(BOOKS_ROUTE, createBook)

// Route to update a book by ID
router.put(BOOKS_ID_ROUTE, updateBook)

// Route to delete a book by ID
router.delete(BOOKS_ID_ROUTE, deleteBook)

export default router
