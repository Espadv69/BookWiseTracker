import { HOME_ROUTE, API_ROUTE } from './utils/const.js'
import router from './routes/bookRoutes.js'

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

// Dotenv configuration
// Load environment variables from .env file
dotenv.config()

// Express app configuration
const app = express()

// Middleware configuration
app.use(cors())
app.use(express.json())

// Routes configuration
app.use(API_ROUTE, router)

// MongoDB connection 🦋
const MONGO_URI = process.env.MONGO_URI

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('MongoDB connected successfully 🦋')
  } catch (err) {
    console.error('MongoDB connection failed ❌', err.message)
    process.exit(1)
  }
}

// Home route
app.get(HOME_ROUTE, (req, res) => {
  res.send('Welcome to the Book API! 📚')
})

// Start server 🚀
const startServer = async () => {
  // Connect to MongoDB
  await connectDB()

  // Define Port
  const PORT = process.env.PORT || 5000

  // Server listening
  const server = app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT} 🚀`),
  )

  // Clean up on exit 🧼
  const cleanUp = async () => {
    console.log('Cleaning up... 🧼')

    try {
      await mongoose.connection.close()
      console.log('MongoDB connection closed 🟢')
    } catch (err) {
      console.error('Error closing MongoDB connection 🔴', err.message)
    }

    server.close(() => {
      console.log('Server closed 🟢')
      process.exit(0)
    })
  }

  // Handle termination signals
  process.on('SIGINT', cleanUp)
  process.on('SIGTERM', cleanUp)
}

// Call startServer function to start the server
startServer()
