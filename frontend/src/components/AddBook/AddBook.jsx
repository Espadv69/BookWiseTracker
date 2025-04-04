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
}

export default AddBook
