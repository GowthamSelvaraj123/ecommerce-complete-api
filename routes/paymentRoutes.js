const express = require('express');
const app = express();
const router = express.Router();

const {createPayment, getAllPayments, getPaymentById, deletePayment} =  require("../controller/paymentController");

const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, createPayment);
router.get('/', getAllPayments);
router.get('/:id', getPaymentById);
router.delete('/:id', authMiddleware, deletePayment);

module.exports = router;