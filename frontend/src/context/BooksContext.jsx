import axios from 'axios'

import { createContext, useReducer, useEffect } from 'react'
import { BooksReducer } from './BooksReducer.js'
import { AXIOS_API_URL } from '../utils/const.js'
import {
  LOAD_BOOKS,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
} from './actionTypes.js'

export const BooksContext = createContext()

export const BooksProvider = ({ children }) => {
  const [books, dispatch] = useReducer(BooksReducer, [])

  // Load books from the server when the component mounts
  useEffect(() => {}, [])
}
