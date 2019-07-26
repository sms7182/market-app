const express=require('express');
const router=express.Router();
const Invoice=require('../../models/Invoice');
const InvoiceLine=require('../../models/InvoiceLines');

router.get('/my-invoices', (req, res) => {
    Invoice.find({user: req.user.id}).populate('store').then(invoices => {

        res.render('home/invoices/my-invoices', {invoices: invoices});
    })
});

router.get('/create', (req, res) => {
    //res.send('It works...');
   
    res.render('home/invoices/create');
    
});

router.post('/create', (req, res) => {
    console.log('Create INvoice');
   if(req&&req.body){
    var netPrice=req.body.netPrice;
    var incPrice=0;
    var decPrice=0;
    var totalPrice=0;
    if(req.body.incPrice){
        incPrice=req.body.incPrice;
    }
    if(req.body.decPrice){
        decPrice=req.body.decPrice;
    }
    totalPrice=netPrice+incPrice-decPrice;
    var invoice= new Invoice();

    invoice.netPrice=netPrice;
    invoice.decPrice=decPrice;
    invoice.incPrice=incPrice;
    invoice.totalPrice=totalPrice;
    invoice.slug=req.body.code;
    invoice.code=req.body.code;
    invoice.save();
    var invoiceLine=new InvoiceLine();
    invoiceLine.code=req.body.code;
    invoiceLine.rowOrder=1;
    invoiceLine.totalPrice=totalPrice;
    invoiceLine.quantity=1;
    invoiceLine.decPrice=decPrice;
    invoiceLine.incPrice=incPrice;
    invoiceLine.netPrice=netPrice;
    invoiceLine.title=req.body.title;    
   
    invoice.invoiceLines.push(invoiceLine);
   
    invoiceLine.invoice=invoice._id;
    invoiceLine.save(function(err){
               if(err){
                   console.log(err);
                   res.send('Error in line saving: '+err);
               }
               else{
                res.render('home/invoices/edit',{invoice:invoice});
               }
    });
   }
 
   
});

router.put('/addItem/:id',(req,res)=>{
    
    if(req&&req.body){
       console.log('id is '+req.params.id);
      Invoice.findOne({_id:req.params.id}).populate('invoiceLines').exec(function(err,invoice){
          console.log('Loading ...'+req.params.id);
          if(err){
              console.log(err);
              res.send(err);
          }
          if(invoice&&invoice!=null){
              console.log('Edit invoice start ...');
              var netPrice=req.body.netPrice;
              var incPrice=0;
              var decPrice=0;
              var totalPrice=0;
              if(req.body.incPrice){
                  incPrice=req.body.incPrice;
              }
              if(req.body.decPrice){
                  decPrice=req.body.decPrice;
              }
              totalPrice=netPrice+incPrice-decPrice;
              invoice.netPrice=invoice.netPrice+netPrice;
              invoice.incPrice=invoice.incPrice+incPrice;
              invoice.decPrice=invoice.decPrice+decPrice;
              invoice.totalPrice=invoice.totalPrice+totalPrice;
              invoice.save();
              var invoiceLine=new InvoiceLine();
              invoiceLine.code=req.body.code;
              invoiceLine.rowOrder=invoice.invoiceLines.length+1;
              invoiceLine.totalPrice=totalPrice;
              invoiceLine.quantity=1;
              invoiceLine.decPrice=decPrice;
              invoiceLine.incPrice=incPrice;
              invoiceLine.netPrice=netPrice;
           
              invoice.invoiceLines.push(invoiceLine);
              invoiceLine.invoice=invoice._id;
              invoiceLine.save(function(err){
                   if(err){

                       console.log(err);
                       res.send('Error in line saving: '+err);
                   }
                   else{
                    res.render('admin/invoices/edit',{invoice:invoice});
                   }
                });

          }
          else{
            var netPrice=req.body.netPrice;
            var incPrice=0;
            var decPrice=0;
            var totalPrice=0;
            if(req.body.incPrice){
                incPrice=req.body.incPrice;
            }
            if(req.body.decPrice){
                decPrice=req.body.decPrice;
            }
            totalPrice=netPrice+incPrice-decPrice;
            var invoice= new Invoice();

            invoice.netPrice=netPrice;
            invoice.decPrice=decPrice;
            invoice.incPrice=incPrice;
            invoice.totalPrice=totalPrice;
            invoice.slug=req.body.code;
            invoice.code=req.body.code;
            invoice.save();
            var invoiceLine=new InvoiceLine();
            invoiceLine.code=req.body.code;
            invoiceLine.rowOrder=1;
            invoiceLine.totalPrice=totalPrice;
            invoiceLine.quantity=1;
            invoiceLine.decPrice=decPrice;
            invoiceLine.incPrice=incPrice;
            invoiceLine.netPrice=netPrice;
            invoiceLine.title=req.body.title;    
           
            invoice.invoiceLines.push(invoiceLine);
           
            invoiceLine.invoice=invoice._id;
            invoiceLine.save(function(err){
                       if(err){
                           console.log(err);
                           res.send('Error in line saving: '+err);
                       }
                       else{
                        res.render('admin/invoices/edit',{invoice:invoice});
                       }
            });
          }
      })
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

    

module.exports = router;