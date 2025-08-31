const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
  let succes=req.flash("succes")
  res.render('createproduct',{succes});
});

module.exports=router;