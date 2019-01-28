require( './init/drop-db.js' );
require( './init/db.js' );
var createError = require('http-errors');

var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var swaggerJSDoc = require('swagger-jsdoc');

var quotesRouter = require('./routes/quotes');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

var app = express();

// swagger definition
var swaggerDefinition = {
    info: {
        title: 'Node Swagger API',
        version: '1.0.0',
        description: 'Demonstrating how to describe a RESTful API with Swagger',
    },
    host: 'localhost:8083',
    basePath: '/',
};
// options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./**/routes/*.js','routes.js'],// pass all in array 
};
// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec); });


app.use('/quotes', quotesRouter);
app.use('/register', registerRouter);
app.use('/login',loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});


const port = process.env.PORT || 8083;

app.listen( port, function( error ) {
    if( error ) {
        console.log( 'error starting server' );
        return;
    }

    console.log( 'Check http://localhost:8083/' );
});

module.exports = app;
