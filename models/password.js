var Sequelize = require('sequelize');

module.exports = function(sequelize, Sequelize){
    return sequelize.define('password',{
      content: {
        type: Sequelize.STRING    
      }         
    });    
}



