const router = require('express').Router();



// Category routes
const { getCategories, createCategory, updateCategory, deleteCategory } = require('./controllers/categoryController.js');

router.get('/categories/', getCategories);
router.post('/categories/', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);


// Item routes
const { getItems, getItem, createItem, updateItem, deleteItem } = require('./controllers/itemController.js');
const upload = require('./utils/multer.js');

router.get('/items/', getItems);
router.get('/items/:id', getItem);
router.post('/items/', upload.single('thumbnail'), createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);

// Order routes
const { getOrders, getOrder, createOrder, deleteOrder } = require('./controllers/orderController.js');

router.get('/orders/', getOrders);
router.get('/orders/:id', getOrder);
router.post('/orders/', createOrder);
router.delete('/orders/:id', deleteOrder);

// User routes
const { createUser, signIn, signOut, getUser } = require('./controllers/userController.js');
router.get('users/sign_up', createUser);
router.get('users/sign_in', signIn);
router.get('users/sign_out', signOut);
router.get('users/user', getUser);


module.exports = router;