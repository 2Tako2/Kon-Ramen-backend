const router = require('express').Router();



// Category routes
const { getCategories, createCategory, updateCategory, deleteCategory } = require('./controllers/categoryController.js');

router.get('/categories/', getCategories);
router.post('/categories/', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);


// Item routes
const { getItems, getItem, createItem, updateItem, deleteItem } = require('./controllers/itemController.js');


router.get('/items/', getItems);
router.get('/items/:id', getItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////
const upload = require('./utils/multer.js');
const cloudinary = require('./utils/cloudinary.js');
router.post('/items/', upload.single('thumbnail'), async (req, res) => {
    const file = await cloudinary.uploader.upload(req.file.path)
    console.log(file)
    console.log(req.body)
    Item.create({
        published: req.body.published,
        name: req.body.name,
        unitPrice: req.body.unitPrice,
        description: req.body.description,
        imageUrl: file.secure_url,
        cloudinaryId: file.public_id
    })
    .then(item => res.status(201).send(item))
    .catch(err => res.status(422).send(err))
});
//////////////////////////////////////
//////////////////////////////////////
//////////////////////////////////////

// Order routes
const { getOrders, getOrder, createOrder, deleteOrder } = require('./controllers/orderController.js');

router.get('/orders/', getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders/', createOrder);
router.delete('/orders/:id', deleteOrder);

module.exports = router;