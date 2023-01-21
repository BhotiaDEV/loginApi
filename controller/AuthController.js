const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const User = require('../models/UserModels');
// const db = require("../db")

router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

// db.connect( (dbConnectionError, client)=> {
//     if (dbConnectionError) {
//         throw dbConnectionError;
//     } else {
//         db = client.db('tataCliq');
//     }
// })

// get all users
router.get('/users',(req,res)=>{
    User.find({},(err,data)=>{
        if(err) throw err;
        res.send(data)
    }) 
})

// Registration
router.post('/register',(req,res)=>{
    // encrypt password
    User.find({email:req.body.email},(err,data)=>{
        if(data.length>0)
        res.send('Email already taken')
        else{
            let hashpassword = bcrypt.hashSync(req.body.password,8);
            User.create({
                name:req.body.name,
                email:req.body.email,
                phone:req.body.phone,
                password:hashpassword,
                role:req.body.role?req.body.role:"User"
            },(err,data)=>{
                if(err) throw err;
                res.send("Registration Successful")
        
            })
        }
            
    })
    
})

router.post('/login',(req,res) => {
    User.findOne({email:req.body.email},(err,user) => {
        if(err) return res.send({auth:false,token:'Error while Logging'});
        if(!user) return res.send({auth:false,token:'No User Found'});
        else{
            const passIsValid = bcrypt.compareSync(req.body.password,user.password)
            if(!passIsValid) return res.send({auth:false,token:'Invalid Password'})
            // in case both valid
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400})//24 hr
            res.send({auth:true,token:token})
        }
    })
})

// login user
//  router.post('/login',(req,res)=>{
//     User.findOne({email:req.body.email},(err,user)=>{
//         if(err) return res.send({auth:false, token:"Error while logging"})
//         if(!user) return res.send({auth:false,token:"No User Found!"})
//         else{
//             let passisvalid = bcrypt.compareSync(req.body.password,user.password)
//             if(!passisvalid) return res.send({auth:false,token:"Wrong password!"})
            
//             let token = jwt.sync({id:user._id},config.secret,{expiresIn:84600}) //24hrs
//             res.send({auth:true,token:token})
//         }
//     })
//  })

//  user info 
router.post('/userInfo',(req,res)=>{
    let token = req.headers['x-access-token'];
    if(!token) return res.send({auth:false,token:'No Token Provided!'});

    jwt.verify(token,config.secret,(err,user=>{
        if(err) return res.send({auth:false,token:'Invalid Token'})
        User.findById(user.id,(err,result)=>{
            res.send(result) 
        })
    }))
})


module.exports = router;