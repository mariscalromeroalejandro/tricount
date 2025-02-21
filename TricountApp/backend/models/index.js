const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/database');  // Importar configuración de base de datos

const env = process.env.NODE_ENV || 'development'; // 'development' es el valor por defecto
const configDB = config[env];

const sequelize = new Sequelize(configDB.database, configDB.username, configDB.password, {
  dialect: configDB.dialect,
  storage: configDB.storage, // Especifica la ruta al archivo de la base de datos
  logging: configDB.logging, // Activar o desactivar los logs de Sequelize
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión a SQLite establecida correctamente');
  })
  .catch((error) => {
    console.error('No se pudo conectar a SQLite:', error);
  });

const Debt = require('./debt')(sequelize, DataTypes);
const Expense = require('./expense')(sequelize, DataTypes);
const ExpenseParticipant = require('./expenseParticipant')(sequelize, DataTypes);
const Group = require('./group')(sequelize, DataTypes);
const GroupMember = require('./groupMember')(sequelize, DataTypes);
const Transaction = require('./transaction')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);

User.hasMany(Group, { foreignKey: 'creator_id' });
User.belongsToMany(Group, { through: GroupMember, foreignKey: 'user_id' });
User.hasMany(Expense, { foreignKey: 'payer_id' });
User.hasMany(Transaction, { foreignKey: 'emisor_id' });
User.hasMany(Transaction, { foreignKey: 'receptor_id', as: 'ReceivedTransactions' });

Group.belongsTo(User, { foreignKey: 'creator_id' });
Group.belongsToMany(User, { through: GroupMember, foreignKey: 'group_id' });
Group.hasMany(Expense, { foreignKey: 'group_id' });
Group.hasMany(Transaction, { foreignKey: 'group_id' });
Group.hasMany(Debt, { foreignKey: 'group_id' });

GroupMember.belongsTo(User, { foreignKey: 'user_id' });
GroupMember.belongsTo(Group, { foreignKey: 'group_id' });

Expense.belongsTo(Group, { foreignKey: 'group_id' });
Expense.belongsTo(User, { foreignKey: 'payer_id' });
Expense.hasMany(ExpenseParticipant, { foreignKey: 'expense_id' });
Expense.hasMany(Transaction, { foreignKey: 'expense_id' });

ExpenseParticipant.belongsTo(User, { foreignKey: 'user_id' });
ExpenseParticipant.belongsTo(Expense, { foreignKey: 'expense_id' });

Transaction.belongsTo(User, { foreignKey: 'emisor_id' });
Transaction.belongsTo(User, { foreignKey: 'receptor_id', as: 'Receptor' });
Transaction.belongsTo(Expense, { foreignKey: 'expense_id' });
Transaction.belongsTo(Group, { foreignKey: 'group_id' });

Debt.belongsTo(Group, { foreignKey: 'group_id' });
Debt.belongsTo(User, { foreignKey: 'debtor_id' });
Debt.belongsTo(User, { foreignKey: 'creditor_id', as: 'Creditor' });

module.exports = { sequelize, DataTypes };
