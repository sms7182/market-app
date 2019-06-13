'use strict'
let mongoose=require('mongoose');
var Schema=mongoose.Schema;
const ObjectId=Schema.ObjectId;
const InvoiceItem=new Schema({
    creationdate:Date,
    number:String,
    createdby:{
        type:ObjectId,
        ref:'User'
    },
    itemnumber:String,
    quantity:Number,
    price:Number,
    unitprice:Number


});