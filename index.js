/**
 * Module dependencies.
 */
var logger = require('koa-logger');
var route = require('koa-route');
var views = require('co-views');
var parse = require('co-body');
var koa = require('koa');

var models = require('./models');

var app = koa();



// "data store"
var todos = []; //To Do : DB change to MongoDB

// middleware
app.use(logger());

// route middleware
app.use(route.get('/', list));
app.use(route.get('/user/new', add));
app.use(route.get('/user/:id', show));
app.use(route.get('/user/delete/:id', remove));
app.use(route.get('/user/edit/:id', edit));
app.use(route.post('/user/create', create));
app.use(route.post('/user/update', update));

//Specifying Swig view engine
var render= views(__dirname + '/views', { map: { html: 'swig' }});

// route definitions

/**
 * user item List.
 */
function *list() {
   
  var users = yield models.User.getAll();     
  this.body = yield render('index', { users: users });
}

/**
 * Form for create new user item.
 */
function *add() {
  this.body = yield render('new');
}

/**
 * Form for edit a user items.
 */
function *edit(id) {
    var user = todos[id];
    if (!user) this.throw(404, 'invalid user id');
    this.body = yield render('edit', { user: user });
}

/**
 * Show details of a user item.
 */

function *show(id) {  
  var user = yield models.User.findById(id);  
  if (!user) this.throw(404, 'invalid user id');
  this.body = yield render('show', { user: user });
}

/**
 * Delete a user item
 */
function *remove(id) {
    var user = todos[id];
    if (!user) this.throw(404, 'invalid user id');
   todos.splice(id,1);
    //Changing the Id for working with index
    for (var i = 0; i < todos.length; i++)
    {
        todos[i].id=i;
    }
    this.redirect('/');
}

/**
 * Create a user item into the data store.
 */
function *create() {
  var user = yield parse(this);
  user.createdAt = new Date;
  user.updatedAt = new Date;
  
  yield models.User.add(user);  
 
  this.redirect('/');
}

/**
 * Update an existing user item.
 */
function *update() {
    var user = yield parse(this);
    var index=user.id;
    todos[index].name=user.name;
    todos[index].description=user.description;
    todos[index].updated_on = new Date;
    this.redirect('/');
}

// http server listening
app.listen(3000);
console.log('listening on port 3000');