const https=require('https');
const fs= require('fs');
const path=require('path');
const app = require('./appCreate');
const port=process.env.PORT || 7575;
console.log(process.env.PORT );
console.log(process.env.MONGODB_URL);

const options = {
    key:fs.readFileSync(path.join(__dirname, '../config/marketApp-key.pem')),
    cert:fs.readFileSync(path.join(__dirname, '../config//marketApp-chain.pem'))
};

// app.listen(port,()=>{
//     console.log('Server is running on 7575');
// });

https.createServer(options,app).listen(port);