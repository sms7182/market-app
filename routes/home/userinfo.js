const express=require('express');
const app=express();
const router=express.Router();
const UserInfo=require('../../models/UserInfo');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout='userinfo';
    next();
});

router.post('/',(req,res)=>{
    console.log('start saving userinfo')
    console.log(req.body);
    if(req.body){
            var userinfo=new UserInfo();
            userinfo.firstName=req.body.firstName;
            userinfo.lastName=req.body.lastName;
            userinfo.nationalityCode=req.body.nationalityCode;
            userinfo.phoneNumber=req.body.phoneNumber;
            userinfo.email=req.body.email;
            userinfo.password=req.body.password;
            userinfo.date=req.body.date;
            console.log(req.body);
            userinfo.save().then(()=>{
                console.log('userinfo saved');
            }).catch(err=>{
                res.send(err);
            })
    }
})

module.exports = router;