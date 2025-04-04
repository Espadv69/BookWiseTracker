import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="nav">
      <h3>BookWise</h3>

      <div className="links">
        <Link to="/" className="nav__link">
          Home
        </Link>
        <Link to="/add" className="nav__link">
          Add Book
        </Link>
        <Link to="/details" className="nav__link">
          Book Details
        </Link>
      </div>
    </nav>
  )
}

export default NavBar
