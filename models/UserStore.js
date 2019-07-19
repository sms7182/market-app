const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserStoreSchema = new Schema({
    user: {
            type: Schema.Types.ObjectId,
            ref: 'userInfos',
            required: true
        },
    favourites:[{
        rowNumber:{
                type:Number
            },
        store: {
            type: Schema.Types.ObjectId,
            ref: 'stores',
            required: true
        },
        date:{
            type: Date,
            default: Date.now()
        }
    }]

});

module.exports = mongoose.model('userStores',UserStoreSchema);
