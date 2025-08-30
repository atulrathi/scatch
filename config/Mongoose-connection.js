const mongoose = require('mongoose');
const config=require('config');
const dbgr=require('debug')('development:mongoose'); 

mongoose.connect(`mongodb://127.0.0.1:27017/scatch`)
.then(function(){
  console.log('connected')
})
.catch((err)=>{
  console.log(err)
});

module.exports=mongoose.connection;