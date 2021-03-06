const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Category = require('./Category.js');


const ItemSchema = new Schema({
    name: {
        type: String,
        required: [ true, 'Item is missing a name' ]
    },
    published: {
        type: Boolean,
        default: false
    },
    description: String,
    unitPrice: {
        type: Number,
        required: [ true, 'Item is missing an unit price' ]
    },
    category: {
        type: Schema.Types.ObjectId,
        required: [ true, 'Item is missing a category' ],
        ref: 'Category'
    },
    thumbnailUrl: String,
    cloudinaryId: String
})

ItemSchema.post('save', async (item, next) => {
    const category = await Category.findOne({_id: item.category._id});
    category.items.push(item._id);
    category.save();
    next();
})

module.exports = mongoose.model('Item', ItemSchema)