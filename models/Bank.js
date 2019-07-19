const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BankSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  icon:{
    type: Buffer
  },
  date:{
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('banks',BankSchema);