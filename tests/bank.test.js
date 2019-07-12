const request = require('supertest');
const app = require('../src/appCreate');
const Bank = require('../models/Bank');
const mongoose = require('mongoose');

beforeEach(async ()=>{
    await Bank.deleteMany();
});

test('Should Create a new BANK', async ()=>{
   await request(app).post('/admin/banks/create').send({
        name:'Zirat Bank',
        address:'5Street - No2'
    }).expect(302);
});

test('Should Remove an existing BANK', async ()=>{
    let bankId = new mongoose.Types.ObjectId();
    let bankOne=new Bank({
        _id: bankId,
        name: 'Melli Bank',
        address: 'No12 - 456 Street - Tehran'
    });
    await bankOne.save();

   await request(app).delete(`/admin/banks/${bankId}`)
       .send()
       .expect(302);

    const checkBank = await Bank.findById(bankId);

    expect(checkBank).toBeNull();
});