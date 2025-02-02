const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')

const EmployeeRoute = require('./routes/EmployeeRoutes')
const AuthRoute = require('./routes/AuthRoutes')

// URL de connexion MongoDB
mongoose.connect('mongodb://localhost:27017/testdb', {useNewUrlParser: true,
useUnifiedTopology: true,})
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log('Connexion à la base de données établie!')
})

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> {
    console.log(`server is running on port ${PORT}`)
})

app.use('/api/employeeRoutes', EmployeeRoute)
app.use('/api', AuthRoute)