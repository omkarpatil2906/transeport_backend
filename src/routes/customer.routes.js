const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer.controller')

router.post('/customer', customerController.createCustomer)
router.get('/customer/list', customerController.getAllCustomersWithAddresses);
router.delete('/customer/:id', customerController.deleteCustomerById);

module.exports=router;