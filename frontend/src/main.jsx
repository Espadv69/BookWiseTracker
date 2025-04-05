// Supports weights 100-900
import '@fontsource-variable/inter'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BooksProvider } from './context/BooksContext.jsx'

import App from './App.jsx'
import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <BooksProvider>
      <App />
    </BooksProvider>
  </StrictMode>,
)
