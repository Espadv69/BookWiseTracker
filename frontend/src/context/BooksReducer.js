import {
  LOAD_BOOKS,
  ADD_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
} from './actionTypes.js'

export const BooksReducer = (state, action) => {
  switch (action.type) {
    case LOAD_BOOKS:
      return action.payload

    case ADD_BOOK:
      return [action.payload, ...state]

    case UPDATE_BOOK:
      return state.map((book) =>
        book._id === action.payload.id
          ? { ...book, currentPage: action.payload.currentPage }
          : book,
      )

    case DELETE_BOOK:
      return state.filter((book) => book._id !== action.payload)

    default:
      return state
  }
}
