const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlug = require('mongoose-url-slugs');
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const InvoiceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userInfos'
    },
    slug: {
        type: String
    },
    store: {
        type: Schema.Types.ObjectId,
        ref: 'stores'
    },
    code: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: 'draft'
    },
    totalPrice: {
        type: SchemaTypes.Double,
        default: 0
    },
    netPrice: {
        type: SchemaTypes.Double,
        default: 0
    },
    decPrice: {
        type: SchemaTypes.Double,
        default: 0
    },
    incPrice: {
        type: SchemaTypes.Double,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now()
    },
    invoiceLines: [{
        type: Schema.Types.ObjectId,
        ref: 'invoiceLines'
    }]
});

InvoiceSchema.plugin(URLSlug('code',{field:'slug'}));
module.exports = mongoose.model('invoices', InvoiceSchema);
