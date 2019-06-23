const express=require('express');
const app=express();
const router=express.Router();
const Store=require('../../models/Store');

router.all('/*',(req,res,next)=>{
    req.app.locals.layout='store';
    next();
});


router.post('/',(req,res)=>{
    console.log(req.body);
    if(req.body){
            var store=new Store();
            store.name=req.body.name;
            store.address=req.body.address;
            store.date=req.body.date;
            console.log(req.body);
            store.save().then(()=>{
                console.log('store saved');
            }).catch(err=>{
                res.send(err);
            })
    }
})

module.exports = router;