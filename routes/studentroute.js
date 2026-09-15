const express = require('express');
const router = express.Router();
const student= require('../models/student');
const app= express(); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const { applyTimestamps } = require('../models/Event');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy((username, password, done) => { //authentication login system using passport-local strategy
    try{
        console.log('Usercredentials:', username, password); // logs username and password to the console for debugging purposes
        const user = student.findOne({ username: username }); // checks the username of the student in the database
        if(!user){
            done(null, false, { message: 'Username not found' }); // if user is not found, return an error message
        };
        const passwordMatch= user.password === password; // checks if the password matches the one in the database
        if(!passwordMatch){
            done(null, false, { message: 'Invalid password' }); // if password is incorrect, return an error message
        }
        else{
            done(null, user); // if username and password are correct, return the user object
        }
    }
    catch(err){
        done(err); // if there is an error, return the error
    }
}));
app.use(passport.initialize()); // initializes passport middleware

// middleware to log requests 
const logreq = (req, res, next) => {
    console.log(`${new Date().toLocaleString()} ${req.method} ${req.originalUrl}`);
    next();
};
router.use(logreq);



router.get('/student',passport.authenticate('local' ),async(req,res)=>{
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
        const {username,email,password}= req.body;
        const hashedPassword = await bcrypt.hash(password, 10);// store hashed password in database
        console.log({username,
                      email,
                      hashedPassword});
        res.send('You are in the register page')
    }
    catch(err){
        res.status(500).json({message:'failed to register student due to',err})
        console.log(err)
    }
})
router.post('/login',async(req,res)=>{

}
)
router.get('/register/admin',async(req,res)=>{
    try{
        const userdetails= await student.find()
        res.send('You are admin page')}
    catch(err){
        res.status(500).json({message:'failed to access admin register page due to',err})
        console.log(err)
    }})
router.get('/token',async(req,res)=>{
    try{
        const token= jwt.sign({username:'Bishal@123'},//information to be stored in token
              'secretkey',// secret key use to verify the token
              {expiresIn:'1h'}// expiration time of token    
        );
        res.json({token})
    }

    
    catch(err){
        res.status(500).json({message:'failed to generate token due to',err})
        console.log(err)
    }
});
router.get('/profile',async(req,res,next)=>{try{
    const user= req.body;
    const authHeader= req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    jwt.verify(token, secret, (err, user) => {
    // ...
});

}
catch(err){
    res.status(500).json({message:'failed to access profile page due to',err})
    console.log(err)
};})
exports = router; 
