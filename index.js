// third party modules
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');

// internal modules
var mainCtrl = require('./controllers/main_ctrl');
var middleware = require('./controllers/middleware');

// create app
var app = express();

// inject middleware
app.use(middleware.addHeaders);

app.use(session({
  secret: "jas76-dmdla8A-JdnA8", // used to uniquely encrypt/decrypt token ids for security
  saveUninitialized: true, // save a new key/val session pair for every request that doesn't already exist
  resave: true // saves the session, even without any requests
}));

app.use(function(req, res, next) {
  console.log(req.session);
  next();
});

// ^ adds all data retrieved for session onto req.session before going to next() function

app.use(bodyParser.json());

// port for server to listen on
var port = 9000;

// start server, listening on port
app.listen(port, function() {
  console.log('Listening on port', port);
});

app.post('/cart', function(req, res, next) {
  // initially, req.session = {};
  if (!req.session.cart) { // if cart obj exists
    req.session.cart = [];
  }
  req.session.cart.push(req.body);
  res.json(req.session.cart);
});

// write handlers for each method/route combo
app.get('/myinfo', mainCtrl.index);
app.get('/:prop', mainCtrl.show);
app.get('/family/:age', mainCtrl.filter);
app.post('/myinfo', mainCtrl.create);
app.post('/:prop', mainCtrl.create);
app.put('/myinfo', mainCtrl.update);
app.delete('/myinfo/:prop', mainCtrl.destroy);
