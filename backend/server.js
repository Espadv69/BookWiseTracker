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
