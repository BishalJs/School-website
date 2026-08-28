const express= require('express');
const db= require('./db')
const app= express();
const router= require('./routes/studentroute')
require('dotenv').config();
const PORT= process.env.PORT ||3000;
app.listen(PORT,()=>{
    console.log("Your server started at port 3000  ")
})