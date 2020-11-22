$(document).ready(function(){

    var gamecourse = $('#playArea');                            //Referring to the area where we play the game
    gamecourse.addClass('animate-area');                        //To animate game canvas 
    var racer = $('#racer');                                    //Selector for racer
    var score = $('#score');                                     //Selector for score
    var collideSound = document.getElementById("collidesound");   //Selector for sound for avoiding obstacles
    var coinSound = document.getElementById("coinsound");       //Selector for sound for collecting coins
    var gameEndSound = document.getElementById("endsound");     //Selector for sound when the game ends
    collidesound.volume = 0.9;                                  //Setting the volume for the collide sound
    coinSound.volume = 0.9;                                     //Setting the volume for the coin sound
    gameEndSound.volume = 0.9;                                  //Setting the volume for the game end sound
    var socket = io();                                        //For socket.io
    var username;                                             //Storing the username 
    var password;                                             //Storing the password 
    var speed = 3;                                             //Initial speed of the obstacles
    var scoreval = 0;                                         //Initial Score 
    var coinval = 0;
    var hasAvoidedObstacle = false;                         //To check if the racer avoided the obstacle or not                               
    var hascollectedcoin = false;
    var caughtfuel = false;
    var obstacle_current_position = 0;                      //Current position of the obstacle
    var fuel_current_position = 0;                          //Current position of the fuel token
    var coin_current_position = 0;                          //Current position of the coin
    var coinAdded = false;                                  //To check if the coin has been added
    var fuelAdded = false;                                  //To check if the fuel token has been added
    var obstacleAdded = false;                              //To check if the obstacle has been added
    
//For player 2--------------------------------------------------------------------
    var score1 = $('#score1');                               //Selector for score
    var scoreval1 = 0;                                       //Initial Score 
    var hasAvoidedObstacle1 = false;                         //To check if the racer avoided the obstacle or not                               
    var hascollectedcoin1 = false;                           //To check if racer has collected a coin
    var caughtfuel1 = false;                                 //To check if racer has collected a fuel token
    var obstacle_current_position1 = 0;                      //Current position of the obstacle
    var fuel_current_position1 = 0;                          //Current position of the fuel token
    var coin_current_position1 = 0;                          //Current position of the coin
    var coinAdded1 = false;                                  //To check if the coin has been added
    var fuelAdded1 = false;                                  //To check if the fuel token has been added
    var obstacleAdded1 = false;                              //To check if the fuel token has been added
    var racer1 = $('#racer1');                               //Selector for racer-2

//------------------------------------------------------------------------

//For player 3--------------------------------------------------------------------
var score2 = $('#score2');                               //Selector for score
var scoreval2 = 0;                                       //Initial Score 
var hasAvoidedObstacle2 = false;                         //To check if the racer avoided the obstacle or not                               
var hascollectedcoin2 = false;                           //To check if racer has collected a coin
var caughtfuel2 = false;                                 //To check if racer has collected a fuel token
var obstacle_current_position2 = 0;                      //Current position of the obstacle
var fuel_current_position2 = 0;                          //Current position of the fuel token
var coin_current_position2 = 0;                          //Current position of the coin
var coinAdded2 = false;                                  //To check if the coin has been added
var fuelAdded2 = false;                                  //To check if the fuel token has been added
var obstacleAdded2 = false;                              //To check if the fuel token has been added
var racer2 = $('#racer2');                               //Selector for racer-3

//------------------------------------------------------------------------

    //Runs indefinitely until the game is over   
    var gameBegin = setInterval(function(){
        //On the scrren, the players are shown in the order- player-3, player-1, player-2
        //For player 1
        var obstacle = $('#obstacle');                               //Selector for obstacle                                       
        obstacle_current_position = parseInt(obstacle.css('left'));  //Initialising the position of the obstacle
        var racer_top_pos = parseInt(racer.css('top'));              //Initialising the position of the racer          
       
        // For player 2 ------------------------------------------

        var obstacle1 = $('#obstacle1');                               //Selector for obstacle                                       
        obstacle_current_position1 = parseInt(obstacle1.css('left'));  //Initialising the position of the obstacle
        var racer_top_pos1 = parseInt(racer1.css('top'));              //Initialising the position of the racer 
       
        //--------------------------------------

        // For player 3 ------------------------------------------

         var obstacle2 = $('#obstacle2');                               //Selector for obstacle                                       
         obstacle_current_position2 = parseInt(obstacle2.css('left'));  //Initialising the position of the obstacle
         var racer_top_pos2 = parseInt(racer2.css('top'));              //Initialising the position of the racer 
         
        //--------------------------------------


        //Add the obstacle to the playArea if it has not been added yet (To make sure obstacle is added)
        if(obstacleAdded === false) {
            gamecourse.append("<div id = 'obstacle'> </div>");
           obstacleAdded = true;
        }
        
        //The position of the racer is 200 (from the left) so this condition has been used to check if elements have crossed the position of the racer
        
        //Game Over condition- To check if the obstacle has crossed the position of the racer (200) and the racer has not jumped (is still 210)
        if(obstacle_current_position<=200 && (racer_top_pos===210))  {
            var sound = true;
            //To play the sound when the racer collides with the obstacle
            if(sound){
                collideSound.currentTime = 0;
                collideSound.play();
                sound= false;
            }
            //Calling the game_over function
            game_over();
         }
        

        var obstacle_random = Math.floor(Math.random() * 100) + 100;    // To place the obstacle randmly

        //To re-initialise the obstacle
        if(obstacle_current_position < -10){
            hasAvoidedObstacle = false;
            obstacle_current_position = 1100 + obstacle_random;
            obstacle.fadeIn();
        }
        
    
        //When the obstacle has been avoided...
        if(obstacle_current_position < 200 && hasAvoidedObstacle === false){
            hasAvoidedObstacle = true;

            //We update the score on the HTML
            scoreval++;
            score.html(scoreval); 

            //To play the sound
            var sound = true;
            if(sound){
                coinSound.currentTime = 0;
                coinSound.play();
                sound= false;
            }
                
        } 

        //For player-2  ---------------------------------------------------

        //Add the obstacle to the playArea if it has not been added yet (To make sure obstacle is added)
        if(obstacleAdded1 === false) {
            gamecourse.append("<div id = 'obstacle1'> </div>");
           obstacleAdded1 = true;
        }

        //Game Over condition- To check if the obstacle has crossed the position of the racer (200) but the racer has not jumped (still is 500)
        if(obstacle_current_position1<=200 && (racer_top_pos1===500))  {
            var sound = true;
            //To play the sound when the racer collides with the obstacle
            if(sound){
                collideSound.currentTime = 0;
                collideSound.play();
                sound= false;
            }
            //Calling the game_over function
            game_over();
         }
        

        var obstacle_random1 = Math.floor(Math.random() * 100) + 100;    // To place the obstacle randmly

        //To re-initialise the obstacle
        if(obstacle_current_position1 < -10){
            hasAvoidedObstacle1 = false;
            obstacle_current_position1 = 1100 + obstacle_random1;
            obstacle1.fadeIn();
        }
        
    
        //When the obstacle has been avoided...
        if(obstacle_current_position1 < 200 && hasAvoidedObstacle1 === false){
            hasAvoidedObstacle1 = true;

            //We update the score on the HTML
            scoreval1++;
            score1.html(scoreval1); 

            //To play the sound
            var sound = true;
            if(sound){
                coinSound.currentTime = 0;
                coinSound.play();
                sound= false;
            }
                
        } 

        if(scoreval1>1){

            var coin1 = $('#coin1');                                                  //Selector for the coin
            coin_current_position1 = parseInt(coin1.css('left'));                     //Initialising the postion of the coin                                              
            var coin_random1 = Math.floor(Math.random() * 100) + obstacle_random1;    //to aid in getting a random for the coin
            
            //Add the coin to the play area if it has not been added yet
            if(coinAdded1 === false) {
                gamecourse.append("<div id = 'coin1'> </div>");
                coinAdded1 = true;
            }

            //Re-initialise the coin
            if(coin_current_position1 < -10){
                hascollectedcoin1 = false;
                coin_current_position1 = 1100 + coin_random1;
                coin1.fadeIn();
            }
            
            //If any key has been pressed and coin has crossed the position of the racer, score will be incremented
            $(document).keydown(function(event){
                var sound = true;
                //position of coin is less than that of the racer
                if(coin_current_position1 < 200 && hascollectedcoin1 === false){
                    hascollectedcoin1=true;
                    coin1.fadeOut();
                    
                    //Incrementing the score and writing it
                    scoreval1++; 
                    score1.html(scoreval1); 

                    //To play the sound
                    if (sound) {
                        coinSound.currentTime = 0;
                        coinSound.play();
                        soundFlag = false;
                    }
            
                 } 
            });

            //To move the coin and at the below speed
            coin1.css('left', coin_current_position1 - speed -1);
        }

        if(scoreval1>4){
            var fuel1 = $('#fuel1');                                              //Selector for the fuel token
            fuel_current_position1 = parseInt(fuel1.css('left'));                 //Initialising the position of the fuel token                                            
            var fuel_random1 = Math.floor(Math.random()) + obstacle_random1  ;    //To aid in getting a random positon of the fuel token
            
            //Add the fuel token to the play area if it has not been added yet
            if(fuelAdded1 === false) {
                gamecourse.append("<div id = 'fuel1'> </div>");
                fuelAdded1 = true;
            }

            //Re-initialising the fuel token
            if(fuel_current_position1 < -10){
                caughtfuel1 = false;
                fuel_current_position1 = 1100 + fuel_random1 ;
                fuel1.fadeIn();
            }
            
            //If any key has been pressed and fuel token has crossed the position of the racer, score will be incremented
            $(document).keydown(function(event){
                var sound = true;
                 //position of fuel token is less than that of the racer
                if(fuel_current_position1 < 200 && caughtfuel1 === false){
                    caughtfuel1 = true;
                    fuel1.fadeOut();
                    
                    //Incrementing the score and writing it
                    scoreval1+=1; 
                    score1.html(scoreval1); 

                    //To play the sound
                    if (sound) {
                        coinSound.currentTime = 0;
                        coinSound.play();
                        sound = false;
                    }
            
                 } 
            });

            //To move the fuel token and at the below speed
            fuel1.css('left', fuel_current_position1 - speed);
        }

        //To move the obstacle and at the below speed
        obstacle1.css('left', obstacle_current_position1 - speed); 
       
        //-------------------------------------------------------------

        //For player-3  ---------------------------------------------------

        //Add the obstacle to the playArea if it has not been added yet (To make sure obstacle is added)
        if(obstacleAdded2 === false) {
           gamecourse.append("<div id = 'obstacle2'> </div>");
           obstacleAdded2 = true;
        }

        //Game Over condition- To check if the obstacle has crossed the position of the racer but the racer has not jumped
        if(obstacle_current_position2<=200 && (racer_top_pos2=== 30))  {
            var sound = true;
            //To play the sound when the racer collides with the obstacle
            if(sound){
                collideSound.currentTime = 0;
                collideSound.play();
                sound= false;
            }
            //Calling the game_over function
            game_over();
         }
        

        var obstacle_random2 = Math.floor(Math.random() * 100) + 100;    // To place the obstacle randmly

        //To re-initialise the obstacle
        if(obstacle_current_position2 < -10){
            hasAvoidedObstacle2 = false;
            obstacle_current_position2 = 1100 + obstacle_random2;
            obstacle2.fadeIn();
        }
        
    
        //When the obstacle has been avoided...
        if(obstacle_current_position2 < 200 && hasAvoidedObstacle2 === false){
            hasAvoidedObstacle2 = true;

            //We update the score on the HTML
            scoreval2++;
            score2.html(scoreval2); 

            //To play the sound
            var sound = true;
            if(sound){
                coinSound.currentTime = 0;
                coinSound.play();
                sound= false;
            }
                
        } 

        if(scoreval2>2){

            var coin2 = $('#coin2');                                                  //Selector for the coin
            coin_current_position2 = parseInt(coin2.css('left'));                     //Initialising the postion of the coin                                              
            var coin_random2 = Math.floor(Math.random() * 100) + obstacle_random2;    //to aid in getting a random for the coin
            
            //Add the coin to the play area if it has not been added yet
            if(coinAdded2 === false) {
                gamecourse.append("<div id = 'coin2'> </div>");
                coinAdded2 = true;
            }

            //Re-initialise the coin
            if(coin_current_position2 < -10){
                hascollectedcoin2 = false;
                coin_current_position2 = 1100 + coin_random2;
                coin2.fadeIn();
            }
            
            //If any key has been pressed and coin has crossed the position of the racer, score will be incremented
            $(document).keydown(function(event){
                var sound = true;
                 //position of coin is less than that of the racer
                if(coin_current_position2 < 200 && hascollectedcoin2 === false){
                    hascollectedcoin2=true;
                    coin2.fadeOut();
                    
                    //Incrementing the score and writing it
                    scoreval2++; 
                    score2.html(scoreval2); 

                    //To play the sound
                    if (sound) {
                        coinSound.currentTime = 0;
                        coinSound.play();
                        soundFlag = false;
                    }
            
                 } 
            });

            //To move the coin and at the below speed
            coin2.css('left', coin_current_position1 - speed);
        }

        if(scoreval2>4){
            var fuel2 = $('#fuel2');                                              //Selector for the fuel token
            fuel_current_position2 = parseInt(fuel2.css('left'));                 //Initialising the position of the fuel token                                            
            var fuel_random2 = Math.floor(Math.random()) + obstacle_random2  ;    //To aid in getting a random positon of the fuel token
            
            //Add the fuel token to the play area if it has not been added yet
            if(fuelAdded2 === false) {
                gamecourse.append("<div id = 'fuel2'> </div>");
                fuelAdded2 = true;
            }

            //Re-initialising the fuel token
            if(fuel_current_position2 < -10){
                caughtfuel2 = false;
                fuel_current_position2 = 1100 + fuel_random2 ;
                fuel2.fadeIn();
            }
            
            //If any key has been pressed and fuel token has crossed the position of the racer, score will be incremented
            $(document).keydown(function(event){
                var sound = true;
                 //position of fuel token is less than that of the racer
                if(fuel_current_position2 < 200 && caughtfuel2 === false){
                    caughtfuel2 = true;
                    fuel2.fadeOut();
                    
                    //Incrementing the score and writing it
                    scoreval2+=1; 
                    score2.html(scoreval2); 

                    //To play the sound
                    if (sound) {
                        coinSound.currentTime = 0;
                        coinSound.play();
                        sound = false;
                    }
            
                 } 
            });

            //To move the fuel token and at the below speed
            fuel2.css('left', fuel_current_position2 - speed);
        }

        //To move the obstacle and at the below speed
        obstacle2.css('left', obstacle_current_position2 - speed); 
       
        //-------------------------------------------------------------
        
        //For player-1--------------------------------------------------
        //Add the coin when the score is greater than 1
        if(scoreval>1){

            var coin = $('#coin');                                                  //Selector for the coin
            coin_current_position = parseInt(coin.css('left'));                     //Initialising the postion of the coin                                              
            var coin_random = Math.floor(Math.random() * 100) + obstacle_random;    //to aid in getting a random for the coin
            
            //Add the coin to the play area if it has not been added yet
            if(coinAdded === false) {
                gamecourse.append("<div id = 'coin'> </div>");
                coinAdded = true;
            }

            //Re-initialise the coin
            if(coin_current_position < -10){
                hascollectedcoin = false;
                coin_current_position = 1100 + coin_random;
                coin.fadeIn();
            }
            
            //If any key has been pressed and coin has crossed the position of the racer, score will be incremented
            $(document).keydown(function(event){
                var sound = true;
                 //position of coin is less than that of the racer
                if(coin_current_position < 200 && hascollectedcoin === false){
                    hascollectedcoin=true;
                    coin.fadeOut();
                    
                    //Incrementing the score and writing it
                    scoreval++; 
                    score.html(scoreval); 

                    //To play the sound
                    if (sound) {
                        coinSound.currentTime = 0;
                        coinSound.play();
                        soundFlag = false;
                    }
            
                 } 
            });

            //To move the coin and at the below speed
            coin.css('left', coin_current_position - speed);
        }

        if(scoreval>4){
            var fuel = $('#fuel');                                              //Selector for the fuel token
            fuel_current_position = parseInt(fuel.css('left'));                 //Initialising the position of the fuel token                                            
            var fuel_random = Math.floor(Math.random()) + obstacle_random  ;    //To aid in getting a random positon of the fuel token
            
            //Add the fuel token to the play area if it has not been added yet
            if(fuelAdded === false) {
                gamecourse.append("<div id = 'fuel'> </div>");
                fuelAdded = true;
            }

            //Re-initialising the fuel token
            if(fuel_current_position < -10){
                caughtfuel = false;
                fuel_current_position = 1100 + fuel_random ;
                fuel.fadeIn();
            }
            
            //If any key has been pressed and fuel token has crossed the position of the racer, score will be incremented
            $(document).keydown(function(event){
                var sound = true;
                 //position of fuel token is less than that of the racer
                if(fuel_current_position < 200 && caughtfuel === false){
                    caughtfuel = true;
                    fuel.fadeOut();
                    
                    //Incrementing the score and writing it
                    scoreval+=1; 
                    score.html(scoreval); 

                    //To play the sound
                    if (sound) {
                        coinSound.currentTime = 0;
                        coinSound.play();
                        sound = false;
                    }
            
                 } 
            });

            //To move the fuel token and at the below speed
            fuel.css('left', fuel_current_position - speed);
        }

        //To move the obstacle and at the below speed
        obstacle.css('left', obstacle_current_position - speed); 
        
        //---------------------------------------------------------------
        
    });
    

    //To move the racer-1 up/down when the up/down arrow keys are pressed
    $(document).on('keydown', function(e){
        var key = e.keyCode;
        
        if(key===38){ //up arrow
            racer.animate({top:'-=200px'},1050);
            racer.animate({top:'+=200px'},1050);
        }
        
        else if(key===40){ //down arrow
            racer.animate({top:'+=200px'},1050);
            racer.animate({top:'-=200px'},1050);
        }
        
    });

    //To move the racer-2 up/down when the up/down arrow keys are pressed
    $(document).on('keydown', function(e){
        var key = e.keyCode;
        
        if(key===38){ //left arrow
            racer1.animate({top:'-=200px'},1050);
            racer1.animate({top:'+=200px'},1050);
        }
        
        else if(key===40){ //right arrow
            racer1.animate({top:'+=200px'},1050);
            racer1.animate({top:'-=200px'},1050);
        }
        
    });
    //To move the racer-3 up/down when the up/down arrow keys are pressed
    $(document).on('keydown', function(e){
        var key = e.keyCode;
        
        if(key===38){ //left arrow
            racer2.animate({top:'-=200px'},1050);
            racer2.animate({top:'+=200px'},1050);
        }
        
        else if(key===40){ //right arrow
            racer2.animate({top:'+=200px'},1050);
            racer2.animate({top:'-=200px'},1050);
        }
        
    });
    
    //Game over function to be executed when the game is over
    function game_over() {
        clearInterval(gameBegin);

        //Display game over message as an alert
        window.alert("Game Over! Try Again...");

        //Play the game over sound
        var sound = true;
        if(sound === true)
        {
            gameEndSound.currentTime = 0;
            gameEndSound.play();
            sound = false;
        }
        let score = [
            {name: "Player 1", score: 300},
            {name: "Player 2", score: 370},
            {name: "Player 3", score: 500},
            {name: "Player 4", score: 430},
            {name: "Player 5", score: 340},
        ];
        
        function updateLeaderboardView() {
            let leaderboard = document.getElementById("leaderboard");
            leaderboard.innerHTML = "";
        
            scores.sort(function(a, b){ return b.score - a.score  });
            let elements = []; // we'll need created elements to update colors later on
            // create elements for each player
            for(let i=0; i<scores.length; i++) {
                let name = document.createElement("div");
                let score = document.createElement("div");
                name.classList.add("name");
                score.classList.add("score");
                name.innerText = scores[i].name;
                score.innerText = scores[i].score;
        
                let scoreRow = document.createElement("div");
                scoreRow.classList.add("row");
                scoreRow.appendChild(name);
                scoreRow.appendChild(score);
                leaderboard.appendChild(scoreRow);
        
                elements.push(scoreRow);
        
            }
        
            let colors = ["gold", "silver", "#cd7f32"];
            for(let i=0; i < 3; i++) {
                elements[i].style.color = colors[i];
            }
        }
        
        updateLeaderboardView();
        function randomize() {
            for(var i=0; i<scores.length; i++) {
                scores[i].score = Math.floor(Math.random() * (600 - 300 + 1)) + 300;
            }
            // when your data changes, call updateLeaderboardView
            updateLeaderboardView();
        }
    }
})
