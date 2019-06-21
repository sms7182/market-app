const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser=require('body-parser');
const app=express();
const publicdirectory=path.join(__dirname,'../public');
const viewpath=path.join(__dirname,'../templates/views');
const partialspath=path.join(__dirname,'../templates/partials')
const hbs=require('hbs');
const session=require('express-session');
const flash=require('connect-flash');
const {mongoDbUrl}=require('../config/database');
mongoose.Promise=global.Promise;

const port=process.env.Port || 7575;

app.set('view engine','hbs');
app.set('views',viewpath);
hbs.registerPartials(partialspath);

app.use(express.static(publicdirectory));




const Bank=require('../models/Bank');

mongoose.connect(mongoDbUrl).then((db)=>{
    console.log('mongo connected');
}).catch(err=>console.log(err));


app.post('/users',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

app.listen(port,()=>{
    console.log('Server is running on 7575');
})