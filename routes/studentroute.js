const express = require('express');
const router = express.Router();
const student= require('../models/student');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// middleware to log requests 
const logreq = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} ${req.method} ${req.originalUrl}`);
    next();
};
router.use(logreq);
// middleware to protect the routes by allowing only the user who are logged in
const islogedIn= (req,res,next)=>{
    if(!req.session.userId){
        return res.status(401).json({message:"You must be login"})
    };
    next()
};
const isadmin= async(req,res,next)=>{
    try{
     const Student = await student.findById(req.session.userId)
     const role= Student.role;
 
     if(role!=="admin"){
        return res.status(403).json({message:"You must be an admin to access this route"})
        }
        
    

    }
   
     catch(err){
        res.status(500).json({message:'Failed to check role due to',err})

     }
    next()
}



router.get('/student',islogedIn,async(req,res)=>{
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
router.put('/:student',islogedIn,async(req,res)=>{

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
router.delete('/:student',islogedIn,async(req,res)=>{
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
        const{username,email,password,role}= req.body;// takes username,email and password from the user
        const hashedPassword= await bcrypt.hash(password,10);// hashes the password using bcrypt with a salt rounds of 10
        const newStudent= new student({
            username:username,
            email:email,
            password:hashedPassword,
            role:role

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
        }
        req.session.userId=Student._id // stores _id in userid for quick identification
     res.status(200).json({message:'Login successful',Student:{
        "username":Student.username,
        "email":Student.email,
     }})
   }
    catch(err){
        res.status(500).json({message:'Failed to login due to',err})
        console.log(err)
    }});
     
router.get('/profile',islogedIn,async(req,res)=>{
    try{
        const Student= await student.findById(req.session.userId);// finds the student by _id stored in session
        if(!Student){
            return res.status(404).json({message:'Student not found'});// sends a 404 response if the student is not found
        };
        res.status(200).json({message:"Your profile is found",Student:{
            "username":Student.username,
            "email":Student.email,
        }});
    } catch(err){
        res.status(500).json({message:'Failed to get profile due to',err})
        console.log(err)
    }
})
router.post('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
            return res.status(500).json({message:'Failed to logout due to',err})
        }
    })
res.status(200).json({message:'Logout successful'})
 
})
router.get('/admin',isadmin,(req,res)=>{
    res.json({message:"you are in the admin pannel"})
})
        


    


module.exports = router; 
