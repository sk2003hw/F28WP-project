/* this file is used for the server part of the game*/
const express = require('express');
const app = express();
var username;
var password;
const http = require('http');
const server = http.createServer((request, response) => {
    if (request.url === '/') {
        response.write("Hello");
        response.write("Restarting server");
        response.end();}});

app.use(express.static('client'));
app.get('/' , function(request,response) {
    response.sendFile({root: __dirname} + '/client/index.html')});


var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connecting to the database")
    con.query("CREATE DATABASE database", function(err, result){
        if (err) throw err;
        console.log("Created the Database");
    }
)})
