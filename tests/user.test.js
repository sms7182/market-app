const request = require('supertest');
const app = require('../src/appCreate');
const User = require('../models/UserInfo');
const UserStore = require('../models/UserStore');
const Store = require('../models/Store');
const Bank = require('../models/Bank');

beforeEach(async ()=>{
    await User.deleteMany();
    await UserStore.deleteMany();
});

test('Should signup a new User',async ()=>{
    await request(app).post('/userInfos/register').send({
        firstName:'Andrew',
        lastName: 'Mallow',
        nationalityCode:'123456789',
        phoneNumber:'789456',
        email:'andrew@example.com',
        password:'MyPass123',
        passwordConfirm:'MyPass123'
    });
    const savedUser =await User.findOne({email:'andrew@example.com'});
    expect(savedUser).not.toBeNull();
});


test('Should Add a new Store as Favourite', async ()=>{

    let bankOne= new Bank({
        name: 'Melli Bank',
        address: 'No12 - 456 Street - Tehran'
    });
    await bankOne.save();
    let storeOne = new Store({
        name:'Tin Market',
        address:'52 Street-NO23',
        bankAccount : {
            bank: bankOne,
            accountNumber: '123456'
        }
    });
    await storeOne.save();

    let userOne = new User({
        firstName:'Andrew',
        lastName: 'Mallow',
        nationalityCode:'123456789',
        phoneNumber:'789456',
        email:'andrew@example.com',
        password:'MyPass123',
        passwordConfirm:'MyPass123'
    });
    await userOne.save();

    const response = await request(app).post('/home/selectStore').send({
        user: userOne,
        favourites:[{
            rowNumber:1,
            store:storeOne
        }]
    });

    const savedStore =await UserStore.findOne({user:userOne._id});
    expect(savedStore).not.toBeNull();
    expect(savedStore.favourites).not.toBeNull();
    expect(savedStore.favourites.length).equal(1)

});

test('Should Remove a Store from Favourite', async ()=>{

    let bankOne= new Bank({
        name: 'Melli Bank',
        address: 'No12 - 456 Street - Tehran'
    });
    await bankOne.save();
    let storeOne = new Store({
        name:'Tin Market',
        address:'52 Street-NO23',
        bankAccount : {
            bank: bankOne,
            accountNumber: '123456'
        }
    });
    await storeOne.save();

    let userOne = new User({
        firstName:'Andrew',
        lastName: 'Mallow',
        nationalityCode:'123456789',
        phoneNumber:'789456',
        email:'andrew@example.com',
        password:'MyPass123',
        passwordConfirm:'MyPass123'
    });
    await userOne.save();

    let userStoreOne=new UserStore({
        user:userOne,
        favourites:[{
            rowNumber:1,
            store:storeOne
        }]
    });
    await userStoreOne.save();

    const response = await request(app).post('/home/selectStore').send({
        user: userOne,
        favourites:[]
    });

    const savedStore =await UserStore.findOne({user:userOne._id});
    expect(savedStore).not.toBeNull();
    expect(savedStore.favourites).toBeUndefined();

});
