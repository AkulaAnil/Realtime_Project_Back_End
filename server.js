require('dotenv').config();
const chalk = require("chalk");
const express = require('express');
const error_handler = require('./Utils/errors_handler');
const DB_Connection = require('./Config/db_connection');
const userRoutes = require('./Routes/userRoutes');

const app = express();
const port = process.env.PORT || 8080;

const allowCrossDomain = (req, res, next) => {
    res.header(`Access-Control-Allow-Origin`, `*`);
    res.header(`Access-Control-Allow-Methods`, `GET,PUT,POST,DELETE`);
    res.header(`Access-Control-Allow-Headers`, `*`);
    next();
};

DB_Connection();

app.use(express.json());
app.use(allowCrossDomain);

app.use('/users', userRoutes);

app.use(error_handler);

app.listen(port, () => {
    console.log(chalk.blue.inverse.italic(`Server listening on ${port}`));
});