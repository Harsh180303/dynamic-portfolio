import express from 'express'
import connectDB from './config/dbConfig.js'
import dotenv from 'dotenv'
import portfolioRoute from './routes/portfolioRoute.js'
import cors from "cors"

connectDB()
dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/portfolio', portfolioRoute)

app.get('/', (req, res) => {
  res.send('Hello Developer Harsh, Respect++++')
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
