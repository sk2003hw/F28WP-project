/* this file is used for the server part of the game*/
const express = require('express');
const app = express();
var username;
var password;
const path = require('path');
const http = require('http');
const socketIO = require('socket.io')
const server = http.createServer((request, response) => {
    if (request.url === '/') {
        response.write("Hello");
        response.write("Restarting server");
        response.end();}});

app.use(express.static('client'));
app.get('/' , function(request,response) {
    response.sendFile({root: __dirname} + '/client/index.html')});


var mysql = require('mysql');
const { urlencoded } = require('express');
const { createConnection } = require('net');
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
    })})

app.post('/auth' , urlencodedParser, function(request,response){
    username = request.body.user;
    password = request.body.pass;
    username = username.replace("@","");
    username = username.replace(";","");
    username = username.replace("!","");
    username = username.replace("","");
    username = username.replace("#","");
    username = username.replace("$","");
    username = username.replace("%","");
    username = username.replace("^","");
    username = username.replace("*","");
    username = username.replace("&","");
    username = username.replace("(","");
    username = username.replace(")","");
    username = username.replace("=","");
    username = username.replace("{","");
    username = username.replace("}","");
    username = username.replace(">","");
    username = username.replace(":","");
    username = username.replace("<","");
    var checkusername = "SELECT * from players WHERE username = '" + user + "';";
    con.query(checkusername, function(err, result){
        if (err) throw err;
        if(result.length)
        var checkPassword = "Select * from players WHERE Password = '" + pass + "';";
    con.query(checkPassword, function(err, result){
        if(err) throw err;
        console.log(result + "password");
        if(result.length){
            console.log("Correct password exists");
            response.sendFile(__dirname + '/client/game.html');
        }
        else{
            console.log("Incorrect Password!");
            response.sendFile(__dirname + '/client/index.html')
        }});
    else{
    console.log("user does not exist!");
    var SQL = "INSERT INTO players (Username, Password) VALUES ('"+ user +"','"+ pass+"');";
    con.query(SQL, function (err,result) {
        if (err) throw err;
        console.log("first record installed");
        });
        response.sendFile(__dirname + '/client/game.html');
    }






const port = process.env.PORT || 3000;
const server = app.listen(port,function(){
    console.log('Listening on the port : ${port}');

});
const io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
    console.log('socket connection')});



socket.on("user_details", function(user,pass){
        username = user;
        password = pass;
})
socket.emit('user-details-client', user,pass);

socket.on('playingAgain', function(user,pass){
        username = user;
        password = pass;
    console.log(username + " " + password);

});})})