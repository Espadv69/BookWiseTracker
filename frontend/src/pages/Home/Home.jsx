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

  const latestBooks = [...books].slice(-3).reverse()

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
    </div>
  )
}

export default Home
