/* this file is used for the server part of the game
  The purpose of this file is to connect the server JS to the client JS.
  The Databases are linked using MySQL.
  SOCKET gives unique ID and link the client side and server side.
*/
const express = require('express');        // To store Express Values.
const app = express();                     // Linking the app using Express..
var username;                              // Stores Username Information.
var password;                              // Stores Password Information.
const path = require('path');              // Sets the Data path.
const http = require('http');              // Socket Information.             
const socketio = require('socket.io')
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
// MYSQL DATABASE SERVER
var mysql = require('mysql');
const { urlencoded, request, response } = require('express');
const { createConnection } = require('net');
var con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "password"
});
// CONNECTING TO SERVER:
const port = process.env.PORT || 3306;
server = app.listen(port,function(){
    console.log('Listening on the port : ${port}');
//AREA TO CONNECT TO DATABASE
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
    var pass = crypto.createCipher('aes-128-cbc', 'pass');
    encPassword = pass.update(pass, 'utf8', 'hex')
    encPassword += pass.final('hex');

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
});
// Connecting to socket.io
// We send and receive objects: 
const io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
    console.log('socket.io')});
    socket.on("user_details", function(user,pass){
        username = user;
        //Encrypting the password
        var pass = crypto.createCipher('aes-128-cbc', 'password');
        var encPassword = pass.update(pwd, 'utf8', 'hex')
        encPassword += pass.final('hex');

    //sanitization of the username
    username = username.replace(";","");
    username = username.replace("!","");
    username = username.replace("","");
    username = username.replace("#","");
    username = username.replace("$","");
    username = username.replace("%","");
    username = username.replace("^","");
    username = username.replace("&","");
    username = username.replace("*","");
    username = username.replace("(","");
    username = username.replace(")","");
    username = username.replace("@","");
    username = username.replace("=","");
    username = username.replace("{","");
    username = username.replace("}","");
    username = username.replace(">","");
    username = username.replace("<","");
    username = username.replace(":","");
    });
    //ecrypting password
    socket.emit('user-details-client', username, encPassword);
    //play again function, includes resetting the username and password
    socket.on('playingAgain', function(user,pass){
        username = user;
        password = pass;
        console.log(username + " " + password);
    });
    //updating the current score of the username in the table
    socket.on('score', function(score,username){
        console.log(score);
    //for setting the score
    var setupScore = "UPDATE players SET Current_Score = " + score + " WHERE Username = '" + username + "';"; 
    connection.query(setupScore, function (err, result) {
        if (err) throw err;
        console.log(result + " done");
    });

    //for getting highest score
    var setupHighest = "SELECT Highest_Score from players WHERE Username = '" + username + "';";
    connection.query(setupHighest, function(err, result){ 
        if (err) throw err;
        //If it is the highest score yet, then:
        if(score > result[0].Highest_Score){
            //first, we send a message to the player
            socket.emit('highest',score, "Congratulations, this is your highest yet!");
            //then, We update the table with the new score being the highest scre
            var newscore = "UPDATE players SET Highest_Score = " + score + " WHERE Username = '" + username + "';"; 
            connection.query(newscore, function(err,response){
               if (err) throw err;
               console.log(" updated score" + response);
            });
        }
        //otherwise, if it is not the highest score of the user then
        else {
            socket.emit('highest',result[0].Highest_Score, " ");
        }

    })})})