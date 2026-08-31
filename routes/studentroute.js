const express = require('express');
const router = express.Router();
const student = require('../models/student');
const app= express(); 



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
router.put('/:student',async(req,res)=>{

    try{
        const Student= req.params.student;// stores object id
        const update= req.body; // data from user from 
        const response= await student.findByIdAndUpdate(Student,update,{new:true,});
        console.log(response)

    }
    catch(err){
       res.status(500).json({message:'failed to update student due to',err})
        console.log(err)

    }

});
router.delete('/:student',async(req,res)=>{
    try{
        const Student= req.params.student;
        const user= req.body;
        const dlt= student.findByIdAndDelete(Student,user,{new:true,});
        console.log('Student has been deleted sucessfully')

    }
    catch(err){
         res.status(500).json({message:'failed to delete student due to',err})
        console.log(err)

        
    }
})
module.exports = router; 
