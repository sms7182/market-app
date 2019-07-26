const request = require('supertest');
const app = require('../src/appCreate');
const Store = require('../models/Store');
const Bank = require('../models/Bank');
const mongoose = require('mongoose');

let bankOne={
    name: 'Melli Bank',
    address: 'No12 - 456 Street - Tehran'
};

beforeEach(async ()=>{
    await Store.deleteMany();
    bankOne = new Bank(bankOne);
    await bankOne.save();
});

test('Should Create a new Store', async ()=>{

   const response = await request(app).post('/admin/stores/create').send({
        name:'Bla Bla Store',
       address:'52 Street-NO23',
       accountNumber: '123456',
        bank:bankOne,
       phoneNumbers:[{
            main:true,
           title:'Office',
           phoneNumber:'123456'
       },{
            main:false,
           title:'Customer Service',
           phoneNumber:'654321'
       }],
       emails:[
           {
               main:true,
               title:'Office',
               email:'BlaBlaStore@example.com'
           },{
               main:false,
               title:'Customer Service',
               email:'BlaBlaService@example.com'
           }
       ]
    });

   const savedStore =await Store.findOne({name:'Bla Bla Store'});
       expect(savedStore).not.toBeNull();

});


test('Should Remove an existing Store', async ()=>{
    let storeId = new mongoose.Types.ObjectId();
    let storeOne=new Store({
        _id: storeId,
        name:'Bla Bla Store',
        address:'52 Street-NO23',
        bankAccount : {
            bank: bankOne,
            accountNumber: '123456'
        }
    });
    await storeOne.save();

    await request(app).delete(`/admin/stores/${storeId}`)
        .send();

    const checkStore = await Store.findById(storeId);
    expect(checkStore).toBeNull();
});