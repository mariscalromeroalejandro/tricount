//model for expenseParticipant: id, expense_id, user_id, amount_debt, status
module.exports = (sequelize, DataTypes) => {
    const ExpenseParticipant = sequelize.define('ExpenseParticipant', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        expense_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount_debt: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
    return ExpenseParticipant;
  };