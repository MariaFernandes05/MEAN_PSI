//modules
var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var compression = require('compression');
var helmet = require('helmet');

var indexRouter = require('./routes/index');
const route = require('./routes/route');

var app = express();

//connect to mongoose
var dev_db_url = 'mongodb://psi019:psi019@localhost:27017/psi019?retryWrites=true&authSource=psi019';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoDB = dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
   
mongoose.connection.on('connected',()=>{
    console.log('Connected to database');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Could not connect to database');
    }
});

const port = 3019;
app.set('port', port);
//add midlleware
app.use(cors());
app.use(bodyparser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(compression()); // Compress all routes

//Static files
app.use(express.static(path.join(__dirname,'public')));

app.use('/', indexRouter);
//routing files
app.use('/route',route);

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
    res.render('error');
  }); 
app.listen(port,()=>{
    console.log("server started at:"+port);
})

module.exports = app;
