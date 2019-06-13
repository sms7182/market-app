'use strict'
let mongoose=require('mongoose');
var Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const Invoice=new Schema({
    creationdate:Date,
    number:String,
    createdby:{
        type:ObjectId,
        ref:'User'
    },
    totalprice:Number,
    invoiceitems:[{type:ObjectId,ref:'InvoiceItem'}]
});