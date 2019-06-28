const express=require('express');
const app=express();
const router=express.Router();
const Invoice=require('../../models/Invoice');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
router.all('/*',(req,res,next)=>{
    req.app.locals.layout='invoice';
    next();
})


router.post('/',(req,res)=>{
   
    //console.log(req);
    //console.log(mongoose.Types.ObjectId.isValid('53cb6b9b4f4ddef1ad47f943'));
    if(req.body){
            var invoice=new Invoice();
            invoice.slug=req.body.code;
           // invoice.store=req.body.store.id;
            invoice.code=req.body.code;
            invoice.status=req.body.status;
            invoice.netPrice=req.body.netPrice;
            invoice.decPrice=req.body.decPrice;
            invoice.incPrice=req.body.incPrice;
            invoice.store=req.body.store;
            invoice.totalPrice=req.body.totalPrice;
            var index=1;
            
            
            for(var il in req.body.invoiceLines){
               
                invoice.invoiceLines.push(s=>{
                  
                    s.rowOrder=index;
                    s.code=il.code;
                    s.title=il.title;
                    s.quantity=il.quantity;
                    s.price=il.price;
                    s.totalPrice=il.totalPrice;
                    s.netPrice=il.netPrice;
                    s.decPrice=il.decPrice;
                    s.incPrice=il.incPrice;
                    s.invoice=invoice;
                })
                index=index+1;
            }


            console.log(req.body);
            invoice.save().then(()=>{
                console.log('invoice saved');
            }).catch(err=>{
                res.send(err);
            })
    }
})

module.exports = router;