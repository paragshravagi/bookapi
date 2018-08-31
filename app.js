var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;

if(process.env.NODE_ENV == 'Test')
    db = mongoose.connect('mongodb://localhost/libraryApp_Test');
else
    db = mongoose.connect('mongodb://localhost/libraryApp');

console.log('ENV is set to ' + process.env.NODE_ENV);

var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./Routes/bookRoutes')(Book);
app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API!');
});

app.listen(port, function () {
    console.log('Gulp is running my app on port : ' + port);
});

module.exports = app;