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

 // DIRECTORY LIST
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
   
   // USERNAME SANITIZATION
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

    var key = crypto.createCipher('aes-128-cbc', 'pass');
    encPassword = key.update(pass, 'utf8', 'hex')
    encPassword += key.final('hex');

    var checkusername = "SELECT * from players WHERE username = '" + user + "';";
    con.query(checkusername, function(err, result){
        if (err) throw err;

        if(result.length){
            var checkPassword = "Select * from players WHERE Password = '" + encPassword + "';";
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
                }
            });
        }
        
    
    else{
    console.log("user does not exist!");
    var SQL = "INSERT INTO players (Username, Password) VALUES ('"+ user +"','"+ pass+"');";
    con.query(SQL, function (err,result) {
        if (err) throw err;
        console.log("first record installed");
        });
        response.sendFile(__dirname + '/client/game.html');
    };
});
const port = process.env.PORT || 3000;
const server = app.listen(port,function(){
    console.log('Listening on the port : ${port}');

});
const io = require('socket.io')(server);
io.sockets.on('connection', function(socket) {
    console.log('connecting to the socket')});



socket.on("user_details", function(user,pass){
        username = user;
        var key = crypto.createCipher('aes-128-cbc', 'password');
        var encryptedPassword = key.update(pwd, 'utf8', 'hex')
        encryptedPassword += key.final('hex');
      
        //USERNAME SANITIZATION
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

    })
socket.emit('user-details-client', user,pass);

socket.on('playingAgain', function(user,pass){
        username = user;
        password = pass;
    console.log(username + " " + password);

})
socket.on('score', function(score,username){
        
    console.log(score);

    
    
    var setScore = "UPDATE players SET Current_Score = " + score + " WHERE Username = '" + username + "';"; 
    con.query(setScore, function (err, result) {
        if (err) throw err;
        console.log(result + " done");
    });

    //To check if the score is the highest score of the user yet yet
    var getHighest = "SELECT Highest_Score from players WHERE Username = '" + username + "';";
    con.query(getHighest, function(err, result){ 
        if (err) throw err;

        //If it is the highest score yet
        if(score > result[0].Highest_Score){
            //We send the highest score yet with a message
            socket.emit('highest',score, "Best score yet!");

            //We update the table to store the highest score of the user as the new score
            var newHighest = "UPDATE players SET Highest_Score = " + score + " WHERE Username = '" + username + "';"; 
            connection.query(newHighest, function(err,res){
               if (err) throw err;
               console.log(" Highest updated" + res);
            });
        }

        //If its not their highest yet
        else {
            socket.emit('highest',result[0].Highest_Score, " ");
        }


        //To send the top three scores globally of all time
        con.query("SELECT Highest_Score, Username from players ORDER BY Highest_Score DESC LIMIT 3", function(err, result){
            if (err) throw err;
            console.log(result);
            //If there are less than three entries in the table, there might be less than 3 results
            //If there is only one result
            if(result.length == 1)
                socket.emit('bestYet', result[0].Username, result[0].Highest_Score);
            //If there are two results
            else if(result.length == 2)
                socket.emit('bestYet', result[0].Username, result[0].Highest_Score, result[1].Username, result[1].Highest_Score);
            //If there are 3 results
            else
                socket.emit('bestYet', result[0].Username, result[0].Highest_Score, result[1].Username, result[1].Highest_Score, result[2].Username, result[2].Highest_Score);            });

        //To send the top three scores globally of all active users 
        //Here, the active users are defined as users who have played the game in the last 90 minutes
        con.query("SELECT Highest_Score, Username from players WHERE timestamp > NOW() - INTERVAL 90 MINUTE ORDER BY Highest_Score DESC LIMIT 3", function(err, result){
            if (err) throw err;
            console.log(result);
            //If there are less than three entries in the table, there might be less than 3 results
            //If there is only one result
            if(result.length == 1)
                socket.emit('bestNow', result[0].Username, result[0].Highest_Score);
            //If there are two results
            else if(result.length == 2)
                socket.emit('bestNow', result[0].Username, result[0].Highest_Score, result[1].Username, result[1].Highest_Score);
            //If there are 3 results
            else
                socket.emit('bestNow', result[0].Username, result[0].Highest_Score, result[1].Username, result[1].Highest_Score, result[2].Username, result[2].Highest_Score);
        });
    });


});