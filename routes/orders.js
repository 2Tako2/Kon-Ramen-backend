const route = require('express').Router();

router.get('/', getOrders);
router.post('/', postOrder)

module.exports = router;