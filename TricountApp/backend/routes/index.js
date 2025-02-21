const express = require('express');
const usersRoutes = require('./users.routes.js');
const expensesRoutes = require('./expenses.routes.js');

const router = express.Router();

// router.use('/users', usersRoutes);
// router.use('/expenses', expensesRoutes);

module.exports = router;
