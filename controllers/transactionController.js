// controllers/transactionController.js
const db = require('../models/db');

// Add a new transaction
exports.addTransaction = (req, res) => {
    const { type, category, amount, date, description } = req.body;

    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`, 
        [type, category, amount, date, description], function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            res.status(201).json({ id: this.lastID });
        });
};

// Get all transactions
exports.getTransactions = (req, res) => {
    db.all(`SELECT * FROM transactions`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
};

// Get transaction by ID
exports.getTransactionById = (req, res) => {
    const id = req.params.id;
    db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json(row);
    });
};

// Update transaction
exports.updateTransaction = (req, res) => {
    const id = req.params.id;
    const { type, category, amount, date, description } = req.body;

    db.run(`UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`, 
        [type, category, amount, date, description, id], function(err) {
            if (err) {
                return res.status(400).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ error: "Transaction not found" });
            }
            res.json({ message: "Transaction updated" });
        });
};

// Delete transaction
exports.deleteTransaction = (req, res) => {
    const id = req.params.id;

    db.run(`DELETE FROM transactions WHERE id = ?`, [id], function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        res.json({ message: "Transaction deleted" });
    });
};

// Get summary of transactions
exports.getSummary = (req, res) => {
    db.all(`SELECT type, SUM(amount) AS total FROM transactions GROUP BY type`, [], (err, rows) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        res.json(rows);
    });
};
