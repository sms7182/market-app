const express=require('express');
const app=express();
const router=express.Router();
const Invoice=require('../../models/Invoice');
const InvoiceLine=require('../../models/InvoiceLines');
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
              obj= createInvoice(obj,req.body);
              console.log('invoice '+ req.body.invoiceLines[0].code);
              
              obj.save().then(s=>{
                console.log('edit saving is working')
                
            }).catch(err=>res.status(400).send(`could not save because: ${err}`));
             Invoice.findOne({_id:req.body.invoiceId}).populate('invoiceLines')
          
             .exec(function(err,invLine){
               
                if(invLine){
                    console.log(invLine);
                 }
             });

            }
            else{
                console.log('start create invoice');
               var temp= new Invoice();

              temp= createInvoice(temp,req.body);
          
              temp.save(function(err){
                  console.log('create saving is working');
                  console.log(req.body.invoiceLines.length);
                  

                  res.send(temp._id);
              });
              for(var i=0;i<req.body.invoiceLines.length;i++){
                var invoiceLine=new InvoiceLine();
                  invoiceLine.code=req.body.invoiceLines[i].code;
                  invoiceLine.totalPrice=req.body.invoiceLines[i].totalPrice;
                  invoiceLine.decPrice=req.body.invoiceLines[i].decPrice;
                  invoiceLine.incPrice=req.body.invoiceLines[i].incPrice;
                  invoiceLine.netPrice=req.body.invoiceLines[i].netPrice;
                  invoiceLine.title=req.body.invoiceLines[i].title;          
                  console.log('before push')
                  temp.invoiceLines.push(invoiceLine);
                  console.log('after push')
                  invoiceLine.invoice=temp._id;
                    invoiceLine.save(function(err){
                        console.log(err+'invoice line is saved');
                    });
                 }
                 temp.save(function(err){
                     console.log('after push saving')
                 })
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
   
    
    
    console.log('invoice saved')

  return invoice;




}



module.exports = router;