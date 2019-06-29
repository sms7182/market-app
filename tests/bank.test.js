const request = require('supertest');
const app = require('../src/appCreate');

test('Should Create a new BANK', async ()=>{
   await request(app).post('/admin/banks/create').send({
        name:'Zirat Bank',
        address:'5Street - No2'
    }).expect(201);
});