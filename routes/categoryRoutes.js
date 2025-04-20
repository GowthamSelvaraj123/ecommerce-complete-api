const express = require("express");
const app = express();
const router = express.Router();

const {addCategory, editCategory, deleteCategory, getCategory} = require('../controller/categoryController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, addCategory);
router.get('/', getCategory);
router.put('/:id', authMiddleware, editCategory);
router.delete('/:id', authMiddleware, deleteCategory);
module.exports = router;