import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index.js'

if (process.env.NODE_ENV === 'development') {
  dotenv.config()
}

const app  = express()
app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use(routes)

console.log(process.env)

const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(PORT, () => {console.log('Server running on port ' + PORT)})
  })
  .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)