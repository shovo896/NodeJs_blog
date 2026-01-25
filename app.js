require('dotenv').config();
const express = require('express');
const expressLayout= require('express-ejs-layouts');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./server/config/db');
const cookieParser = require('cookie-parser');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const methodOverride = require('method-override');
const {isActive} = require('./server/helpers/routeHelpers');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

connectDB();


app.use(session({
       secret: process.env.SESSION_SECRET || 'change_this_secret',
       resave: false,
       saveUninitialized: false,
       store: new MongoStore({
              mongoUrl: process.env.MONGODB_URI
       }),
       cookie: {
              maxAge: 1000 * 60 * 60 * 24
       }
}));



// templating Engine 
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');



app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));






app.listen(PORT, () => {
       console.log(`App listening on port ${PORT}`);
});
