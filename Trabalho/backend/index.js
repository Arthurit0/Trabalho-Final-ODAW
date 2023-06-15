const express = require('express')
const cors = require('cors')

const app = express()

app.use(express)

app.use(cors({ credentials: true, origin: 'http://localhost:9000' }))

app.use(express.static('public'))

const UserRoutes = require('./routes/UserRoutes')

app.use('/users', UserRoutes)


app.listen(5000)