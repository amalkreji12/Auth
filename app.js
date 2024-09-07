const express = require('express');
const hbs = require('hbs');
const path = require('path');
const session = require('express-session');
const nocache = require('nocache');
const db = require('./config/connection');


var userRoutes = require('./routes/user');
var adminRoutes = require('./routes/admin');


db.connectToDatabase();
const app = express();

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','hbs');
app.use(session({
    secret:'key',
    resave:false,
    saveUninitialized:true
}));
app.use(nocache());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/',userRoutes);
app.use('/admin',adminRoutes);







app.listen(3000,()=>console.log("Server running on port 3000"));
