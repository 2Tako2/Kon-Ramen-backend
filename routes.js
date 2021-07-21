const router = require('express').Router();


// Category routes
const { getCategories, createCategory, updateCategory, deleteCategory } = require('./controllers/categoryController.js');

router.get('/categories/', getCategories);
router.post('/categories/', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory);


// Item routes
const { getItems, createItem, updateItem, deleteItem } = require('./controllers/itemController.js');

router.get('/items/', getItems);
router.post('/items/', createItem);
router.put('/items/:id', updateItem);
router.delete('/items/:id', deleteItem);


// Order routes
const { getOrders, getOrder, createOrder, deleteOrder } = require('./controllers/orderController.js');

router.get('/orders/', getOrders);
router.get('/order/:id', getOrder);
router.post('/order/', createOrder);
router.delete('/orders/', deleteOrder);

module.exports = router;