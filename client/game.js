/* This is the client-side JavaScript file linked to game.html file. */

//function is available when the document is loaded
$(document).ready(function(){

    var gameCourse = $('#playArea');                        
    gameCourse.addClass('animate-area');                      //To animate game canvas 
    var racer = $('#racer');                                  //Selector for racer
    var obstacle = $('#obstacles');                           //Selector for obstacles
    var coins = $('#coin');                                   //Selector to give the number of coins on HTML
    var fuelToken = $('#fuel')                                //Selector to give the number of fuel tokens on HTML
    var avoidsound = document.getElementById('avoidsound');   //Selector for sound for avoiding obstacles
    var coinSound = document.getElementById('collectsound');  //Selector for sound for collecting coins
    avoidsound.volume = 0.1;                                  //Setting the volume for the jumping and slashing
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
    
   
    
    //Main game function is stored inside the variable gameBegin
    //It has a setInterval function inside which runs indefinitely until a condition breaks it
    //This condition will be the game over condition
    var gameBegin =

        setInterval(function(){

            var obstacle_current_position = parseInt(style.css('left'));   //To get the current position of the obstacle
            var obstacle_random = Math.floor(Math.random() * 500);         //To get the new random position for the obstacle
            var racer_height = parseInt(style.css('top'));            //To get the top position of the racer
            
          /* COLLISION DETECTION (Game Over Condition): */      

        if( obstacle_current_position < 0  && racer_height > (-90) ){
             --score;
             game_over();
        }

                /*
                    Updating score from passing obstacles
                    we check if it has been scored already so that it doesnt add to the score for every time it passes the first condition
                */         

        if(obstacle_current_position < 15 && hasAvoidedObstacle == false){
            hasAvoidedObstacle = true;
            score++;
            if(score > -1)
                game.html(score);
        }        


        if(obstacle_current_position < change_position){
             hasAvoidedObstacle = false;
             obstacle_current_position = obstacle_initial_position + obstacle_random;
        }
        
        if(score>1){
             gameCourse.append("<div id = 'coin'> </div>");
        }
        
        if(score>2){
             gameCourse.append("<div id = 'fuel'> </div>");
        }
            
        });
}); 
