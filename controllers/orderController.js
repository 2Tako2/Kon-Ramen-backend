const mongoose = require('mongoose');
const Order = require('../models/Order.js');

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate({
            path: "orderItems.orderItem",
            model: "Item"
        });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getOrder = async (req, res) => {
    const {id: _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Cannot find order');
    }
    const order = await Order.findById(_id);
    res.json(order);
}

const createOrder = async (req, res) => {
    const order = new Order(req.body);
    try {
        await order.save();
        res.status(201).json(order).redirect('/');
    } catch (err) {
        console.log(err.message)
        res.status(400).json({message: err.message});
    }
};

const deleteOrder = async (req, res) => {
    const {id: _id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Cannot find order');
    }

    await Order.findByIdAndRemove(_id);
    res.json({message: 'Successfully deleted order'})
};

module.exports = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder
}