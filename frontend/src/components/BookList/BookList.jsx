import BookCard from '../BookCard/BookCard'
import './BookList.css'

const BookList = ({ books }) => {
  if (!books.length) {
    return <p className="book-list__empty">No books added yet.</p>
  }

  return (
    <section className="book-list">
      {books.map((book) => (
        <BookCard
          key={book._id}
          title={book.title}
          author={book.author}
          coverImage={book.coverImage}
          totalPages={book.totalPages}
          currentPage={book.currentPage}
          progress={book.progress}
          status={book.status}
        />
      ))}
    </section>
  )
}

export default BookList
