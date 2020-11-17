/* this file is used for the server part of the game*/
const express = require('express');
const dataparser = require('body-parser');
var crypto = require('crypto');
const app = express();
const urlencodedParser = dataparser();
var server = require('http').Server(app);
var username;
var password;

app.use(express.static(__dirname + '/client'));
app.get('/' , function(req,res) {
    res.sendFile(__dirname + '/client/index.html');
    console.log(__dirname + '/client/index.html');
});
var mysql      = require('mysql');                             
var connection = mysql.createConnection({                       
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'players',
});
