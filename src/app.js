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
const passport=require('passport');
const session=require('express-session');
const flash=require('connect-flash');
const {mongoDbUrl}=require('../config/database');
mongoose.Promise=global.Promise;

const port=process.env.Port || 7575;

app.set('view engine','hbs');
app.set('views',viewpath);
hbs.registerPartials(partialspath);


//#region bodyparser
app.use(express.static(publicdirectory));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//#endregion

//#region passport-session
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//#endregion

//#region mongodb
mongoose.connect(mongoDbUrl).then((db)=>{
    console.log('mongo connected');
}).catch(err=>console.log(err));
//#endregion



//#region model
 const Invoice=require('../models/Invoice');
//#endregion





app.get('',(req,res)=>{
   res.render('index',{
       title:'market',
       name:'mojtaba'
   })
})


app.post('/users',(req,res)=>{
    console.log(req.body);
    res.send(req.body);
})

app.post('/invoice',(req,res)=>{
    if(req.body){
            var invoice=new Invoice();
            invoice.code=req.body.code;
            console.log(req.body);
            invoice.save().then(()=>{
                console.log('invoice saved');
            }).catch(err=>{
                res.send(err);
            })
    }
})

app.listen(port,()=>{
    console.log('Server is running on 7575');
})