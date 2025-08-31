const express = require('express');
const app = express();

const db=require('./config/Mongoose-connection');
const ownerRouter=require('./router/ownerRouter');
const userRouter=require('./router/userRouter');
const productsRouter=require('./router/productsRouter');
const index=require('./router/index');
const config=require('config');
const session=require("express-session");
const flash=require("connect-flash");

const cookieParser = require('cookie-parser');
const path=require('path');
require("dotenv").config();

//middleware
  app.use(express.json());
  app.use(express.urlencoded({extended:true}));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname,'public')));
  app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.EXPRESS_SESSION_SECRET,
  }));
  app.use(flash());
  app.set('view engine','ejs');
  app.set('views',path.join(__dirname,'views'));

//routes
app.use('/',index);
app.use('/owner',ownerRouter);
app.use('/user',userRouter);
app.use('/product',productsRouter);

//port
app.listen(3000,()=>{
  console.log('running')
});