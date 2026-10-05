
const express = require('express');
const router= express.Router();
const teacher = require('../models/teacher');
const app= express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((async (username, password, done) => {
    try{
        // finds user by username
        const Teacher = await teacher.findOne({username});
        // if user not found, return error
        if(!Teacher){
            return done(null,false,{message:'Incorrect username'});
        };
        // check if password is correct
        const isMatch= await bcrypt.compare(password,Teacher.password);
        if(!isMatch){
            return done(null,false,{message:'Incorrect password'});
        };
        return done(null,Teacher);
    }
    catch(err){
        return done(err);
    }

})));
passport.initialize();
const islogin= (req,res,next)=>{
    if(!req.session.userId){
        return res.status(401).json({message:"You must be login"})
    };
    next()
}
router.post('/teacher/register',async(req,res)=>{
    try{
        // get the data from the request body
        const {username,password,email} = req.body;
        const hashedPassword= await bcrypt.hash(password,10);
        const newTeacher= new teacher({username:username,password:hashedPassword,email:email});
        const savedTeacher= await newTeacher.save();
        res.status(200).json({message:'Teacher registered successfully',"username":username,"email":email});
    }
    catch(err){
    res.status(500).json({message:'Failed to register teacher'});
    console.log(err);
}
});
router.post('/teacher/login',async(req,res)=>{
    try{
        const {username,password}= req.body;
        const Teacher= await teacher.findOne({username});
        if(!Teacher){
            return res.status(404).json({message:'Teacher not found'});
        }
        const passwordMatch= await bcrypt.compare(password,Teacher.password);
        if(!passwordMatch){
            return res.status(401).json({message:'Invalid password'});
        };
        req.session.userId=Teacher._id;
        res.status(200).json({message:'Login successful',Teacher:{
    }})}
    catch(err){
        res.status(500).json({message:'Failed to login teacher'});
    }
})


router.get('/teacher',islogin,async(req,res)=>{
    try{
   const Teacher= await teacher.find();
   console.log(Teacher);
   res.status(200).json({Teacher});
}

   catch(err){
    res.status(500).json({message:"Cant find any teacher"});
    console.log(err);

   }


});
router.post('/teacher',async(req,res)=>{
    try{
    const data= req.body;
    const Teacher= new teacher(data);
    const response = await Teacher.save();
    res.status(200).json(response);
}
    catch(err){
    res.status(500).json({message:"Failed to add teacher"});
    console.log(err)

    }
})
router.put('/teacher/:teacherId',async(req,res)=>{
    try{
        const teacherId= req.params.teacher;
        const data= req.body;
        const response = await teacher.findOneAndUpdate(teacherId,data,{new:true});
        res.status(200).json(response);
        console.log(response);

    }
    catch(err){
        res.status(500).json({message:'Failed to update teacher'});
        console.log(err);


    }

});
router.delete('/teacher/:teacherId',async(req,res)=>{
    try{
        const teacherId= req.params.teacher;
        const response = await teacher.findByIdAndDelete(teacherId);
        res.status(200).json({message:'Teacher deleted successfully'});
        console.log(response);

    }
    catch(err){ 
        res.status(500).json({message:'Failed to delete teacher'});
        console.log(err);
    }
});
router.post('/teacher/login',async(req,res)=>{
    try{
       
    }
catch(err){
    res.status(500).json({message:'Failed to login teacher'});
    console.log(err);
}})

module.exports = router; 