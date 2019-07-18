const express = require('express');
const router = express.Router();
const Store = require('../../models/Store');
const Bank = require('../../models/Bank');
const UserInfo = require('../../models/UserInfo');
const Invoice=require('../../models/Invoice');
// const faker = require('faker');
const {userAuthenticated} = require('../../helpers/authentication');
const mongoose = require('mongoose');
const objectId = mongoose.Types.ObjectId;


router.all('/*', (req, res, next) => {
// router.all('/*',userAuthenticated ,(req, res, next) => {
    req.app.locals.layout = 'admin';
    next();
});

router.get('/', (req, res) => {

    // res.send('it works');
    let promises = [];

        promises = [
            // Post.countDocuments({}).exec(),
            Store.aggregate([
                {
                    $group: {
                        _id: '$isActive',
                        count: {$sum: 1}
                    }
                }
            ]).exec(),
            Bank.countDocuments({}).exec(),
            UserInfo.countDocuments({}).exec(),
            Invoice.countDocuments({}).exec()
        ];


    //Using Promise for Using ONE Get from DB
    Promise.all(promises).then(([storeCount, bankCount, userCount]) => {
        // console.log(postCount);
        let activeCount = storeCount.find(i => i._id === true);
        let deactiveCount = storeCount.find(i => i._id === false);

        res.render('admin/index', {
            storeCount: (activeCount ? activeCount.count : 0) + (deactiveCount ? deactiveCount.count : 0) ,
            bankCount: bankCount,
            userCount: userCount,
          //  invoiceCount:invoiceCount?invoiceCount:0,
            activeCount: activeCount ? activeCount.count : 0,
            deactiveCount: deactiveCount ? deactiveCount.count : 0
        });

        // Post.countDocuments({}).then(postCount => {
        //     Comment.countDocuments({}).then(commentCount => {
        //         Category.countDocuments({}).then(categoryCount => {
        //             res.render('admin/index', {
        //                 postCount: postCount,
        //                 commentCount: commentCount,
        //                 categoryCount: categoryCount
        //             });
        //         });
        //     });
    });

});
//
// router.post('/generate-fake-posts', (req, res) => {
//     // console.log('Working...');
//     for (let i = 0; i < req.body.amount; i++) {
//
//         const newPost = new Post({
//             user: req.user.id,
//             title: faker.name.title(),
//             slug: faker.name.title(),
//             status: faker.random.arrayElement(['public', 'private', 'draft']),
//             allowComments: faker.random.boolean(),
//             body: faker.lorem.sentence()
//         });
//         newPost.save().then(savedPost => {
//         });
//     }
//
//     res.redirect('/admin/posts');
// });

module.exports = router;