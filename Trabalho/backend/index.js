const express = require('express')
const cors = require('cors')

const app = express()

// Receber resposta em JSON
app.use(express.json())
// Configurar CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
// Pasta de dados publicos
app.use(express.static('public'))

const UserRoutes = require('./routes/UserRoutes')

app.use('/users', UserRoutes)

app.listen(5000)