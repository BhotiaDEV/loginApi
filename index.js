const express = require ('express');
const app = express();
const cors = require("cors");
const db = require('./db');
const port = 5000;
app.use(cors())

const AuthController = require('./controller/AuthController');
app.use('/api/auth',AuthController)

app.get("/",(req,res)=>{
    res.send('hello')    
})

app.listen(port,()=>[ 
    console.log("listening on port 5000")
])