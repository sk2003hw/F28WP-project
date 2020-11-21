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

});