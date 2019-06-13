'use strict';
let mongoose=require('mongoose');
var Schema=mongoose.Schema;
var 
const User=new Schema({
  password:String,
  creationdate:Date,
  mobile:String,
  email:String
})