const express = require('express');
const app =express();
const morgan = require('morgan');

const env = require('./config/env');

const path = require('path');
const port = env.port;
const db = require('./config/mongo');
const fs = require('fs');
const rfs = require('rotating-file-stream');

const bodyParser = require('body-parser');


app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies


//Setting up cookies
const cookieParser = require("cookie-parser");

// static files

//express.static('/static');
app.use('/static', express.static(path.join(__dirname, env.asset_path)));



// express layouts
const expresslayouts= require('express-ejs-layouts');
app.use(expresslayouts);

//const accessLogStream = fs.createWriteStream("./production_logs/access.log", {flags: 'a'});
const logDirectory = path.join(__dirname, './production_logs');
    fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory,
});
        app.use(morgan({stream: accessLogStream}));


//For session cookies
const session =require('express-session');
const passport=require('passport');
const passportLocal =require('./config/passport_Stratagy');
const MongoStore = require('connect-mongo');
// extract style and scripts for layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

const csv = require('csv-parser');

//expression session
app.use(
  session({
    name:'placement',
    secret:env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: new MongoStore({
      mongoUrl:env.db,
      mongooseConnection:db,
      autoRemoval:'disabled'
    },function(err){
      if(err){
      console.log(err,'error in mongostore')}
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(cookieParser());
app.use('/', require('./route'));


  app.listen(port, () => {
    console.log(`app listening on port`,port)
  })