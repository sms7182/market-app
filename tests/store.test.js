const request = require('supertest');
const app = require('../src/appCreate');
const Store = require('../models/Store');
const Bank = require('../models/Bank');

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

   await request(app).post('/admin/stores/create').send({
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
    }).expect(201);
});