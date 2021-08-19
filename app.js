import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import routes from './routes/index.js'

const app  = express()

app.use(express.json({limit: '30mb', extended: true}))
app.use(express.urlencoded({limit: '30mb', extended: true}))
app.use(cors())

app.use(routes)

const CONNECTION_URL = 'mongodb+srv://amgeraldo14:Y9QT61rcLIVXh03C@cluster0.fnwtc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    app.listen(PORT, () => {console.log('Server running on port ' + PORT)})
  })
  .catch((err) => console.log(err.message))

mongoose.set('useFindAndModify', false)