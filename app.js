const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/covid19", { useNewUrlParser: true });

const db = mongoose.connection;

db.once("open", () => console.log("db is on"));

const app = express();

app.get("/", (req, res) => res.send("Hi! Everyone"));

app.listen(3000, console.log("Server is starting at port :", 3000));
