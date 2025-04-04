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
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // Function to handle form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault()

    // Convert form data to the correct types
    const totalPages = parseInt(formData.totalPages)
    const currentPage = parseInt(formData.currentPage)
    const progress = Math.min((currentPage / totalPages) * 100, 100).toFixed(2)
    const status = progress === '100.00' ? 'Completed' : 'Reading'

    // Create a new book object
    const newBook = {
      title: formData.title,
      author: formData.author || 'Unknown',
      coverImage: formData.coverImage || 'No cover image',
      totalPages,
      currentPage,
      progress,
      status,
    }

    try {
      // Send a POST request to add the new book to the database
      const response = await axios.post(AXIOS_API_URL, newBook)
      // Dispatch the ADD_BOOK action to update the global state
      dispatch({ type: ADD_BOOK, payload: response.data })

      // Clear the form data after submission
      setFormData({
        title: '',
        author: '',
        coverImage: '',
        totalPages: '',
        currentPage: '',
      })
    } catch (err) {}
  }
}

export default AddBook
