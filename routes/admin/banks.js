const express = require('express');
const multer = require('multer');
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


router.get('/create', (req, res) => {
    res.render('admin/banks/create');
});

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

router.post('/create',upload.single('icon'), (req, res) => {
    let errors = [];
    // console.log(req);
    if(!req.body.name){
        errors.push({message: 'please add a Name'});
    }

    if(errors.length>0)
    {
        res.render('admin/banks/create',{errors:errors});
    }else {
        let newBank = new Bank({
            name: req.body.name,
            address: req.body.address
        });

        if(req.file)
        {
            newBank.icon=req.file.buffer;
        }else {
            newBank.icon = null;
        }

        let isActive = false;
        if (req.body.isActive) {
            isActive = true;
        }

        newBank.isActive = isActive;

        newBank.save().then(savedBank => {
            // res.status(201).send({savedBank});
            req.flash('success_message',`${savedBank.name} was Created Successfully`);
            res.redirect('/admin/banks');
        }).catch(validator => {
            // res.status(400).send();
            console.log(validator );
            res.status(400).render('admin/banks/create',{errors:validator.errors});
        });
    }
});

router.get('/edit/:id',(req,res)=>{
    //res.send('It Works');
    Bank.findOne({_id:req.params.id}).then(bank=>{
        res.render('admin/banks/edit',{bank:bank});
    });

});

router.put('/edit/:id',upload.single('icon'),(req,res)=>{
    Bank.findById(req.params.id).then(bank=>{
        bank.name=req.body.name;
        bank.address=req.body.address;

        let isActive = false;
        if (req.body.isActive) {
            isActive = true;
        }
        if(req.file)
        {
            bank.icon=req.file.buffer;
        }else {
            bank.icon = null;
        }
        bank.isActive=isActive;
        bank.save().then(updatedBank=>{
            req.flash('success_message',`${updatedBank.name} was Updated Successfully`);
            res.redirect('/admin/banks');
        }).catch(err => res.status(400).send(`COULD NOT SAVE BECAUSE: ${err}`));
    })
});

router.delete('/:id', (req, res) => {
       Bank.findByIdAndDelete(req.params.id).then(deletedBank => {
        // res.status(201).send({deletedBank});
        req.flash('success_message',`${deletedBank.name} was Deleted Successfully`);
        res.redirect('/admin/banks');
    }).catch(err => res.status(400).send(`COULD NOT DELETE BANK BECAUSE: ${err}`));
});


router.post('/changeActive/:id', (req, res) => {
    Bank.findById(req.params.id).then(bank => {
        // res.status(201).send({deletedStore});
        bank.isActive = !bank.isActive;
        bank.save().then(savedBank=>{
            req.flash('success_message',`${bank.name}'s Active State was Updated Successfully`);
            res.status(201).redirect('/admin/banks');
        });

    }).catch(err => res.status(400).send(`COULD NOT Active/DeActive Bank BECAUSE: ${err}`));
});

module.exports = router;