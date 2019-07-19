const express = require('express');
const multer = require('multer');
const router = express.Router();
const Store = require('../../models/Store');
const Bank = require('../../models/Bank');
const {userAuthenticated} = require('../../helpers/authentication');
//
// router.all('/*',userAuthenticated ,(req, res, next) => {
//     req.app.locals.layout = 'admin';
//     next();
// });

const upload=multer({
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload an image'));
        }
        cb(undefined,true);
    }
});

router.get('/', (req, res) => {
    Store.find({}).then(stores => {

        res.render('admin/stores', {stores: stores});

    })
});


router.get('/create', (req, res) => {
    //res.send('It works...');
    Bank.find({}).then(banks => {
        res.render('admin/stores/create', {banks: banks});
    })
});

router.post('/create',upload.single('icon'), (req, res) => {
    // res.send('It works...')
    let errors = [];
    if(!req.body.name){
        errors.push({message: 'please add a Title'});
    }
    if(!req.body.address){
        errors.push({message: 'please add an Address'});
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

        if(req.file)
        {
            newStore.icon=req.file.buffer;
        }else {
            newStore.icon = null;
        }

        let isActive = false;
        if (req.body.isActive) {
            isActive = true;
        }
        newStore.isActive=isActive;

        if(req.body.phoneNumbers)
        {
            for(var i=0;i<req.body.phoneNumbers.length;i++)
            {
                let phoneInfo=req.body.phoneNumbers[i];
                newStore.phoneNumbers.push({
                    main: phoneInfo.main,
                    title: phoneInfo.title,
                    phoneNumber: phoneInfo.phoneNumber
                });
            }
        }

        if(req.body.emails) {
            for (var j = 0; j < req.body.emails.length; j++) {
                let emailInfo = req.body.emails[j];
                newStore.emails.push({
                    main: emailInfo.main,
                    title: emailInfo.title,
                    email: emailInfo.email
                });
            }
        }
        // console.log(`Store SAVING (${newStore})`);
        newStore.save().then(savedStore => {
            // res.status(201).send({savedStore});
            req.flash('success_message',`${savedStore.name} was Created Successfully`);
            res.redirect('/admin/stores')
        }).catch(validator => {
            // res.status(400).send();
            res.render('admin/stores/create',{errors:validator.errors});
        });
    }
});

router.get('/edit/:id',(req,res)=>{
    //res.send('It Works');
    Store.findOne({_id:req.params.id}).then(store=>{
        store.accountNumber=store.bankAccount.accountNumber;
        store.bank=store.bankAccount.bank;

        Bank.find({}).then(banks => {
            res.render('admin/stores/edit', {store: store, banks: banks});
        });
    });

});

router.put('/edit/:id',upload.single('icon'),(req,res)=>{
    Store.findById(req.params.id).then(store=>{
        store.name=req.body.name;
        store.address=req.body.address;
        store.bankAccount = {  bank: req.body.bank,
            accountNumber: req.body.accountNumber
        };
        store.password= req.body.password;

        if(req.file)
        {
            store.icon=req.file.buffer;
        }else {
            store.icon = null;
        }

        let isActive = false;
        if (req.body.isActive) {
            isActive = true;
        }
        store.isActive=isActive;

        store.phoneNumbers=[];
        if(req.body.phoneNumbers)
        {
            for(var i=0;i<req.body.phoneNumbers.length;i++)
            {
                let phoneInfo=req.body.phoneNumbers[i];
                store.phoneNumbers.push({
                    main: phoneInfo.main,
                    title: phoneInfo.title,
                    phoneNumber: phoneInfo.phoneNumber
                });
            }
        }

        store.emails = [];
        if(req.body.emails)
        {
            for(var j=0;j<req.body.emails.length;j++)
            {
                let emailInfo=req.body.emails[j];
                store.emails.push({
                    main: emailInfo.main,
                    title: emailInfo.title,
                    email: emailInfo.email
                });
            }
        }

        store.save().then(updatedStore=>{
            req.flash('success_message',`${updatedStore.name} was Updated Successfully`);
            res.redirect('/admin/stores');
        }).catch(err => res.status(400).send(`COULD NOT SAVE BECAUSE: ${err}`));
    })
});

router.delete('/:id', (req, res) => {
    Store.findByIdAndDelete(req.params.id).then(deletedStore => {
        // res.status(201).send({deletedStore});
        req.flash('success_message',`${deletedStore.name} was Deleted Successfully`);
        res.redirect('/admin/stores');
    }).catch(err => res.status(400).send(`COULD NOT DELETE STORE BECAUSE: ${err}`));
});

router.post('/changeActive/:id', (req, res) => {
    Store.findById(req.params.id).then(store => {
        // res.status(201).send({deletedStore});
        store.isActive = !store.isActive;
        store.save().then(savedStore=>{
            req.flash('success_message',`${store.name}'s Active State was Updated Successfully`);
            res.redirect('/admin/stores');
        });

    }).catch(err => res.status(400).send(`COULD NOT Active/DeActive STORE BECAUSE: ${err}`));
});

module.exports = router;