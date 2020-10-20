/* This is the client-side JavaScript file linked to game.html file. */

//function is available when the document is loaded
$(document).ready(function(){

    var gameCourse = $('#Canvas');                        
    gameCourse.addClass('animate-area');                      //To animate game canvas 
    var racer = $('#racer');                                  //Selector for racer
    var obstacle = $('#obstacles');                           //Selector for obstacles
    var coins = $('#coin');                                   //Selector to give the number of coins on HTML
    var fuelToken = $('#fuel')                                //Selector to give the number of fuel tokens on HTML
    var avoidsound = document.getElementById('avoidsound');   //Selector for sound for avoiding obstacles
    var coinSound = document.getElementById('collectsound');  //Selector for sound for collecting coins
    avoidsound.volume = 0.1;                                  //Setting the volume 
    coinSound.volume = 0.1;
    var socket = io();                                        //For socket.io
    var username;                                             //Storing the username 
    var password;                                             //Storing the password (Encrypted)

    socket.on('user-details-client', function(uname, pwd){
        username = uname;
        password = pwd;
    });


    var obstacle_initial_position = 800 ;                   //Initial position of the obstacle
    var speed = 5;                                          //Initial speed of the obstacles
    var change_position = -10;                              //The change of position for the obstacles
    var score = 0;                                          //Initial Score 
    var hasAvoidedObstacle = false;                         //To check if the racer avoided the obstacle or not                               
    var coin_current_position = 0;                          //Current position of the coin
    var fuel_current_position = 0;                          //Current position of the fuel token
} 
