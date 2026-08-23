const mongoose= require('mongoose');
const URL="mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.9.2";
 
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