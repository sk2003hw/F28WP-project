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

            var obstacle_current_position = parseInt(style.css('left'));   //To get the current position of the grave
            var obstacle_random = Math.floor(Math.random() * 500);         //To get the new random position for the grave
            var racer_height = parseInt(style.css('top'));            //To get the top position of the knight
            
      /*
                COLLISION DETECTION (Game Over Condition):
                Here we will check when the grave goes past the knights position 
                AND
                if the racer could still collide with the obstacle
               
               OTHERWISE
                we continue the game
            */      

    if( obstacle_current_position < 0  && racer_height > (-90) )   {
                
                //To remove the score that got updated for the colliding obstacle
                --score;
                console.log('GAME OVER : You collided with an obstacle');
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
            
       /*
                if it passes the the position of change (change_position)
                We have make it enter the div again as a loop 
                This way, we only have one div of the obstacle that travels through the div for the knight to move left or right
            */      
    
    
    if(obstacle_current_position < change_position){
                //Since its entering as a 'new' grave, it's score check will turn to false 
                //This is because the racer has not been scored for the new obstacle entering yet
                hasAvoidedObstacle = false;

                //We keep a random new position for the obstacles to increase complexity of the coming obstacles
                obstacle_current_position = obstacle_initial_position + obstacle_random;

                //For checking
                console.log("obstacle new position :" + obstacle_current_position);
            }
    
    
    
    

    
    
    
    
    
   
} 
