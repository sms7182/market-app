const path=require('path');
const express=require('express');
const mongoose=require('mongoose');
const exphbs = require('express-handlebars');
const bodyParser=require('body-parser');
const methodOverride = require('method-override');
const app=express();
// const publicdirectory=path.join(__dirname,'public');
// const viewpath=path.join(__dirname,'../templates/views');
// const partialspath=path.join(__dirname,'../templates/partials');
// const hbs=require('hbs');
const session=require('express-session');
const flash=require('connect-flash');
const {mongoDbUrl}=require('../config/database');
const passport = require('passport');

mongoose.Promise=global.Promise;

console.log(process.env.MONGODB_URL);
mongoose.connect(process.env.MONGODB_URL||mongoDbUrl, {useNewUrlParser: true}).then((db)=>{
    console.log('mongo connected');
}).catch(err=>console.log(err));

console.log(path.join(__dirname, '../public'));
app.use(express.static(path.join(__dirname, '../public')));

const {select,generateDate,paginate} = require('../helpers/handlebars-helpers');

//Set View Engines
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select: select, generateDate: generateDate,paginate: paginate}}));
app.set('view engine', 'handlebars');
//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Method Override
app.use(methodOverride('_method'));

app.use(session({
    secret:'thisisasecret',
    resave :true,
    saveUninitialized:true
}));
app.use(flash());

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Local Variables using Middleware
app.use((req,res,next)=>{
    res.locals.user = req.user || null;
    res.locals.success_message=req.flash('success_message');
    res.locals.error_message=req.flash('error_message');
    res.locals.error=req.flash('error');
    next();
});


// const {select,generateDate,paginate} = require('./helpers/handlebars-helpers');
//
// app.set('view engine','hbs');
// app.set('views',viewpath);
// hbs.registerPartials(partialspath);

// app.use(express.static(publicdirectory));

//Load Routs
const home = require('../routes/home/index');
const admin = require('../routes/admin/index');
const banks = require('../routes/admin/banks');
const stores = require('../routes/admin/stores');
const userInfos = require('../routes/admin/userInfos');


//User Routes
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/banks', banks);
app.use('/admin/stores', stores);
app.use('/userInfos', userInfos);

module.exports = app;