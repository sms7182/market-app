const app = require('./appCreate');
const port=process.env.PORT || 7575;
console.log(process.env.PORT );
// console.log(process.env.MONGODB_URL);

app.listen(port,()=>{
    console.log('Server is running on 7575');
});