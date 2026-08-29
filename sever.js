const express= require('express');
const db= require('./db')
const app= express();
const router= require('./routes/studentroute');
const studentmodel= require('./models/student');
require('dotenv').config();
app.use(express.json());
app.use('/', router);
const mongoose= require('mongoose')

app.get('/',(req,res)=>{
    res.send('You are in the page')
});
app.listen(3000,()=>{
    console.log('Server starterd at PORT 3000')
})