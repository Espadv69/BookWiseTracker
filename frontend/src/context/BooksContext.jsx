import { createContext, useReducer, useEffect } from 'react'
import { BooksReducer } from './BooksReducer.js'
import { AXIOS_API_URL } from '../utils/const.js'
import { LOAD_BOOKS } from './actionTypes.js'
import axios from 'axios'

export const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
  const [books, dispatch] = useReducer(BooksReducer, [])

  // Load books from the server when the component mounts
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(AXIOS_API_URL)
        dispatch({ type: LOAD_BOOKS, payload: response.data })
      } catch (err) {
        console.error('Error fetching books:', err)
      }
    }

    fetchBooks()
  }, [])

  return (
    <BooksContext.Provider value={{ books, dispatch }}>
      {children}
    </BooksContext.Provider>
  )
}
