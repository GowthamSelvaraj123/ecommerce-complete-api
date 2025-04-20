const express = require('express');
const app = express();
const router = app.router();
const {addOrder, editOrder, deleteOrder, getOrder} = require('../controller/orderController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/', authMiddleware, addOrder);
router.get('/', getOrder);
router.put('/:id', authMiddleware, editOrder);
router.delete('/:id', authMiddleware, deleteOrder);

module.exports= router;