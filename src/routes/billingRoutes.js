const express = require('express');
const router = express.Router();
const billingController = require('../controllers/billingController');

// Generate a new bill
router.post('/generate', billingController.generateBill);

// Process payment
router.post('/payment', billingController.processPayment);

// Get all bills
router.get('/', billingController.getBillDetails);

// Get bill by ID
router.get('/:id', billingController.getBillDetails);

module.exports = router;
