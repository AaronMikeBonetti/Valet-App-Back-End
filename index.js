//Dependencies
const express = require('express')
const path = require('path')

//Middleware

const logger = require('./Middleware/logger')

const app = express()
const PORT = process.env.PORT ||5000

//Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended : false}))

app.use(logger)

//::::::::Set a Static folder:::::::::
//This allows for any route to point to a file in that folder
//Example: public -> about.html === localhost:5000/about.html
app.use(express.static(path.join(__dirname, 'public')))

//Using express Router allows us to specify the parent route and import the different routes
app.use('/api/users', require('./Routes/api/users'))

app.listen(PORT,console.log(`server is live on ${PORT}...`))


