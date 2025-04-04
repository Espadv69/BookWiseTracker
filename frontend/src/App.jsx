import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const App = () => {
  return (
    <Router>
      {/* ToDo: Add NavBar */}
      <Routes>
        <Route path="/" element />
        <Route path="/add" element />
        <Route path="/details" element />
        <Route path="*" element />
      </Routes>
    </Router>
  )
}

export default App
