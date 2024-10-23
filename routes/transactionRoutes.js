// routes/transactionRoutes.js
const express = require('express');
const {
    addTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getSummary
} = require('../controllers/transactionController');

const router = express.Router();

// Define the API endpoints
router.post('/transactions', addTransaction);
router.get('/transactions', getTransactions);
router.get('/transactions/:id', getTransactionById);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);
router.get('/summary', getSummary);

module.exports = router;
