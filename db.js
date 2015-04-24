var Sequelize = require('Sequelize');
var sequelize = new Sequelize('test', 'tsari', '123456', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  
});

module.exports = sequelize;