//Middleware has access to the response and request object and get do things in the middle of other functions happening
//for example when you request a page it will go request the page and then hit the middleware then display the page
//This middleware gets the url thats being hit and tells you the time it was hit
//Middleware needs the argument next so it can move on to the rest of the stack

const moment = require('moment')

const logger = (req,res,next)=>{
    console.log(`Logger Middleware: ${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`)
    next()
}

module.exports = logger