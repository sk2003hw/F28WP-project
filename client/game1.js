$(document).ready(function(){

    var gamecourse = $('#playArea');                        
    gamecourse.addClass('animate-area');                      //To animate game canvas 
    var racer = $('#racer');                                  //Selector for racer
    var score = $('#score')
    var collideSound = document.getElementById("collidesound");   //Selector for sound for avoiding obstacles
    var coinSound = document.getElementById("coinsound");  //Selector for sound for collecting coins
    collidesound.volume = 0.5;                                  //Setting the volume 
    coinSound.volume = 0.9;
    //var socket = io();                                        //For socket.io
    //var username;                                             //Storing the username 
    //var password;                                             //Storing the password (Encrypted)
    var speed= 4;                                          //Initial speed of the obstacles
    //var change_position = -10;                              //The change of position for the obstacles
    var scoreval = 0;                                         //Initial Score 
    var hasAvoidedObstacle = false;                         //To check if the racer avoided the obstacle or not                               
    var hascollectedcoin = false;
    var obstacle_current_position = 0;                          //Current position of the coin
    var fuel_current_position = 200; 
    var coin_current_position = 100;
    var coinAdded = false;
    var fuelAdded = false;
    var obstacleAdded = false;
    var gameCourse = document.getElementById("playArea");
    gameCourseHeight = gameCourse.offsetHeight;;
    gameCourseWidth = gameCourse.offsetWidth;;
    X_MAX = gameCourse.offsetLeft + gameCourseWidth;
        console.log(X_MAX);
    X_MIN = gameCourse.offsetLeft;
        console.log(X_MIN);
    Y_MIN = gameCourse.offsetTop + 0.1 * gameCourseHeight;
        console.log(Y_MIN);
    Y_MAX = gameCourse.offsetTop + 0.9 * gameCourseHeight;
        console.log(Y_MAX);
        
    var gameBegin = setInterval(function(){
        
           var obstacle = $('#obstacle');                                            
           obstacle_current_position = parseInt(obstacle.css('left')); 
           console.log("pos--",obstacle_current_position)
           
           //var obstacle_initial_position = 1000;                                  
           var obstacle_random = Math.floor(Math.random() * 100) + 100; + coin_random;
            if(cross(obstacle,racer) &&  hasAvoidedObstacle == false)  {
                console.log('GAME OVER');
                var sound = true;
                if(sound){
                collideSound.currentTime = 0;
                collideSound.play();
                sound= false;
                }
                game_over();
            }
        
        if(obstacleAdded == false) {
            gamecourse.append("<div id = 'obstacle'> </div>");
            obstacleAdded = true;
        }
    
        if(obstacle_current_position < -10){
            //We change it back to false for the new entry of the ghost
            hasAvoidedObstacle = false;
            //New position for ghost
            obstacle_current_position =1100 + obstacle_random;
            //Making the ghost visible again
            obstacle.fadeIn();

            console.log("obs new position : " + obstacle_current_position);
        }
        
    
    
            if(obstacle_current_position < 50 && hasAvoidedObstacle == false){
                hasAvoidedObstacle = true;
                //obstacle.fadeOut();
                 //We update the score on the HTML
                scoreval++;
                score.html(scoreval); 

                var sound = true;
                if(sound){
                coinSound.currentTime = 0;
                coinSound.play();
                sound= false;
            }
                
        } 
        
        if(scoreval>3){
            var coin = $('#coin');
            coin_current_position = parseInt(coin.css('left'));               
            //var coin_initial_position = 1000;                                   
            var coin_random = Math.floor(Math.random() * 150) ;
            
        
        if(coinAdded == false) {
            gamecourse.append("<div id = 'coin'> </div>");
            coinAdded = true;
            console.log("coin!!")
        }

            if(coin_current_position < -10){
                coin_current_position = 1100 + coin_random;
                coin.fadeIn();
            }
            
            coin.css('left', coin_current_position - speed);
            scoreval++;
                score.html(scoreval);
        }

    if(scoreval>4){
            var fuel = $('#fuel');
            fuel_current_position = parseInt(coin.css('left'));               
            var fuel_initial_position = 1100;                                   
            var fuel_random = Math.floor(Math.random() * 200) + 1000 ;
            
        
        if(fuelAdded == false) {
            gamecourse.append("<div id = 'fuel'> </div>");
            fuelAdded = true;
            console.log("fuel!!")
        }

            if(fuel_current_position < -10){
                fuel_current_position = fuel_initial_position + fuel_random;
                fuel.fadeIn();
            }
            
            fuel.css('left', coin_current_position - speed);
            scoreval+=2;
                score.html(scoreval);
        }

        
            
        
        $(document).keydown(function(event){
                        var soundFlag = true;
                        if( coin_current_position < 300){
                            coin.fadeOut();
                            scoreval++; 
                            score.html(scoreval); 
                            if (soundFlag) {
                                coinSound.currentTime = 0;
                                coinSound.play();
                                soundFlag = false;
                            }
                        } 
        });
        
        obstacle.css('left', obstacle_current_position - speed); 
        
        
        
    });
    

    $(document).on('keydown', function(e){
        var key = e.keyCode;
        
        if(key===37){
            racer.animate({right:'+=30px'},"fast");       
        }
        else if(key===39){
            racer.animate({left:'+=30px'},"fast");
        }
        if(key===38){
            racer.animate({top:'-=100px'},"fast");
            racer.animate({top:'+=100px'},"fast");
        }
        
        else if(key===40){
            racer.animate({top:'+=100px'},"fast");
            racer.animate({top:'-=100px'},"fast");
        }
        
    });
    


    function moveHorizontal() {
        //let obstacle = document.getElementById('obstacle');
        //document.getElementById('obstacle').style.top = obstacle.offsetLeft + dx + "px" ;
        coin.animate({left:'+=30px'},1000);
    }

    function game_over() {
        clearInterval(gameBegin);
        playArea.replaceWith('<div id = "playArea" > </div>');
        $('#playArea').css('background-color', 'deepSkyBlue');
    }

    function cross(element1, element2) {
        left1 = element1.offsetLeft; //i1x
        top1 = element1.offsetTop; //i1y
        right1 = element1.offsetLeft + element1.offsetWidth; //r1x
        bottom1 = element1.offsetTop + element1.offsetHeight; //r1y
    
        left2 = element2.offsetLeft; //i2x
        top2 = element2.offsetTop; //i2y
        right2 = element2.offsetLeft + element2.offsetWidth; //r2x
        bottom2 = element2.offsetTop + element2.offsetHeight; //r2y
    
        x_overlap = Math.max(0, Math.min(right1, right2) - Math.max(left1, left2));
        y_overlap = Math.max(0, Math.min(bottom1, bottom2) - Math.max(top1, top2));
        overlapArea = x_overlap * y_overlap;
    
        if (overlapArea == 0 || isNaN(overlapArea)) {
            return false;
        }
        return true;
    
    }
    

    
});
