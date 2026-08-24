const mongoose= require('mongoose');
const URL="mongodb+srv://shotgaming124_db_user:<shotgaming124_db_use>@cluster0.z4c2bff.mongodb.net/"
require('dotenv').config();
mongoose.connect(URL)
const db= mongoose.connection;
db.on('connected',()=>{
    console.log('Mongodb connected sucessfully')
})
db.on('error',(err)=>{
    console.log('Server is not coonected',err)
})
db.on('disconnected',()=>{
    console.log('Server Disconnected')
})
module.exports=db;