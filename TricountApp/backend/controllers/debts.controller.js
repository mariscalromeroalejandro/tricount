const DebtsService = require("../services/debts.service");

class DebtsController {
    constructor() {
        this.debtsService = new DebtsService();
    }

    async create(req, res) {
        try {
            const debt = await this.debtsService.createDebt(req.body);
            res.status(201).json(debt);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = DebtsController;