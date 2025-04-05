import ProgressBar from '../ProgressBar/ProgressBar'
import './BookCard.css'

const BookCard = ({
  title,
  author,
  coverImage,
  totalPages,
  currentPage,
  progress,
  status,
}) => {
  const progress =
    totalPages > 0 ? Math.floor((currentPage / totalPages) * 100) : 0

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
          {author ? author : 'Unknown Author'}
        </p>

        <div className="book-card__progress">
          <ProgressBar progress={progress} />
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
