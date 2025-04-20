const express = require('express');
const app = express();
const router = express.Router();
const {addCart, getCart, updateCart, deleteCart} = require('../controller/cartController');

router.post('/', addCart);
router.get('/', getCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

module.exports = router;