const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User.js');


const createUser = async(req, res) => {
    User.register(req.body, req.body.passport, (err, user) => {
        if (err) {
            res.status(401).send({message: err.message})
        } else {
            passport.authenticate('local')(req, res, () => {
                res.send({_id: user.id, username: user.username})
            })
        }
    })
};

const signIn = async(req, res) => {
    res.status(200).send({username: req.user.username, _id: req.body._id})

};

const signOut = async(req, res) => {
    req.logout()
    res.send(200)
};

const getUser = async(req, res) => {
    if(req.user) {
        res.status(200).send({username: req.user.username, _id: req.user.id})
    } else {
        res.status(401).send('Cannot login user account')
    }
}

module.exports = {
    createUser,
    signIn,
    signOut,
    getUser
}