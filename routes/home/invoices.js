const express=require('express');
const app=express();
const router=express.Router();
const Invoice=require('../../models/Invoice');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout='invoice';
    next();
})


router.post('/',(req,res)=>{
    console.log(req.body);
    if(req.body){
            var invoice=new Invoice();
            invoice.slug=req.body.code;
            invoice.store=req.body.store.id;
            console.log(req.body);
            invoice.save().then(()=>{
                console.log('invoice saved');
            }).catch(err=>{
                res.send(err);
            })
    }
})

module.exports = router;