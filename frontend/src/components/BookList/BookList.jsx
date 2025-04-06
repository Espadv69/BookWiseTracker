import { useContext } from 'react'
import { BooksContext } from '../../context/BooksContext'

import BookCard from '../BookCard/BookCard'
import './BookList.css'

const BookList = () => {
  const { books } = useContext(BooksContext)

  if (!books || books.length === 0) {
    return <p className="book-list__empty">No books added yet.</p>
  }

  return (
    <section className="book-list">
      <header className="book-list__header">
        <h2 className="book-list__title">My Book Collection</h2>
        <p className="book-list__count">{books.length} books</p>
      </header>

      <div className="book-list__grid">
        {books.map((book) => (
          <BookCard
            key={book._id}
            _id={book._id}
            title={book.title}
            author={book.author}
            coverImage={book.coverImage}
            totalPages={book.totalPages}
            currentPage={book.currentPage}
            progress={book.progress}
            status={book.status}
          />
        ))}
      </div>
    </section>
  )
}

export default BookList
