const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlug = require('mongoose-url-slugs');

const BankSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  slug: {
    type: String
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
    type: String
  },
  date:{
    type: Date,
    default: Date.now()
  }
});

BankSchema.plugin(URLSlug('name',{field:'slug'}));
module.exports = mongoose.model('banks',BankSchema);