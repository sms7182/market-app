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




router.post('/edit',(req,res)=>{
   

    if(req.body){
        Invoice.findOne({_id:req.body.invoiceId},function(err,obj){
            console.log('loading ...')
            if(err){
                console.log(err);
               res.send(err);    
            }
            if(obj&&obj!=null){
                console.log('start edit invoice')
              obj= createInvoice(obj,req.body)
              obj.save().then(s=>{
                console.log('edit saving is working')
                res.send(s._id);
            }).catch(err=>res.status(400).send(`could not save because: ${err}`));
            }
            else{
                console.log('start create invoice');
               var temp= new Invoice();

              temp= createInvoice(temp,req.body);
              temp.save().then(s=>{
                  console.log('create saving is working')
                  res.send(s._id);
              }).catch(err=>res.status(400).send(`could not save because: ${err}`));
             

            }
            
        })
            


           /* console.log(req.body);
            invoice.save().then(()=>{
                console.log('invoice saved');
            }).catch(err=>{
                res.send(err);
            })*/
    }
    
});


function createInvoice(invoiceInstance,reqbody){
   var invoice=invoiceInstance;
 
    
    invoice.slug=reqbody.code;
   // invoice.store=req.body.store.id;
    invoice.code=reqbody.code;
    invoice.status=reqbody.status;
    invoice.netPrice=reqbody.netPrice;
    invoice.decPrice=reqbody.decPrice;
    invoice.incPrice=reqbody.incPrice;
    invoice.store=reqbody.store;
    invoice.totalPrice=reqbody.totalPrice;
    var index=1;
   
    
    
    /*for(var il in reqbody.invoiceLines){
       
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
    }*/
    console.log('invoice saved')

  return invoice;




}



module.exports = router;