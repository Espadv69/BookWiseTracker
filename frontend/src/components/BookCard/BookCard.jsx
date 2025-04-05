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
}

export default BookCard
