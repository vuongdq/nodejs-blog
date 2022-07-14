var express = require("express");
var config = require("config");
var bodyParser = require("body-parser");
var session = require('express-session');
var app = express();
//body parser

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Config express session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'hello',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))
// End Config express session

// Template engine
app.set("views",__dirname+"/apps/views");
app.set("view engine","ejs");
//Static Folder
app.use("/static",express.static(__dirname+"/public"));

var controllers = require(__dirname+"/apps/controllers");
app.use(controllers);
var host = config.get("server.host");
var port = config.get("server.port");

app.listen(port,function () {
    console.log("Server is running on port ",port);
});