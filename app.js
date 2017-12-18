"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);
app.set('views', require('path').join(__dirname, 'views'));
app.use(express.static(require('path').join(__dirname, 'public')));



app.use(session({
    secret: 'secret',
    cookie: {
        maxAge: 1000*60*30
    },
    resave: true,
    saveUninitialized: false
}));

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    console.log(req.session);
    if(err) res.locals.message = '<div class="danger">' + err + '</div>';
    next();
});

require('./routes')(app);


app.listen(8080);