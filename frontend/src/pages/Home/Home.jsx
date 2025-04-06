import { useContext } from 'react'
import { BooksContext } from '../../context/BooksContext'

import './Home.css'

const Home = () => {
  const { books } = useContext(BooksContext)

  const totalBooks = books.length

  const completedBooks = books.filter(
    (book) => book.status === 'completed',
  ).length

  const readingBooks = totalBooks - completedBooks

  const overallProgress =
    totalBooks > 0
      ? (
          books.reduce((acc, book) => acc + book.progress, 0) / totalBooks
        ).toFixed(2)
      : 0

  return (
    <div className="home">
      <section className="home__welcome">
        <h1>Welcome to Your Library 📖</h1>
        <p>Track your reading, manage your books, and reach your goals!</p>
      </section>

      <section className="home__stats">
        <h2>Your Reading Stats</h2>
        <div className="home__stats__cards">
          <div className="home__stats__card">
            <h3>Total Books</h3>
            <p>{totalBooks}</p>
          </div>
          <div className="home__stats__card">
            <h3>Reading</h3>
            <p>{readingBooks}</p>
          </div>
          <div className="home__stats__card">
            <h3>Completed</h3>
            <p>{completedBooks}</p>
          </div>
          <div className="home__stats__card">
            <h3>Overall Progress</h3>
            <p>{overallProgress}%</p>
          </div>
        </div>
      </section>

      <section className="home__books">
        <h2>Your Books</h2>
        {books.length > 0 ? (
          <ul className="home__books__list">
            {books.map((book) => (
              <li key={book.id} className="home__books__item">
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>Status: {book.status}</p>
                <p>Progress: {(book.progress).toFixed(2)}%</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books found. Start adding some!</p>
        )}
      </section>
    </div>
  )
}

export default Home
