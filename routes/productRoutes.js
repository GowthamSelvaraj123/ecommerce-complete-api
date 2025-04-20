const express = require('express');
const app = express();
const router = express.Router();

const{addProduct, editProduct, getProduct, deleteProduct} = require('../controller/productController');
const authMiddleware = require('../middleware/authMiddleware');
router.post('/', authMiddleware, addProduct);
router.get('/', getProduct);
router.put('/:id', authMiddleware, editProduct);
router.delete('/:id', authMiddleware, deleteProduct);
module.exports = router;