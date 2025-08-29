const express = require('express');
const app = express();

const db=require('./config/Mongoose-connection');
const ownerRouter=require('./router/ownerRouter');
const userRouter=require('./router/userRouter');
const productsRouter=require('./router/productsRouter');

const cookieParser = require('cookie-parser');
const path=require('path');

app.use(express.json);
app.use(express.urlencoded({extended:true}));
app.use(cookieParser);
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine','ejs');

app.use('/owner',ownerRouter);
app.use('/user',userRouter);
app.use('/product',productsRouter);

app.listen(3000,()=>{
  console.log('running')
});