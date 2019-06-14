const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  icon:{
    type: String
  },
  date:{
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('banks',BankSchema);