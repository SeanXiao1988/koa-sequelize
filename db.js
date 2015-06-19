var Sequelize = require('sequelize');
var sequelize = new Sequelize('therealfaces', 'therealfaces', '1', {
  host: 'localhost',
  dialect: 'postgresql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  //storage: 'test.sqlite',
  
});

module.exports = sequelize;
