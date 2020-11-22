$(document).ready(function(){

    var gameCourse = $('#playArea');                        
    gameCourse.addClass('animate-area');                      //To animate game canvas 
    var racer = $('#racer');                                  //Selector for racer
    var obstacle = $('#obstacles');                           //Selector for obstacles
    var coin = $('#coin');                                   //Selector to give the number of coins on HTML
    var fuelToken = $('#fuel')                                //Selector to give the number of fuel tokens on HTML
    var score = $('#score')
    var backSound = document.getElementById("backSound");
    var collideSound = document.getElementById("collidesound");   //Selector for sound for avoiding obstacles
    var coinSound = document.getElementById("coinsound");  //Selector for sound for collecting coins
    collidesound.volume = 0.5;                                  //Setting the volume for the jumping and slashing
    coinSound.volume = 0.5;
    backSound.volume = 0.2;
    var socket = io();                                        //For socket.io
    var username;                                             //Storing the username 
    var password;                                             //Storing the password (Encrypted)


    socket.on('user-details-client', function(uname, pwd){
        username = uname;
        password = pwd;
    });

    gameCourse = document.getElementById("gameCourse");
        gameCourseHeight = gameCourse.offsetHeight;;
        gameCourseWidth = gameCourse.offsetWidth;;


    X_MAX = gameCourse.offsetLeft + gameCourseWidth;
    X_MIN = gameCourse.offsetLeft;
    Y_MIN = gameCourse.offsetTop + 0.1 * gameCourseHeight;
    Y_MAX = gameCourse.offsetTop + 0.9 * gameCourseHeight;
    
    
    var obstacle_initial_position = 800 ;                   //Initial position of the obstacle
    var speed= 5;                                          //Initial speed of the obstacles
    var change_position = -10;                              //The change of position for the obstacles
    var scoreval = 0;                                         //Initial Score 
    var hasAvoidedObstacle = false;                         //To check if the racer avoided the obstacle or not                               
    var coin_current_position = 0;                          //Current position of the coin
    var fuel_current_position = 0; 
    var racer_pos=0;                         //Current position of the fuel token
        //Main game function is stored inside the variable gameBegin
        //It has a setInterval function inside which runs indefinitely until a condition breaks it
        //This condition will be the game over condition
    var gameBegin =
            backSound.currentTime = 0;
            backSound.play();
        setInterval(function(){
            var obstacle_current_position = parseInt(style.css('left'));   //To get the current position of the grave
            var obstacle_random = Math.floor(Math.random() * 550);         //To get the new random position for the grave
            var racer_left = parseInt(style.css('left'));            //To get the top position of the knight
            var racer_right = parseInt(style.css('right'));
            /* COLLISION DETECTION (Game Over Condition): obstacle_current_position < 0  && racer_height > (-90)*/      

            
            if(cross(obstacle,racer))   { 
                --score;
                game_over();
            }
            if(cross(racer,coin)){
                score++;
            }
            if(cross(racer,fueltoken)){
                score++;
            }
            /*
                Updating score from passing obstacles
                we check if it has been scored already so that it doesnt add to the score for every time it passes the first condition
            */         

            if(obstacle_current_position < 15 && hasAvoidedObstacle == false){
                hasAvoidedObstacle = true;
                score++;
                if(score > -1)
                    _score.html(score);
            }        
  
            if(obstacle_current_position < change_position){
                hasAvoidedObstacle = false;
                obstacle_current_position = obstacle_initial_position + obstacle_random;
            }
            
            /*if(score>1){*/
                gameCourse.append("<div id = 'coin'> </div>");
                coin_current_position = parseInt(coin.css('left'));               //Current position of the ghost
                var coin_initial_position = 800;                                   //Initial position of ghost
                var coin_random = Math.floor(Math.random() * 100) + 100 + obstacle_random;
                
                if(coin_current_position < change_position){
                    coin_current_position = coin_initial_position + coin_random;
                    coin.fadeIn();
                }
                
                coin.css('left', coin_current_position - speed);
                $(document).keydown(function(event){
                    var soundFlag = true;
                    if(event.keyCode == 38 && coin_current_position < 300){
                        coin.fadeOut();
                        score++; 
                        scoreval.html(score); 
                        if (soundFlag) {
                            coinSound.currentTime = 0;
                            coinSound.play();
                            soundFlag = false;
                        }
                    } 
                });
            /*}*/
               

            /*if(score>3){*/
                gameCourse.append("<div id = 'fuel'> </div>");
                fuel_current_position = parseInt(coin.css('left'));               //Current position of the ghost
                var fueltoken_initial_position = 800;                                   //Initial position of ghost
                var fueltoken_random = Math.floor(Math.random() * 100) + 100 + obstacle_random;
                
                if(fueltoken_current_position < change_position){
                    fueltoken_current_position = fueltoken_initial_position + fueltoken_random;
                    fueltoken.fadeIn();
                }
                fueltoken.css('left', coin_current_position - speed);
        
                $(document).keydown(function(event){
                    var soundFlag = true;
                    if(event.keyCode == 38 && ghost_current_position < 300 && hasBeenScoredGhost == false){
                        fuelToken.fadeOut();
                        score++; 
                        scoreval.html(score); 
                        if (soundFlag) {
                            coinSound.currentTime = 0;
                            coinSound.play();
                            soundFlag = false;
                        }
                    } 
                });
            /*}*/
            
            obstacle.css('left', obstacle_current_position - speed);
            
            //We slowly increase the speed
            speed += 0.002;
        
        },40);
        

    $(document).on('keydown', function(e){
        var key = e.keyCode;
        if(key===37){
            racer.animate({right:'+=30px'},"fast");
        }
        else if(key===38){
            racer.animate({top:'-=30px'},"fast");
        }
        else if(key===39){
            racer.animate({left:'+=30px'},"fast");
        }
        else if(key===40){
            racer.animate({top:'+=30px'},"fast");
        }
    });

    function cross(racer, obstacle) {
        racerLeft = racer.offsetLeft; //i1x
        racerTop = racer.offsetTop; //i1y
        racerRight = racer.offsetLeft + racer.offsetWidth; //r1x
        racerBottom = racer.offsetTop + racer.offsetHeight; //r1y
    
        obstacleLeft = obstacle.offsetLeft; //i2x
        obstacleTop = obstacle.offsetTop; //i2y
        obstacleRight = obstacle.offsetLeft + obstacle.offsetWidth; //r2x
        obstacleBottom = obstacle.offsetTop + obstacle.offsetHeight; //r2y
    
        x_overlap = Math.max(0, Math.min(racerRight, obstacleRight) - Math.max(racerLeft, obstacleLeft));
        y_overlap = Math.max(0, Math.min(racerBottom, obstacleBottom) - Math.max(racerTop, obstacleTop));
        overlapArea = x_overlap * y_overlap;
    
        if (overlapArea == 0) return false;
        return true;
    
    }
    
    function game_over() {
        clearInterval(gameBegin);
        gameCourse.replaceWith('<div id = "playArea" > </div>');
        $('#playArea').css('background-color', 'deepSkyBlue');
    }
});






