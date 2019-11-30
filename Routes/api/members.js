
const express = require('express')
const router = express.Router()
const members = require('../../public/MembersList')
const uuid = require('uuid')


router.get('/', (req,res)=>{
    res.json(members)
})


router.get('/:id', (req,res)=>{
    
    let found = members.some(member=>{
       return member.id === parseInt(req.params.id)
    })
   
    if(found){
        res.json(members.filter(member=>{
            return member.id === parseInt(req.params.id)
        }))
    }
    else{
        res.status(400).json({msg: `no member found with id = ${req.params.id}`})
    }    
})

//add a member 

router.post('/',(req,res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if(!newMember.name || !newMember.email){
       return res.status(400).json({msg: "please include a name and email"})
    }
    members.push(newMember)
    res.status(200).json(members)
})

//update member 

router.put('/:id', (req,res)=>{
    //Checks to see if the member id exists
    let found = members.some(member=>{
       return member.id === parseInt(req.params.id)
    })

    //if member id found, continue 
    if(found){
        const updatedMember = req.body
        //cycle through members and find the member that matches the member in the request body
        members.forEach(member=>{
            // check each member in the listenerCount, if the member and body id match act accordingly
            if(member.id===parseInt(req.params.id)){
                //if name is provided change it, else leave it the way it was
            member.name = updatedMember.name ? updatedMember.name : member.name
                //if email is provided change it, else leave it the way it was
            member.email = updatedMember.email ? updatedMember.email : member.email
            }
        })
        res.json({msg: `member has been updated`})
        console.log(members)
    }
    // if found is false send error
    else{
        res.status(400).json({msg: `no member found with id = ${req.params.id}`})
    }  
})

router.delete('/:id',(req,res)=>{
    let deletedMember = members.find(member=>{
        return parseInt(req.params.id) === member.id
    })
    if(deletedMember){
        members.forEach(member=>{
            if(deletedMember.id !== member.id){
                return
            }
            else{
                members.splice(members.indexOf(member),1)
            }
        })
        res.status(200).send(members)
    }
    else{
        res.status(400).json({msg:'member does not exist'})
    }
    
})


module.exports = router


