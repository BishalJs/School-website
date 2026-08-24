const express= require('express');
const db= require('./db')
const app= express();
require('dotenv').config();
const PORT= process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log("Your server started at port 3000  ")
})