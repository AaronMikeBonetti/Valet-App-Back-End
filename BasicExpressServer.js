//To run this file :::: node BasicExpressServer

// Import and Init express
const express = require('express')


const app = express()

//Set endpoint/routes
app.get('/', (req,res)=>{
    res.status(200).send('hello world')
})


//listen on port
app.listen(5000,console.log("server is live..."))
