import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import AddBookPage from './pages/AddBookPage'
import BookDetailsPage from './pages/BookDetailsPage'
import NotFound from './pages/NotFound/NotFound'

const App = () => {
  return (
    <Router>
      {/* ToDo: Add NavBar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddBookPage />} />
        <Route path="/details" element={<BookDetailsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
