import { useContext, useState } from 'react'
import { BooksContext } from '../../context/BooksContext'
import { AXIOS_API_URL } from '../../utils/const'
import axios from 'axios'

import ProgressBar from '../ProgressBar/ProgressBar'
import './BookCard.css'

const BookCard = ({
  _id,
  title,
  author,
  coverImage,
  totalPages,
  currentPage,
  status,
}) => {
  const { dispatch } = useContext(BooksContext)
  const [newPage, setNewPage] = useState(currentPage)

  const progressMath =
    totalPages > 0 ? Math.floor((currentPage / totalPages) * 100) : 0

  // Function to handle deleting a book
  const handleDelete = async () => {
    try {
      await axios.delete(`${AXIOS_API_URL}/${_id}`)
      dispatch({ type: 'DELETE_BOOK', payload: _id })
    } catch (err) {
      console.error('Error deleting book:', err)
    }
  }

  return (
    <section className="book-card">
      <header className="book-card__header">
        {coverImage && (
          <img
            src={coverImage}
            alt={`${title} cover`}
            className="book-card__coverImage"
          />
        )}
      </header>

      <main className="book-card__info">
        <h3 className="book-card__title">{title}</h3>
        <p className="book-card__author">
          {author ? `By ${author}` : 'Unknown Author'}
        </p>

        <div className="book-card__progress">
          <ProgressBar progress={progressMath} />
          <p className="book-card__pages">
            {currentPage} of {totalPages} pages
          </p>
        </div>
      </main>

      <footer className="book-card__footer">
        <p
          className={`book-card__status ${
            status === 'completed' ? 'completed' : 'reading'
          }`}
        >
          {status === 'completed' ? 'Completed' : 'Reading'}
        </p>
      </footer>
    </section>
  )
}

export default BookCard
