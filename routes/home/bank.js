const express=require('express');
const app=express();
const router=express.Router();
const Bank=require('../../models/Bank');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout='bank';
    next();
});


router.post('/',(req,res)=>{
    console.log(req.body);
    if(req.body){
            var bank=new Bank();
            bank.name=req.body.name;
            bank.address=req.body.address;
            //icon
            bank.date=req.body.date;
           
            console.log(req.body);
            bank.save().then(()=>{
                console.log('userinfo saved');
            }).catch(err=>{
                res.send(err);
            })
    }
})

module.exports = router;