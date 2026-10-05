const mongoose= require('mongoose')
const teacherschema= new mongoose.Schema({
    "name":{
        type:String,
        
    },
    "Department":{
        type:String,
       
    },
    "age":{
        type:Number,
      
    },
    "id":{
        type:String,
        unique:true,
        
    },
    "email":{
        type:String,
        
        required:true,
    },
    "username":{
        type:String,
        unique:true,
        required:true,
    },
    "password":{
        type:String,
        required:true,
        unique:true,
    }
})
const teacher= mongoose.model("teacher",teacherschema);
module.exports= teacher;