const request = require('supertest');
const app = require('../src/appCreate');

test('Should Create a new Store', async ()=>{

   await request(app).post('/admin/stores/create').send({
        name:'Bla Bla Store',
       address:'52 Street-NO23',
       accountNumber: '123456'
       // bank:banks[0]
    }).expect(201);
});