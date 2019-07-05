const express = require('express');
const router = express.Router();
const Bank = require('../../models/Bank');
const {userAuthenticated} = require('../../helpers/authentication');
//
// router.all('/*',userAuthenticated ,(req, res, next) => {
//     req.app.locals.layout = 'admin';
//     next();
// });

router.get('/', (req, res) => {
    Bank.find({}).then(banks => {

        res.render('admin/banks', {banks: banks});

    })
});


router.post('/create', (req, res) => {
    let errors = [];
    if(!req.body.name){
        errors.push({message: 'please add a Title'});
    }

    if(errors.length>0)
    {
        res.render('admin/banks/create',{errors:errors});
    }else {
        let newBank = new Bank({
            name: req.body.name,
            address: req.address
        });

        newBank.save().then(savedBank => {
            res.status(201).send({savedBank});
            // req.flash('success_message',`${savedBank.name} was Created Successfully`);
            // res.redirect('/admin/banks')
        }).catch(validator => {
            res.status(400).send();
            // res.render('admin/banks/create',{errors:validator.errors});
        });
    }
});

router.get('/edit/:id',(req,res)=>{
    //res.send('It Works');
    Bank.findOne({_id:req.params.id}).then(bank=>{
        res.render('admin/banks/edit',{bank:bank});
    });

});

router.put('/edit/:id',(req,res)=>{
    Bank.findById(req.params.id).then(bank=>{
        bank.name=req.body.name;
        bank.address=req.address;
        bank.isActive=req.isActive;
        bank.save().then(updatedBank=>{
            req.flash('success_message',`${updatedBank.name} was Updated Successfully`);
            res.redirect('/admin/banks');
        }).catch(err => res.status(400).send(`COULD NOT SAVE BECAUSE: ${err}`));
    })
});

router.delete('/:id', (req, res) => {
       Bank.findByIdAndDelete(req.params.id).then(deletedBank => {
        res.status(201).send({deletedBank});
        // req.flash('success_message',`${deletedBank.name} was Deleted Successfully`);
        // res.redirect('/admin/banks');
    }).catch(err => res.status(400).send(`COULD NOT DELETE BANK BECAUSE: ${err}`));
});

module.exports = router;