var express = require('express');
var todoController = require('./controller/todoController');
var app = express();

// setup template engine (ejs) 
app.set('view engine','ejs');

// static files
app.use(express.static('./public'));

//fire controller
todoController(app);

// listen to port
app.listen(3000);
console.log('server running on port');
