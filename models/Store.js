const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  address:{
    type: String,
    required: true
  },
  bankAccount:{
    bank: {
      type: Schema.Types.ObjectId,
      ref: 'banks',
      required: true
    },
      accountNumber:{
        type: String,
        required: true
      },
  },
  phoneNumbers:[{
      main:{
          type: Boolean,
          required: true
      },
      title:{
          type: String,
          required: true
      },
      phoneNumber:{
          type: String,
          required: true}
  }],
  emails:[{
      main:{
        type: Boolean,
        required: true
      },
     title:{
        type: String,
        required: true
        },
     email:{
        type: String,
        required: true
        }

  }],
  password:{
    type: String,
    required: true
  },
    isActive: {
        type: Boolean,
        default: true
    },
  date:{
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('stores',StoreSchema);