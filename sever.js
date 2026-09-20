const express= require('express');
const db= require('./db')
const router = express.Router();
const app= express();
const expresssession= require('express-session');
const studentrouter= require('./routes/studentroute');
const teacherroute= require('./routes/teacherroute');
const studentmodel= require('./models/student');
const eventroute= require('./routes/eventroue');
const noticeroute= require('./routes/noticeroute');
const auth= require('./auth');
const bcrypt = require("bcrypt");
const passport= require('passport');
app.use(express.json());



router.use(passport.initialize());
router.use(passport.session());// initializes passport middleware


require('dotenv').config();
app.use('/', studentrouter);
app.use('/', teacherroute);
app.use('/', eventroute);
app.use('/', noticeroute);
app.get('/',(req,res)=>{
    res.send('You are in the page')
}); 
app.listen(3000,()=>{
    console.log('Server starterd at PORT 3000')
})