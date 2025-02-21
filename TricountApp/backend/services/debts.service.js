const { Debt } = require('../models'); // Adjust the path to your models as necessary
const DebtRepository = require('../repositories/debt.repository');

class DebtsService {
    constructor() {
        this.debtRepository = new DebtRepository();
    }
    async createDebt(debt) {
        //TODO: Check if duplicate debt exists
        const newDebt = await debtRepository.create(debt);
        return newDebt;
    }
}

module.exports = DebtsService;