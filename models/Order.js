const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    status: {
        type: Boolean,
        default: false
    },
    takeAway: {
        type: Boolean,
        default: true
    },
    pickupTime: {
        type: Date,
        default: Date.now
    },
    instruction: {
        type: String
    },
    UserId: {
        type: String
    },
    subCost: {
        type: NumberDecimal('0.01'),
        required: [ true, 'Order is missing a sub cost']
    },
    serviceCharge: {
        type: NumberDecimal('0.01'),
        default: 0.3
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);