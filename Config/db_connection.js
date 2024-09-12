const { default: chalk } = require("chalk");
const mongoose = require('mongoose');

const DB_Connection = () => {
    try {
        mongoose.connect(process.env.CONNECTION_URL);
        console.log(chalk.blue.inverse.bold("Server Connected to DB Successfully..."));
    } catch(error) {
        console.log(chalk.red.bold(error));
    }
}

module.exports = DB_Connection;