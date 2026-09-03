const mongoose= require('mongoose');
const eventschema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    category:{
        type:String,
        required:true,
    }
});
const Event= mongoose.model('Event',eventschema);
module.exports= Event;