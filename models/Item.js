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
        // type: Schema.Types.Decimal128,
        // type: NumberDecimal('0.01'),
        // type: mongoose.Decimal128,
        type: Number,
        required: [ true, 'Item is missing an unit price' ]
    },
    category: {
        type: Schema.Types.ObjectId,
        required: [ true, 'Item is missing a category' ],
        ref: 'Category'
    }
})

ItemSchema.post('save', async (item, next) => {
    const category = await Category.findOne({_id: item.category});
    category.products.push(item._id);
    category.save();
    next();
})

module.exports = mongoose.model('Item', ItemSchema)