const express = require('express');
const router = express.Router();
const Store = require('../../models/Store');
const {userAuthenticated} = require('../../helpers/authentication');

router.all('/*',userAuthenticated ,(req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {
    Store.find({}).then(stores => {

        res.render('admin/stores', {stores: stores});

    })
});


router.post('/create', (req, res) => {
    // res.send('It works...')

    let errors = [];
    if(!req.body.name){
        errors.push({message: 'please add a Title'});
    }

    if(errors.length>0)
    {
        res.render('admin/stores/create',{errors:errors});
    }else {
        let newStore = new Store({
            name: req.body.name,
            address: req.body.address,
            bankAccount : {  bank: req.body.bank,
                             accountNumber: req.body.accountNumber
                          },
            password: req.body.password
        });

        for(var i=0;i<req.body.phoneNumbers.length;i++)
        {
            let phoneInfo=req.body.phoneNumbers[i];
            newStore.phoneNumbers.push({
                main: phoneInfo.main,
                title: phoneInfo.title,
                phoneNumber: phoneInfo.phoneNumber
            });
        }
        for(var j=0;j<req.body.emails.length;j++)
        {
            let emailInfo=req.body.emails[j];
            newStore.emails.push({
                main: emailInfo.main,
                title: emailInfo.title,
                email: emailInfo.email
            });
        }

        newStore.save().then(savedStore => {
            req.flash('success_message',`${savedStore.name} was Created Successfully`);
            res.redirect('/admin/stores')
        }).catch(validator => {
            res.render('admin/stores/create',{errors:validator.errors});
            // console.log(`COULD NOT SAVE POST BECAUSE: ${validator}`);
        });
    }
});

router.get('/edit/:id',(req,res)=>{
    //res.send('It Works');
    Store.findOne({_id:req.params.id}).then(store=>{
        store.accountNumber=store.bankAccount.accountNumber;
        store.bank=store.bankAccount.bank;
        res.render('admin/stores/edit',{store:store});
    });

});

router.put('/edit/:id',(req,res)=>{
    Store.findById(req.params.id).then(store=>{
        store.name=req.body.name;
        store.address=req.body.address;
        store.bankAccount = {  bank: req.body.bank,
            accountNumber: req.body.accountNumber
        };
        store.password= req.body.password;
        store.isActive=req.body.isActive;

        store.phoneNumbers=[];
        for(var i=0;i<req.body.phoneNumbers.length;i++)
        {
            let phoneInfo=req.body.phoneNumbers[i];
            store.phoneNumbers.push({
                main: phoneInfo.main,
                title: phoneInfo.title,
                phoneNumber: phoneInfo.phoneNumber
            });
        }

        store.emails = [];
        for(var j=0;j<req.body.emails.length;j++)
        {
            let emailInfo=req.body.emails[j];
            store.emails.push({
                main: emailInfo.main,
                title: emailInfo.title,
                email: emailInfo.email
            });
        }

        store.save().then(updatedStore=>{
            req.flash('success_message',`${updatedStore.name} was Updated Successfully`);
            res.redirect('/admin/stores');
        }).catch(err => res.status(400).send(`COULD NOT SAVE BECAUSE: ${err}`));
    })
});

router.delete('/:id', (req, res) => {
    Store.findByIdAndDelete(req.params.id).then(deletedStore => {
        req.flash('success_message',`${deletedStore.name} was Deleted Successfully`);
        res.redirect('/admin/stores');
    }).catch(err => res.status(400).send(`COULD NOT DELETE STORE BECAUSE: ${err}`));
});

module.exports = router;