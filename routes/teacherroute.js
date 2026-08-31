
const express = require('express');
const router= express.Router();
const teacher = require('../models/teacher');
const app= express();


router.get('/teacher',async(req,res)=>{
    try{
   const Teacher= await teacher.find();
   console.log(Teacher);
   res.status(200).json(Teacher);
}

   catch(err){
    res.status(500).json({message:"Cant find any teacher"});
    console.log(err);

   }


});
router.post('/teacher',async(req,res)=>{
    try{
    const data= req.body;
    const Teacher= new teacher(data);
    const response = await Teacher.save();
    res.status(200).json(response);
}
    catch(err){
    res.status(500).json({message:"Failed to add teacher"});
    console.log(err)

    }
})
router.put('/teacher',async(req,res)=>{
    try{

    }
    catch(err){


    }

});
router.delete('/teacher',async(req,res)=>{
    try{

    }
    catch(err){
        
    }
})
module.exports = router; 