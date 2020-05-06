const express = require('express')
const bodyParser = require('body-parser') // middleware transforma o corpo do HTTP em objeto

const userRoute = require('./routes/userRoute')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false })) // middleware

userRoute(app)

app.get('/', (req, res) => res.send('Hello world pelo Express!'))

app.listen(port, () => console.log('API executando na porta 3000'))