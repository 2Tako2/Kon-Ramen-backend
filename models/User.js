const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

// const UserSchema = new Schema({
//     firstName: {
//         type: String,
//         required: [ true, 'User is missing a first name' ]
//     },
//     lastName: {
//         type: String,
//         required: [ true, 'User is missing a last name' ]
//     },
//     password: {
//         type: String,
//         required: [ true, 'User is missing a password' ]
//     },
//     email: {
//         type: String,
//         required: [ true, 'User is missing an email' ]
//     },
//     order: {
//         type: Schema.Types.ObjectId,
//         ref: 'Order'
//     }
// }, {
//     timestamps: true
// });

const UserSchema = new Schema({})

UserSchema.plugin(passportLocalMongoose, {
    passwordValidator: (password, cb) => {
        if(password.length < 6) {
            return cb({message: 'Password must have minimum 6 characters'})
        }
        return cb()
    }
})

module.exports = mongoose.model('User', UserSchema);