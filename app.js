/* this file is used for the server part of the game
  The purpose of this file is to connect the server JS to the client JS.
  The Databases are linked using MySQL.
  SOCKET gives unique ID and link the client side and server side.
*/
const express = require('express');        // To store Express Values.
const app = express();                     // App link using Express.
const dataparser = require('body-parser'); // To store the datapraser.
var username;                              // Stores Username Information.
var password;                              // Stores Password Information.
const urlencodedParser = dataparser();     // Read the parser value.
const path = require('path');              // Sets Path Data.
const http = require('http');              // Socket Information.
const socketIO = require('socket.io')
var encPassword;
const server = http.createServer((request, response) => {
    if (request.url === '/') {
        response.write("Hello");
        response.write("Restarting server");
        response.end();}});

 // DIRECTORY LIST, INDEX.HTML LINK
app.use(express.static('client'));
app.get('/' , function(request,response) {
    response.sendFile({root: __dirname} + '/client/index.html')});
app.get('/api/scores/', function(request, response){
    const Array = require('./scores')
var scores = Array();
response.JSON(scores);
response.end;
});
// MYSQL DATABASE SERVER
var mysql = require('mysql');
const { urlencoded } = require('express');
const { createConnection } = require('net');
var con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password"
});
//AREA TO CONNECT TO DATABASE
con.connect(function(err) {
    if (err) throw err;
    console.log("Connecting to the database")
    con.query("CREATE DATABASE database", function(err, result){
        if (err) throw err;
        console.log("Created the Database");
    })})
con.connect(function(err) {
    if(err) throw err;
    console.log("connected!")
    var sql = "CREATE TABLE leaderboard (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    con.query(sql, function(err,result){
        if(err) throw err;
        console.log("created the table");
    });
    });
app.post('/auth' , urlencodedParser, function(request,response){
   
    username = request.body.user;
    password = request.body.pass;
   
   // USERNAME SANITIZATION AREA
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

    // Password To Be Encrypted:
    var key = crypto.createCipher('aes-128-cbc', 'pass');
    encPassword = key.update(pass, 'utf8', 'hex')
    encPassword += key.final('hex');

    // Checking if user data/ username exists:
    var checkingusername = "SELECT * from players WHERE username = '" + user + "';";
    con.query(checkingusername, function(err, result){
        if (err) throw err;

   // If Username Exists:
        if(result.length){
            var checkingPassword = "Select * from players WHERE Password = '" + encPassword + "';";
        // Checking And Verifying Password Details:
            con.query(checkingPassword, function(err, result){
                if(err) throw err;
                console.log(result + "password");
                          // If Password Details Are Correct:
                if(result.length){
                    console.log("Correct password exists");
                         // Linking game.html page.
                    response.sendFile(__dirname + '/client/game.html');
                }
        //If Password is wrong , user is given information and restarted. 
                else{
                    console.log("Incorrect Password!");
                    response.sendFile(__dirname + '/client/index.html')
                }
            });
        }
        
    // CASE: If User Does Not Exist:
    else{
    console.log("user does not exist!");
    var SQL = "INSERT INTO players (Username, Password) VALUES ('"+ user +"','"+ pass+"');";
    con.query(SQL, function (err,result) {
        if (err) throw err;
        console.log("first record installed");
        });
       
        //JUMPING TO GAME.HTML
        response.sendFile(__dirname + '/client/game.html');
    };
});

// CONNECTING TO SERVER:
const port = process.env.PORT || 3306;
const server = app.listen(port,function(){
    console.log('Listening on the port : ${port}');

});

// Connecting to socket.io
// We send and receive objects:
const io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
    console.log('connecting to the socket')});
scoreboard[socket.ID] = player;
scoreboard[socket.ID] = socket;

socket.on('login' , function(pseudoname))


})
