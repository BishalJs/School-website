const express = require('express');
const router = express.Router();
const student= require('../models/student');
const app= express(); 
const expressSession = require('express-session');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;




// middleware to log requests 
const logreq = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} ${req.method} ${req.originalUrl}`);
    next();
};
router.use(logreq);



router.get('/student',passport.authenticate('local', { session: false }),async(req,res)=>{
    try{
   const Student= await student.find();

  res.status(200).json(Student);
  console.log(Student);

}

   catch(err){
    res.status(500).json({message:'Couldnt find students due to',err})
    console.log(err);

   }


});
router.post('/student',async(req,res)=>{
    try{
    console.log(req.body)
    const data= req.body;
    const Student= new student(data);
    const save= await Student.save();
    res.status(200).json({message:'Student is saved sucessfully'}
        )
    console.log(save)
    
   
}
    catch(err){
        res.status(500).json({message:'failed to add student due to',err})
        console.log(err)
    }
})
router.put('/:student',async(req,res)=>{

    try{
        const Student= req.params.student;// stores object id
        const update= req.body; // data from user from 
        const response= await student.findByIdAndUpdate(Student,update,{new:true,});
        console.log(response)

    }
    catch(err){
       res.status(500).json({message:'failed to update student due to',err})
        console.log(err)

    }

});
router.delete('/:student',async(req,res)=>{
    try{
        const Student= req.params.student;
        const user= req.body;
        const dlt= student.findByIdAndDelete(Student,user,{new:true,});
        console.log('Student has been deleted sucessfully')

    }
    catch(err){
         res.status(500).json({message:'failed to delete student due to',err})
        console.log(err)

        
    }
})
router.post('/register',async(req,res)=>{
    try{
        const{username,email,password}= req.body;// takes username,email and password from the user
        const hashedPassword= await bcrypt.hash(password,10);// hashes the password using bcrypt with a salt rounds of 10
        const newStudent= new student({
            username:username,
            email:email,
            password:hashedPassword

        })// stores the new student data in a new instance of the student model with hashed password
        const savedStudent= await newStudent.save();// saves the new student to the database
        res.status(201).json({message:'Student registered successfully',student:savedStudent});// sends a success response with the saved student data
        console.log(savedStudent);

    }
catch(err){
    res.status(500).json({message:'Failed to register student due to',err})
 console.log(err)
}})
router.post('/login',async(req,res)=>{
    try{
        const {username,password}= req.body;// takes username and password from the user
        const Student= await student.findOne({username});// finds the student by username in the database
        if(!Student){
            return res.status(404).json({message:'Student not found'});// sends a 404 response if the student is not found
        }
        const passwordMatch = await bcrypt.compare(password,Student.password);// compares the provided password with the hashed password in the database
        if(!passwordMatch){
            return res.status(401).json({message:'Invalid password'});// sends a 401 response if the password does not match
        };
       req.session.userId = Student._id; // stores student id in the session to keep the student logged in
        res.status(200).json({message:'Student logged in successfully'});// sends a success response with the student data and password match result
        console.log(Student);
    }
catch(err){
    res.status(500).json({message:'Failed to login student due to',err})
    console.log(err)
}});
router.get('/profile',async(req,res)=>{
    try{
   if(!req.session.userId){
    return res.status(401).json({message:'You must be logged in to view your profile'});// sends a 401 response if the student is not logged in
    };

    const Student= await student.findById(req.session.userId);// finds the student by id in the database
   if(!Student){
    return res.status(404).json({message:'Student not found'});// sends a 404 response if the student is not found
   }
res.status(200).json({message:'Student profile fetched successfully',student:Student});// sends a success response with the student data
}
    catch(err){
        res.status(500).json({message:'Failed to fetch student profile due to',err})
        console.log(err)
    }

})
module.exports = router; 
