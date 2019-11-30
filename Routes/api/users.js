
const express = require('express')
const router = express.Router()
const users = require('../../public/UsersList')
const uuid = require('uuid')

router.get('/', (req,res)=>{
    res.json(users)
})

router.get('/:id', (req,res)=>{
    
    let found = users.some(user=>{
       return user.id === parseInt(req.params.id)
    })
   
    if(found){
        res.json(users.filter(user=>{
            return user.id === parseInt(req.params.id)
        }))
    }
    else{
        res.status(400).json({msg: `no user found with id = ${req.params.id}`})
    }    
})

//add a user 

router.post('/',(req,res)=>{
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        password: req.body.password,
        location: req.body.location,
        hotel: req.body.hotel,
        admin: req.body.admin,

    }

    if(!newUser.name || !newUser.password || !newUser.location || !newUser.hotel || !newUser.admin){
       return res.status(400).json({msg: 'please fill out all information'})
    }
    users.push(newUser)
    res.status(200).json(users)
})

//update user 

router.put('/:id', (req,res)=>{
   
    let found = users.some(user=>{
       return user.id === parseInt(req.params.id)

    })

    
    if(found){
        const updatedUser = req.body
        
        users.forEach(user=>{
            
            if(user.id===parseInt(req.params.id)){
            
            user.name = updatedUser.name ? updatedUser.name : user.name
            
            user.password = updatedUser.password ? updatedUser.password : user.password
            
            user.location = updatedUser.location ? updatedUser.location : user.location
            
            user.hotel = updatedUser.hotel ? updatedUser.hotel : user.hotel
            
            user.admin = updatedUser.admin ? updatedUser.admin : user.admin

            }
        })
        res.json({msg: `User has been updated`})
        console.log(users)
    }
    
    else{
        res.status(400).json({msg: `No user found with id = ${req.params.id}`})
    }  
})

router.delete('/:id',(req,res)=>{
    let deletedUser = users.find(user=>{
        return parseInt(req.params.id) === user.id
    })
    if(deletedUser){
        users.forEach(user=>{
            if(deletedUser.id !== user.id){
                return
            }
            else{
                users.splice(users.indexOf(user),1)
            }
        })
        res.status(200).send(users)
    }
    else{
        res.status(400).json({msg:'User does not exist'})
    }
    
})


module.exports = router


