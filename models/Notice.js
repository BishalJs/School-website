const mongoose= require('mongoose');
const noticeschema= new mongoose.Schema({
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
const Notice= mongoose.model('Notice',noticeschema);
module.exports= Notice;