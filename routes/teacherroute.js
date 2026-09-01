
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
router.put('/:teacher',async(req,res)=>{
    try{
        const teacherId= req.params.teacher;
        const data= req.body;
        const response = await teacher.findOneAndUpdate(teacherId,data,{new:true});
        res.status(200).json(response);
        console.log(response);

    }
    catch(err){
        res.status(500).json({message:'Failed to update teacher'});
        console.log(err);


    }

});
router.delete('/:teacher',async(req,res)=>{
    try{
        const teacherId= req.params.teacher;
        const response = await teacher.findByIdAndDelete(teacherId);
        res.status(200).json({message:'Teacher deleted successfully'});
        console.log(response);

    }
    catch(err){ 
        res.status(500).json({message:'Failed to delete teacher'});
        console.log(err);
    }
})
module.exports = router; 