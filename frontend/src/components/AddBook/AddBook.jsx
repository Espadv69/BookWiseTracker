import { useState, useContext } from 'react'
import axios from 'axios'
import { BooksContext } from '../../context/BooksContext'
import { ADD_BOOK } from '../../context/actionTypes.js'
import { AXIOS_API_URL } from '../../utils/const.js'

import './AddBook.css'

const AddBook = () => {
  // Context
  const { dispatch } = useContext(BooksContext)

  // State to manage form data
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    coverImage: '',
    totalPages: '',
    currentPage: '',
  })

  // State to manage form submission status
  const handleChange = (e) => {
    const { name, value } = e.target
    console.log(`Input changed: ${name} = ${value}`)
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    console.log('Datos antes de enviar:', formData) // DEBUG

    const totalPages = parseInt(formData.totalPages || '0', 10)
    const currentPage = parseInt(formData.currentPage || '0', 10)
    const progress =
      totalPages > 0
        ? Math.min((currentPage / totalPages) * 100, 100).toFixed(2)
        : '0.00'
    const status = progress === '100.00' ? 'completed' : 'reading'

    const newBook = {
      title: formData.title,
      author: formData.author || 'Unknown',
      coverImage: formData.coverImage || 'No cover image',
      totalPages,
      currentPage,
      progress,
      status,
    }

    console.log('Libro a guardar:', newBook) // DEBUG

    try {
      const response = await axios.post(AXIOS_API_URL, newBook)
      dispatch({ type: ADD_BOOK, payload: response.data })

      // Limpiar formulario
      setFormData({
        title: '',
        author: '',
        coverImage: '',
        totalPages: '',
        currentPage: '',
      })
    } catch (err) {
      console.error('Error adding book:', err.message)
    }
  }

  return (
    <section className="add-book__container">
      <header className="add-book__header">
        <h2 className="add-book__header--title">Add a New Book</h2>
      </header>

      <form className="add-book__form" onSubmit={handleSubmit}>
        <label className="add-book__form--label">
          Title
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="add-book__form--input"
            placeholder="Enter book title"
          />
        </label>

        <label className="add-book__form--label">
          Author
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="add-book__form--input"
            placeholder="Enter author"
          />
        </label>

        <label className="add-book__form--label">
          Cover Image URL
          <input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="add-book__form--input"
            placeholder="Enter cover image URL"
          />
        </label>

        <label className="add-book__form--label">
          Total Pages
          <input
            type="text"
            name="totalPages"
            value={formData.totalPages}
            onChange={handleChange}
            className="add-book__form--input"
            placeholder="Enter total pages"
          />
        </label>

        <label className="add-book__form--label">
          Current Page
          <input
            type="text"
            name="currentPage"
            value={formData.currentPage}
            onChange={handleChange}
            className="add-book__form--input"
            placeholder="Enter current page"
          />
        </label>

        <button className="add-book__form--button">Add Book</button>
      </form>
    </section>
  )
}

export default AddBook
