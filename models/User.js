const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: [ true, 'User is missing a first name' ]
    },
    lastName: {
        type: String,
        required: [ true, 'User is missing a last name' ]
    },
    password: {
        type: String,
        required: [ true, 'User is missing a password' ]
    },
    email: {
        type: String,
        required: [ true, 'User is missing an email' ]
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);