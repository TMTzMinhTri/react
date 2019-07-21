const express = require('express')
const connectDB = require('./config/db')()
var cookieParser = require('cookie-parser')
const app = express()
var cors = require('cors')

app.use(cors())
connectDB

//init middleware
app.use(express.json({ extended: true}))
app.use(cookieParser("sadasdasdsd"))

app.get('/', (req, res) => res.send('Hello World!'))


//define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))