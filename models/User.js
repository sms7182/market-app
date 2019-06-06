'use strict'
module.exports=(sequelize,DataTypes)=>{
    var User=sequelize.define('User',{
        userName:DataTypes.STRING,
        mobile:DataTypes.STRING
    });
    return User;
}