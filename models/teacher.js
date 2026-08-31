const mongoose= require('mongoose')
const teacherschema= new mongoose.Schema({
    "name":{
        type:String,
        required:true,
    },
    "Department":{
        type:String,
        required:true,
    },
    "age":{
        type:Number,
        required:true,
    },
    "id":{
        type:String,
        unique:true,
        required:true,
    },
    "email":{
        type:String,
        unique:true,
        required:true,
    }
})
const teacher= mongoose.model("teacher",teacherschema);
module.exports= teacher;