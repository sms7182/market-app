const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlug = require('mongoose-url-slugs');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const InvoiceLineSchema=new Schema({
    rowOrder:{
        type:Number,
    },
    code:{
        type:String
    },
    title:{
        type:String
    },
    netPrice:{
        type:SchemaTypes.Double
    },
    incPrice:{
        type:SchemaTypes.Double
    },
    decPrice:{
        type:SchemaTypes.Double
    },
    totalPrice:{
        type:SchemaTypes.Double
    },
    date:{
        type:Date,
        default:Date.now()
    },
    invoice: {
        type: Schema.Types.ObjectId,
        ref: 'invoice'
    }
});

module.exports = mongoose.model('invoiceLines', InvoiceLineSchema);