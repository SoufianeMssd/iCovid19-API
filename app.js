const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

mongoose.connect("mongodb://localhost/covid19", { useNewUrlParser: true }, () => console.log("DB is ON"));

const db = mongoose.connection;

app.use(morgan('dev', {
    skip: function (req, res) { return res.statusCode < 400 }
}));


const app = express();

app.get("/", (req, res) => res.send("Hi! Everyone"));

app.listen(3000, console.log("Server is starting at port :", 3000));
