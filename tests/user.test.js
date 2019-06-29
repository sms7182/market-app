const request = require('supertest');
const app = require('../src/appCreate');

test('Should signup a new User',async ()=>{
    await request(app).post('/userInfos/register').send({
        firstName:'Andrew',
        lastName: 'Mallow',
        nationalityCode:'123456789',
        phoneNumber:'789456',
        email:'andrew@example.com',
        password:'MyPass123',
        passwordConfirm:'MyPass123'
    }).expect(201);
});