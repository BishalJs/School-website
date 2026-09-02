const mongoose= require('mongoose')
const studentschema= new mongoose.Schema({
    "name":{
        type:String,
        required:true,
    },
    "class":{
        type:Number,
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
const student= mongoose.model("Student",studentschema);
module.exports= student;