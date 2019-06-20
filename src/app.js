const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser=require('body-parser');
const app=express();
const session=require('express-session');
const flash=require('connect-flash');
const {mongoDbUrl}=require('../config/database');
mongoose.Promise=global.Promise;
mongoose.connect(mongoDbUrl).then((db)=>{
    console.log('mongo connected');
}).catch(err=>console.log(err));

app.get('',(req,res)=>{
    res.send('run ... run');  
})

app.listen(7575,()=>{
    console.log('Server is running on 7575');
})