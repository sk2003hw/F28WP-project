/* this file is used for the server part of the game
  The purpose of this file is to connect the server JS to the client JS.
  The Databases are linked using MySQL.
  SOCKET gives unique ID and link the client side and server side.
*/

function dbFunc() {

  var userN;
  var encPassword;

  console.log("username --->"+$('#pname').val());
  console.log("password--->"+$('#ppass').val());
  var x = +$('#pname').val();
  var y = +$('#ppass').val();
  
  if (x == "" || x == null)
    {
        alert("Username must be filled out");
        return false;                    
    }
                
  if (y == "" || y == null)
    {
        alert("Password must be filled out");
        return false;
    }

     //JUMPING TO GAME.HTML
     location.replace('/F28WP-project/client/game.html');

    console.log("Starting to connect to database"); 

  // MYSQL DATABASE SERVER

    const mysql = require('mysql');
    const express = require('express');
    const app = express();
    const PORT = 3306
  //  database: '<DB_NAME>' 


    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'passw0rd'    
    });

    //AREA TO CONNECT TO DATABASE
    connection.connect(function(err) {
    if (err) throw err;
    console.log("Connecting to the database")
    con.query("CREATE DATABASE database", function(err, result){
        if (err) throw err;
        console.log("Created the Database");
    })})

    connection.connect(function(err) {
        if (err) console.error(err);
        console.log("Connected!");
    });

   // USERNAME SANITIZATION AREA
   userN = x.replace("@","");
   userN = x.replace(";","");
   userN = x.replace("!","");
   userN = x.replace("","");
   userN = x.replace("#","");
   userN = x.replace("$","");
   userN = x.replace("%","");
   userN = x.replace("^","");
   userN = x.replace("*","");
   userN = x.replace("&","");
   userN = x.replace("(","");
   userN = x.replace(")","");
   userN = x.replace("=","");
   userN = x.replace("{","");
   userN = x.replace("}","");
   userN = x.replace(">","");
   userN = x.replace(":","");
   userN = x.replace("<","");

    // Password To Be Encrypted:
    var key = crypto.createCipher('aes-128-cbc', 'pass');
    encPassword = key.update(y, 'utf8', 'hex')
    encPassword += key.final('hex');

    // Checking if user data/ username exists:
    var checkingusername = "SELECT * from players WHERE username = '" + userN + "';";
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
    var SQL = "INSERT INTO players (Username, Password) VALUES ('"+ userN +"','"+ encPassword +"');";
    con.query(SQL, function (err,result) {
        if (err) throw err;
        console.log("first record installed");
        });
       
        //JUMPING TO GAME.HTML
        response.sendFile(__dirname + '/client/game.html');
    };
}); 


}             
