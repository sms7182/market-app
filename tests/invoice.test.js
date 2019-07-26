const request = require('supertest');
const app = require('../src/appCreate');
const Invoice = require('../models/Invoice');
const mongoose = require('mongoose');

beforeEach(async ()=>{
    await Invoice.deleteMany();
});

test('Should Create a new Invoice', async ()=>{
   let result = await request(app).post('/home/invoices/create').send({
        code:'001',
       title:'item1',
       netPrice :10,

    });

    const savedInvoice = await Invoice.findOne({code:'001'});
    expect(savedInvoice).not.toBeNull();
});
