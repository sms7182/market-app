'use strict';
var Sequelize=require('sequelize');
var sequelize=new Sequelize('TestDB','sa','sa123',{
  host:'localhost',
  dialect:'mssql'
})

module.exports=function(){
  var User= sequelize.define('user',{username: Sequelize.STRING});
  
sequelize.sync().then(function() {
  return User.create({
    username:'sdd',
 
  });
}).then(function(jane) {
  console.log(jane.get({
    plain: true
  }));
});
User.AddU=function(idd){
 User.id=idd;
}
  return User;
}
