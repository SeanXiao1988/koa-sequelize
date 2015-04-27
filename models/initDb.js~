'use strict';

var models = require('./');

models.sequelize.sync({force: true})
.then(function() {
    models.User.create({
      firstName: 'John',
      lastName: 'Hancock',
      emailAddress: 'a@a.com'
    });        
    console.log('[models/initDb.js] sequelize sync success');
})
  .catch(function(err) {
    console.error('[models/initDb.js] sequelize sync fail');
    console.error(err);
    process.exit(1);
  });
  
