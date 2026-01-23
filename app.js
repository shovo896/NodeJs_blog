require('dotenv').config();
const express = require('express');
const expressLayout= require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require('./server/config/db');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

connectDB();




// templating Engine 
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');



app.use('/', require('./server/routes/main'));
app.listen(PORT, () => {
       console.log(`App listening on port ${PORT}`);
});
