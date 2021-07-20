const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    completed: {
        type: Boolean,
        required: [ true, 'Order is missing a completed status'],
        default: false
    },
    takeAway: {
        type: Boolean,
        required: [ true, 'Order is missing a take away status'],
        default: true
    },
    pickupTime: {
        type: Date,
        required: [ true, 'Order is missing a pickup time'],
        default: new Date()
    },
    instruction: {
        type: String
    },
    orderItems: [
        {
            type: Schema.Types.ObjectId,
            required: [ true, 'Order is missing items'],
            ref: 'Item'
        }
    ],
    UserId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    subCost: {
        type: Number,
        required: [ true, 'Order is missing a sub cost']
    },
    serviceCharge: {
        type: Number,
        required: [ true, 'Order is missing a service charge'],
        default: 0.3
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', OrderSchema);