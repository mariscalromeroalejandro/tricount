const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');

const app = express();

app.use(bodyParser.json());

sequelize.sync({ force: true })
  .then(() => {
    console.log('Tablas sincronizadas con la base de datos SQLite');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
