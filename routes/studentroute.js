const express = require('express');
const router = express.Router();
const student = require('../models/student');
const app = express();


router.get('/student',async(req,res)=>{
    try{
   const Student= await student.find();
  res.status(200).json(Student);
  console.log(Student);

}

   catch(err){
    res.status(500).json({message:'Couldnt find students due to',err})
    console.log(err);

   }


});
router.post('/student',async(req,res)=>{
    try{
    console.log(req.body)
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
