
require('dotenv').config();
const dns= require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const mongoose = require('mongoose');

const URL = process.env.MONGO_URI;

console.log("Mongo URI exists:", !!URL);

mongoose.connect(URL)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err.message);
    });

module.exports = mongoose.connection;