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

const port=process.env.Port || 7575;

const Bank=require('../models/Bank');



mongoose.connect(mongoDbUrl).then((db)=>{
    console.log('mongo connected');
}).catch(err=>console.log(err));

app.get('',(req,res)=>{
    res.send('inserting ...');  
    var bank=new Bank({
        name:'saman',
        address:'jordan',
       
    })
    bank.save().then(()=>{
       
        console.log('bank saved')
    }).catch((err)=>{
        console.log(err);
    })
})

app.listen(port,()=>{
    console.log('Server is running on 7575');
})