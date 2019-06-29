const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserInfoSchema = new Schema({
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  nationalityCode:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  bankHistories:[{
    bank: {
      type: Schema.Types.ObjectId,
      ref: 'banks'
    },
    accountNumber:{
      type: String,
      required: true
    }
  }],
  date:{
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('userInfos',UserInfoSchema);