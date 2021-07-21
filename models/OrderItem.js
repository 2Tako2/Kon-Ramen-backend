const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    itemId: {
        type: Schema.Types.ObjectId,
        required: [ true, 'Order is missing items'],
        ref: 'Item'
    },
    qty: Number,
    unitPrice: Number
});

module.exports = mongoose.model('Order', OrderSchema);