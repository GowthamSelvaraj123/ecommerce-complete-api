const Payment = require("../models/paymentModel");

const createPayment = async (req, res) => {
try{
    const {user, cart, amount, currency, status, paymentMethod, transactionId, paidAt, createdAt} = req.body;
    if(!user || !amount || !paymentMethod)
    {
        return res.status(400).json({message:"The field is required"});
    }
    const addPayment = await Payment.save();
    return res.status(201).json({message:"Payment Added Successfully", data:addpayment});
}
catch(err) {
  console.log("Error Creating Payment", err);
  return res.status(500).json({message:"Internal Server Error"});
}
}
const getAllPayments = async (req, res) => {
try{
        const payments = await Payment.find().populate('users').populate('carts');
        return res.status(200).json(payments);
}
catch(err)
{
        console.log("Not get all payments", err);
        return res.status(500).json({message:"Internal Server Error"});
}
}
const getPaymentById = async (req, res) => {
try
{
    const {id} = req.params;
    const payment = await Payment.find(id).populate('users').populate('carts');
    if(!payment)
    {
        return res.status(404).json({message:"Payment Not Found"});
    }
    return res.status(200).json(payment);
}
catch(err)
{
        console.log("Error payment id", err);
        return res.status(500).json("Internal Server Error");
}
}
const deletePayment = async (req, res) => {
try
{
    const {id} = req.params;
    const deletePayment = await Payment.findByIdAndDelete(id);
    if(!deletePayment)
    {
        return res.status(500).json({message:"This payment not found"});
    }
    return res.status(200).json({message:"The Payment Delete Successfully"});
}
catch(err)
{
    console.log(err);
    return res.status(500).json({message:"Internal Server Error"});
}
}

module.exports = {createPayment, getAllPayments, getPaymentById, deletePayment};
