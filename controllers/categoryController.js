const mongoose = require('mongoose');
const Category = require('../models/Category.js');

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('item', 'name');
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const createCategory = async (req, res) => {
    const category = req.body;
    const newCategory = new Category(category);
    
    try {
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateCategory = async (req, res) => {
    const { id: _id } = req.params;
    const category = req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Cannot find category');
    };

    const updatedCategory = await Category.findByIdAndUpdate(
        _id,
        category,
        { new: true }
    );
    res.json(updatedCategory);
};

const deleteCategory = async (req, res) => {
    const { id: _id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Cannot find category');
    };
    await Category.findByIdAndRemove(_id);
    res.json({ message: 'Successfully deleted category'});
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
}