module.exports = (sequelize, DataTypes) => {
    const Debt = sequelize.define('Debt', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        debtor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        creditor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        group_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                min: {
                    args: [0],
                    msg: 'Amount must be greater than 0',
                }
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: true,
        validate: {
            debtorAndCreditorAreDifferent() {
                if (this.debtor_id === this.creditor_id) {
                    throw new Error('Debtor and creditor must be different');
                }
            }
        }
    }
    
    );
    return Debt;
  };