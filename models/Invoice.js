
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlug = require('mongoose-url-slugs');

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
        required: true
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
        rowOrder: {
            type: Int32Array
        },
        code: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        quantity: {
            type: Int32Array
        },
        price: {
            type: SchemaTypes.Double
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
        }

    }]

});

InvoiceSchema.plugin(URLSlug('code',{field:'slug'}));
module.exports = mongoose.model('invoices', InvoiceSchema);
