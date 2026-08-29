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
    }
})
const student= mongoose.model("Student",studentschema);
module.exports= student;