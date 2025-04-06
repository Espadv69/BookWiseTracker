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

  const progressMath = totalPages > 0 ? (currentPage / totalPages) * 100 : 0

  // Function to handle deleting a book
  const handleDelete = async () => {
    try {
      await axios.delete(`${AXIOS_API_URL}/${_id}`)
      dispatch({ type: 'DELETE_BOOK', payload: _id })
    } catch (err) {
      console.error('Error deleting book:', err.message)
    }
  }

  // Function to handle Status
  const handleToggleStatus = async () => {
    // Provisional confirmation
    const confirm = window.confirm(
      `Are you sure you want to change the status of "${title}"?`,
    )
    if (!confirm) return

    const newStatus = status === 'reading' ? 'completed' : 'reading'
    const updatedFields =
      newStatus === 'completed'
        ? {
            status: newStatus,
            currentPage: totalPages,
            progress: 100,
          }
        : {
            status: newStatus,
            currentPage: 0,
            progress: 0,
          }

    try {
      const response = await axios.put(`${AXIOS_API_URL}/${_id}`, updatedFields)
      dispatch({ type: 'UPDATE_BOOK', payload: response.data })

      if (response.data.currentPage !== undefined) {
        setNewPage(response.data.currentPage)
      }
    } catch (err) {
      console.error('Error updating book status:', err.message)
    }
  }

  // Function to handle updating the current page
  const handlePageUpdate = async () => {
    const safePage = Math.min(newPage, totalPages)

    if (safePage < 0) {
      console.error('Page number cannot be negative')
      return
    }

    try {
      const response = await axios.put(`${AXIOS_API_URL}/${_id}`, {
        currentPage: safePage,
      })
      dispatch({ type: 'UPDATE_BOOK', payload: response.data })
      setNewPage(response.data.currentPage)
    } catch (err) {
      console.error('Error updating book:', err.message)
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

        <div className="book-card__update">
          <input
            type="number"
            value={newPage}
            min={0}
            max={totalPages}
            onChange={(e) => setNewPage(Number(e.target.value))}
            className="book-card__input"
          />
          <button
            onClick={handlePageUpdate}
            className="book-card__btn"
            disabled={newPage === currentPage || newPage < 0}
          >
            Update Page
          </button>
        </div>
      </main>

      <footer className="book-card__footer">
        <p className={`book-card__status ${status}`}>
          {status === 'completed' ? 'Completed' : 'Reading'}
        </p>

        <div className="book-card__actions">
          <button className="book-card__btn" onClick={handleToggleStatus}>
            Toggle Status
          </button>
          <button className="book-card__btn delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </footer>
    </section>
  )
}

export default BookCard
