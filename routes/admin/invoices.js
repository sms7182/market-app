const express=require('express');
const app=express();
const router=express.Router();
const Invoice=require('../../models/Invoice');
const InvoiceLine=require('../../models/InvoiceLines');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;


router.get('/',(req,res)=>{
Invoice.find({}).populate('invoiceLines').exec(function(err,obj){
    res.send(obj);
})
})




router.post('/edit',(req,res)=>{
   
    if(req.body){
        Invoice.findOne({_id:req.body.invoiceId}).populate('invoiceLines').exec(function(err,obj){
            console.log('loading ...');
            
            if(err){
                console.log(err);
               res.send(err);    
            }
            if(obj&&obj!=null){
              console.log('start edit invoice')
              obj= createOrEditInvoice(obj,req.body);
              console.log(obj.invoiceLines);
              
             obj.save();
         let cnt=0;
         cnt=obj.invoiceLines.length;
              for(var i=0;i<req.body.invoiceLines.length;i++){
                if(req.body.invoiceLines[i].id&&req.body.invoiceLines[i].id!=null){
                InvoiceLine.findOneAndUpdate({_id:req.body.invoiceLines[i].id},{$set:{
                    totalPrice:req.body.invoiceLines[i].totalPrice,
                    decPrice:req.body.invoiceLines[i].decPrice,
                    incPrice:req.body.invoiceLines[i].incPrice,
                    netPrice:req.body.invoiceLines[i].netPrice,
                }},{new:true},function(err,doc){
                    if(err){
                        console.log('update line with id: '+req.body.invoiceLines[i].id+' has error '+err);
                    }
                })
                console.log('updated line with id:'+req.body.invoiceLines[i].id);
                }
                else{
                    console.log(obj);
                var invoiceLine=new InvoiceLine();
                  invoiceLine.code=req.body.invoiceLines[i].code;
                  invoiceLine.rowOrder=cnt;
                  invoiceLine.totalPrice=req.body.invoiceLines[i].totalPrice;
                  invoiceLine.quantity=req.body.invoiceLines[i].quantity;
                  invoiceLine.decPrice=req.body.invoiceLines[i].decPrice;
                  invoiceLine.incPrice=req.body.invoiceLines[i].incPrice;
                  invoiceLine.netPrice=req.body.invoiceLines[i].netPrice;
                  invoiceLine.title=req.body.invoiceLines[i].title;    
                 cnt=cnt+1;
                  obj.invoiceLines.push(invoiceLine);
                  invoiceLine.invoice=obj._id;
                  invoiceLine.save(function(err){
                       if(err){

                           console.log(err);
                           res.send('Error in line saving: '+err);
                       }
                    });
                 }
                }
             
              res.send(obj._id);
            }
     
     else{
                console.log('start create invoice');
               var temp= new Invoice();

              temp= createOrEditInvoice(temp,req.body);
          
              temp.save(function(err){
                 console.log(err);
                 res.send(err);
              });
              for(var i=0;i<req.body.invoiceLines.length;i++){
                var invoiceLine=new InvoiceLine();
                  invoiceLine.code=req.body.invoiceLines[i].code;
                  invoiceLine.totalPrice=req.body.invoiceLines[i].totalPrice;
                  invoiceLine.decPrice=req.body.invoiceLines[i].decPrice;
                  invoiceLine.incPrice=req.body.invoiceLines[i].incPrice;
                  invoiceLine.netPrice=req.body.invoiceLines[i].netPrice;
                  invoiceLine.title=req.body.invoiceLines[i].title;  
                  invoiceLine.rowOrder=i;        
                  temp.invoiceLines.push(invoiceLine);
                  invoiceLine.invoice=temp._id;
                  invoiceLine.save(function(err){
                       if(err){

                           console.log(err);
                           res.send('Error in line saving: '+err);
                       }
                    });
                 }
                
            }
            
        });
    } 
});

function createOrEditInvoice(invoiceInstance,reqbody){
   var invoice=invoiceInstance;
 
    
    invoice.slug=reqbody.code;
  
    invoice.code=reqbody.code;
    invoice.status=reqbody.status;
    invoice.netPrice=reqbody.netPrice;
    invoice.decPrice=reqbody.decPrice;
    invoice.incPrice=reqbody.incPrice;
    invoice.store=reqbody.store;
    invoice.totalPrice=reqbody.totalPrice;
  return invoice;

}

    

module.exports = router