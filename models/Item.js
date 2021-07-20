const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'Item is missing a name' ]
    },
    status: {
        type: Boolean,
        default: false
    },
    description: String,
    unitPrice: {
        // type: Schema.Types.Decimal128,
        // type: NumberDecimal('0.01'),
        // type: mongoose.Decimal128,
        type: Number,
        required: [ true, 'Item is missing an unit price' ]
    },
    category: {
        type: Schema.Types.ObjectId,
        required: [ true, 'Item is missing a category' ],
        ref: 'Category'
    }
})

module.exports = mongoose.model('Item', ItemSchema)