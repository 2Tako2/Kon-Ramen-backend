const mongoose = require('mongoose');
const passport = require('passport');
const User = require('../models/User.js');

const register = async(req, res) => {
    User.register(req.body, req.body.password, (err, user) => {
        if (err) {
            res.status(401).send({message: err.message})
        } else {
            passport.authenticate('local')(req, res, () => {
                res.send({
                    _id: user.id,
                    email: user.email,
                    role: user.role
                })
            })
        }
    })
};

const login = async(req, res) => {
    res.status(200).send({
        _id: req.body._id,
        email: req.user.email,
        role: req.user.role
    })

};

const logout = async(req, res) => {
    req.logout()
    res.status(200).send('User logged out')
};

const getUser = async(req, res) => {
    if(req.user) {
        res.status(200).send({
            _id: req.user.id,
            email: req.user.email,
            role: req.user.role
        })
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