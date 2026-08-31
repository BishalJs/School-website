const express= require('express');
const db= require('./db')
const app= express();
const studentrouter= require('./routes/studentroute');
const teacherroute= require('./routes/teacherroute');
const studentmodel= require('./models/student');
require('dotenv').config();
app.use(express.json());
app.use('/', studentrouter);
app.use('/', teacherroute);
const mongoose= require('mongoose')
const Logreq= (req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}]`);
    next();
};
app.use(Logreq);

app.get('/',(req,res)=>{
    res.send('You are in the page')
});
app.listen(3000,()=>{
    console.log('Server starterd at PORT 3000')
})