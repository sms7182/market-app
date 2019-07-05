const express = require('express');
const router = express.Router();
const UserInfo = require('../../models/UserInfo');
const bcryptjs = require('bcryptjs');

const {userAuthenticated} = require('../../helpers/authentication');
//
// router.all('/*',userAuthenticated ,(req, res, next) => {
//     req.app.locals.layout = 'admin';
//     next();
// });

router.get('/', (req, res) => {
    UserInfo.find({}).then(users => {

        res.render('admin/users', {users: users});

    })
});


router.post('/register', (req, res) => {

    let errors = [];
    if (!req.body.firstName) {
        errors.push({message: 'please add a FirstName'});
    }

    if (!req.body.lastName) {
        errors.push({message: 'please add a LastName'});
    }

    if (!req.body.email) {
        errors.push({message: 'please add an EMail'});
    }

    if (!req.body.password) {
        errors.push({message: 'please enter a Password'});
    }

    if (!req.body.passwordConfirm) {
        errors.push({message: 'Confirm Password can not be empty'});
    }

    if (req.body.password !== req.body.passwordConfirm) {
        errors.push({message: 'Password fields do not match'});
    }

    if (errors.length > 0) {
        res.render('home/register', {
            errors: errors,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        });
    } else {
        UserInfo.findOne({email: req.body.email}).then(findUser => {


            if (!findUser) {
                let newUser = new UserInfo({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password,
                    nationalityCode: req.body.nationalityCode,
                    phoneNumber:req.body.phoneNumber
                });

                if(req.body.bankHistories)
                {
                    for(var i=0;i<req.body.bankHistories.length;i++)
                    {
                        let bankHistory=req.body.bankHistories[i];
                        newUser.bankHistories.push({
                            bank: bankHistory.bank,
                            accountNumber:bankHistory.accountNumber
                        });
                    }
                }

                bcryptjs.genSalt(10, (err, salt) => {
                    bcryptjs.hash(newUser.password, salt, (err, hash) => {

                        newUser.password = hash;

                        newUser.save().then(savedUser => {

                            res.status(201).send({savedUser});

                            // req.flash('success_message', `${savedUser.email} was Registered Successfully, You Can Login NOW.`);
                            // res.redirect('/login');
                        }).catch(err => {
                            // console.log(`COULD NOT Create User BECAUSE: ${err}`);
                            res.status(400).send(`COULD NOT Create User BECAUSE: ${err}`);
                        });
                    });
                });
            } else {
                res.status(400).send(`${findUser.email} already Exists, You Can Login NOW.`);

                // req.flash('error_message', `${findUser.email} already Exists, You Can Login NOW.`);
                // res.redirect('/login');
                // res.render('home/register', {errors: errors,
                //     firstName: req.body.firstName,
                //     lastName: req.body.lastName,
                //     email: req.body.email
                // });
            }
        });

    }
});
//
// router.get('/edit/:id',(req,res)=>{
//     //res.send('It Works');
//     User.findOne({_id:req.params.id}).then(user=>{
//         res.render('admin/users/edit',{userInfo:user});
//     });
//
// });
//
// router.put('/edit/:id',(req,res)=>{
//     Bank.findById(req.params.id).then(bank=>{
//         bank.name=req.body.name;
//         bank.address=req.address;
//         bank.isActive=req.isActive;
//         bank.save().then(updatedBank=>{
//             req.flash('success_message',`${updatedBank.name} was Updated Successfully`);
//             res.redirect('/admin/banks');
//         }).catch(err => res.status(400).send(`COULD NOT SAVE BECAUSE: ${err}`));
//     })
// });
//
// router.delete('/:id', (req, res) => {
//     Bank.findByIdAndDelete(req.params.id).then(deletedBank => {
//         req.flash('success_message',`${deletedBank.name} was Deleted Successfully`);
//         res.redirect('/admin/banks');
//     }).catch(err => res.status(400).send(`COULD NOT DELETE BANK BECAUSE: ${err}`));
// });

module.exports = router;