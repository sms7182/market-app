const express=require('express');
const sql=require('mssql');
const app=express();
const config = {
    user: 'sa',
    password: 'sa123',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: '',
 
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}
app.get('/',(req,res)=>{
    
async () => {
    try {
        let pool = await sql.connect(config)
        console.log('connected');
        let result1 = await pool.request().query('select * from gnr.EnterpriseSubject')
       res.send(result1);
    } catch (err) {
        console.log(err);
        sql.close();
    }
}  

 
    sql.close();
    
});

var server=app.listen(7070,()=>{
    console.log('Server is running');
})