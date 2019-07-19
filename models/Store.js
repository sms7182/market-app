const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlug = require('mongoose-url-slugs');

const StoreSchema = new Schema({
  name:{
    type: String,
    required: true
  },
    slug: {
        type: String
    },
  address:{
    type: String,
    required: true
  },
  bankAccount:{
    bank: {
      type: Schema.Types.ObjectId,
      ref: 'banks',
      required: false
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

StoreSchema.plugin(URLSlug('name',{field:'slug'}));
module.exports = mongoose.model('stores',StoreSchema);