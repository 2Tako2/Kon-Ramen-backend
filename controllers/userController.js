const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User.js');


const register = async(req, res) => {
    console.log('registering')
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

const login = async(req, res) => {
    res.status(200).send({username: req.user.username, _id: req.body._id})

};

const logout = async(req, res) => {
    req.logout()
    res.send(200)
};

const getUser = async(req, res) => {
    if(req.user) {
        res.status(200).send({username: req.user.username, _id: req.user.id})
    } else {
        res.status(401).send('No user cookie was found')
    }
}

module.exports = {
    register,
    login,
    logout,
    getUser
}