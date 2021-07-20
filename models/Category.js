const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: {
        type: String,
        required: [ true, "Category is missing a name"]
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
});

module.exports = mongoose.model('Category', CategorySchema);

// const CategoryModal = mongoose.model("Category", CategorySchema);
// module.exports = {
//     CategorySchema,
//     CategoryModal
// }