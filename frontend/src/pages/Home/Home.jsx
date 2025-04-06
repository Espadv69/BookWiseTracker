import { useContext } from 'react'
import { BooksContext } from '../../context/BooksContext'

import BookCard from '../../components/BookCard/BookCard'
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
}

export default Home
