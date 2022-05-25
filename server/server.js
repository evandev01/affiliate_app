const express = require('express')
const path = require('path')
const { errorHandler } = require('./middleware/errorMiddleware')
const routes = require('./routes')
const connectDB = require('./config/db')
const cors = require('cors')
const colors = require('colors')

require('dotenv').config()

const app = express()

app.use(express.json())

app.use(cors())

connectDB()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API is running...')
  })
}

app.use(routes)

const PORT = process.env.PORT || 5000

app.use(errorHandler)

app.listen(
  PORT,
  console.log(
    `Server running in `.america +
      `${process.env.NODE_ENV} mode on port `.red.bold +
      `${PORT}`.white.bgCyan
  )
)
