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
