const express = require('express');
const router = express.Router();
const app= express();
const student = require('../models/student');
app.use(express.json());

router.get('/student',async(req,res)=>{
    try{
   const student= await student.find();
  res.status(200).json(response);
  console.log(response);

}

   catch(err){
    res.status(500).json({message:'Couldnt find students due to',err})
    console.log(err);

   }


});
router.post('/student',async(req,res)=>{
    try{
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
router.put('/student',async(req,res)=>{
    try{

    }
    catch(err){


    }

});
router.delete('/student',async(req,res)=>{
    try{

    }
    catch(err){
        
    }
})
module.exports = router; 
