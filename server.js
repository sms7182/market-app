const express=require('express');
const sql=require('mssql');
const app=express();
var fs=require('fs');
var path=require('path');
var Sequelize=require('sequelize');
var config=require(__dirname+'/config/config.js');
var db={};


/*const seq = new Sequelize('TestDB', 'sa', 'sa123', {
    host: 'localhost',
    dialect: 'mssql'// pick one of 'mysql','sqlite','postgres','mssql',
  });*/



var seq=new Sequelize(config.database,config.username,config.password,{host:'localhost',dialect:'mssql'});

fs.readFileSync(__dirname+'/models/').filter(file=>{
    console.log(file);
    //return (file.indexOf('.')!==0)&&(file.slice(-3)==='.js');
})/*.forEach(file=>{
    var model=seq['import'](path.join(__dirname,file));
    console.log(model.name);
    db[model.name]=model;
})*/





/*const config = {
    user: 'sa',
    password: 'sa123',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: 'Implementation3ERPDB',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
app.get('/', function (req, res) {
   
    console.log('connecting');
   

    
    sql.connect(config, function (err) {
    
        if (err) {
            
           return console.log('unable connect to server'+err);
        }

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from gnr.enterprisesubject', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset);
            
        });
    });
});

var server=app.listen(7070,()=>{
    console.log('Server is running');
})*/