const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'User is missing an email']
    },
    role: {
        type: String,
        default: "member"
    }
}, {
    timestamps: true
});

UserSchema.plugin(passportLocalMongoose, {
    passwordValidator: (password, cb) => {
        if(password.length < 6) {
            return cb({message: 'Password must have minimum 6 characters'})
        }
        return cb()
    },
    usernameField: "email"
})

module.exports = mongoose.model('User', UserSchema);