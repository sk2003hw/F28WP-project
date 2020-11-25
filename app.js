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
app.get('/api/scores', function(request, response){

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
// This part gets username and pasword details as a server from index.html
socket.on("user_details", function(user,pass){
        username = user;
        var key = crypto.createCipher('aes-128-cbc', 'password');
        var encryptedPassword = key.update(pwd, 'utf8', 'hex')
        encryptedPassword += key.final('hex');
      
        //USERNAME SANITIZATION AREA
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

// Sending information to client side of JS.
socket.emit('user-details-client', user,pass);
io.socket.on('score', function(score,username){     
    console.log(score);
    var setScore = "UPDATE players SET Current_Score = " + score + " WHERE Username = '" + username + "';"; 
    con.query(setScore, function (err, result) {
        if (err) throw err;
        console.log(result + " done");
    });

    //To check if the score is highest alltogether.
    var gettingHighest = "SELECT Highest_Score from players WHERE Username = '" + username + "';";
    con.query(gettingHighest, function(err, result){ 
        if (err) throw err;

        //If it is the highest score alltogether
        if(score > result[0].Highest_Score){
            //We send the highest score information:
            socket.emit('highest',score, "Best score yet!");

            //We update the table to store the highest score of the user as the new score
            var newHighestscore = "UPDATE players SET Highest_Score = " + score + " WHERE Username = '" + username + "';"; 
            con.query(newHighestscore, function(err,res){
               if (err) throw err;
               console.log(" Highest updated" + res);
            });
        }

        //If its not their highest yet
        else {
            socket.emit('highest',result[0].Highest_Score, " ");
        }


        //SENDING TOP 3 SCORES OF ALLTOGETHER
        con.query("SELECT Highest_Score, Username from players ORDER BY Highest_Score DESC LIMIT 3", function(err, result){
            if (err) throw err;
            console.log(result);
            //If there are less than three entries in the table, there might be less than 3 results
            //If there is only one result:
            if(result.length == 1)
                socket.emit('bestYet', result[0].Username, result[0].Highest_Score);
            //If there are two results:
            else if(result.length == 2)
                socket.emit('bestYet', result[0].Username, result[0].Highest_Score, result[1].Username, result[1].Highest_Score);
            //If there are 3 results:
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


<<<<<<< HEAD
})});
=======
})
>>>>>>> e368a597d53714dd7f8b54af080e18a18c1115df
