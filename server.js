import express from 'express'
import connectDB from './config/dbConfig.js'
import dotenv from 'dotenv'
import portfolioRoute from './routes/portfolioRoute.js'
import cors from "cors"
import authRoute from './routes/authRoute.js'

connectDB()
dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://dynamic-portfolio-puce-nine.vercel.app'
]

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}))
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/portfolio', portfolioRoute)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: 'Something broke!' })
})

app.get('/', (req, res) => {
  res.send('Server is running. Welcome')
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
