
//just for test and this is working so we should add other model and change that
var Sequelize = require('sequelize');
var sequelize = new Sequelize('TestDB', 'sa', 'sa123',{
    host:'localhost',
    dialect:'mssql'
});

var User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe',
    birthday: new Date(1980, 6, 20)
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }));
});