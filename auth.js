const express= require('express');
const app= express();
const studentmodel= require('../models/student');
const passport= require('passport');
const LocalStrategy= require('passport-local').Strategy;
app.use(passport.initialize());
passport.use(new LocalStrategy(async(username,password,done)=>{
    try{
        console.log('usercredientials:', {username,password});
        const user= await studentmodel.findOne({username:username});
        if(!user){
            return done(null,false,{message:'Incorrect username'});
        }
        const isMatch= user.password===password?true:false;
        if(!isMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:'Incorrect password'});
}}
    catch(err){
        return done(err);      ;
    }
}));

module.exports=passport;