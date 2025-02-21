const Debt = require('../models/debt.model');

class DebtRepository {
    async create(debt) {
        return Debt.create(debt);
    }
}

module.exports = DebtRepository;