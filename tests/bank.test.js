const request = require('supertest');
const app = require('../src/appCreate');
const Bank = require('../models/Bank');

beforeEach(async ()=>{
    await Bank.deleteMany();
});

test('Should Create a new BANK', async ()=>{
   await request(app).post('/admin/banks/create').send({
        name:'Zirat Bank',
        address:'5Street - No2'
    }).expect(201);
});