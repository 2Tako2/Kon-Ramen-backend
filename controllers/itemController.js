const mongoose = require('mongoose')
const Item = require('../models/Item.js');

const getItems = async (req, res) => {
    try {
        const items = await Item.find().populate('category', 'name');
        res.status(200).json(items);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
};

const getItem = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Cannot find item')
    };

    const item = await Item.findById(_id);
    res.json(item);
}

// const createItem = async (req, res) => {
//     const file = await cloudinary.uploader.upload(req.file.path)
//     Item.create({
//         published: req.body.published,
//         name: req.body.name,
//         unitPrice: req.body.unitPrice,
//         description: req.body.description,
//         imageUrl: file.secure_url,
//         cloudinaryId: file.public_id
//     })
//     .then(item => res.status(201).send(item))
//     .catch(err => res.status(422).send(err))
//    
    //// try {
    ////     await item.save();
    ////     res.status(201).json(item);
    //// } catch (err) {
    ////     res.status(400).json({message: err.message});
    //// }
// };

const updateItem = async (req, res) => {
    const { id: _id } = req.params;
    const item = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Cannot find item');
    };

    const updatedItem = await Item.findByIdAndUpdate(_id, item, { new: true });
    res.json(updatedItem);
};

const deleteItem = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Cannot find item');
    };

    await Item.findByIdAndRemove(_id);
    res.json({message: 'Successfully deleted item'});
};

module.exports = {
    getItems,
    getItem,
    // createItem,
    updateItem,
    deleteItem
}