
//just for test and this is working so we should add other model and change that
var Sequelize = require('sequelize');
var sequelize = new Sequelize('TestDB', 'sa', 'sa123',{
    host:'localhost',
    dialect:'mssql'
});
console.log('start user')
var User=require('./models/User');
console.log('define user')
var usr=new User();
usr.AddU(3);
/*var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});*/


/*sequelize.sync().then(function() {
  return User.create({
    id:8,
 
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }));
});*/