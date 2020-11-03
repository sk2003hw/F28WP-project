$(document).ready(function(){

    var gamecourse = $('#playArea');                        
    gamecourse.addClass('animate-area');                      //To animate game canvas 
    var racer = $('#racer');                                  //Selector for racer
    var obstacle = $('#obstacle');                           //Selector for obstacles
    var coin = $('#coin');                                   //Selector to give the number of coins on HTML
    var fuel = $('#fuel')                                //Selector to give the number of fuel tokens on HTML
    var score = $('#score')
    var collideSound = document.getElementById("collidesound");   //Selector for sound for avoiding obstacles
    var coinSound = document.getElementById("coinsound");  //Selector for sound for collecting coins
    collidesound.volume = 0.5;                                  //Setting the volume for the jumping and slashing
    coinSound.volume = 0.5;
    //var socket = io();                                        //For socket.io
    var username;                                             //Storing the username 
    var password;                                             //Storing the password (Encrypted)
    var obs = document.getElementById("obstacle");
    
    var obstacle_initial_position = 800 ;                   //Initial position of the obstacle
    var speed= 5;                                          //Initial speed of the obstacles
    //var change_position = -10;                              //The change of position for the obstacles
    var scoreval = 0;                                         //Initial Score 
    var hasAvoidedObstacle = false;                         //To check if the racer avoided the obstacle or not                               
    //var coin_current_position = 0;                          //Current position of the coin
    var fuel_current_position = 0; 
    var coin_current_position = 0;
    //var racer_pos=0;                         //Current position of the fuel token
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

    var gameBegin =
        setInterval(function(){
        //coin_current_position = parseInt(coin.css('left')); 
        var obstacle_current_position = parseInt(obstacle.css('left'));   
        var obstacle_random = Math.floor(Math.random() * 550); 

        if(obstacleAdded == false) {
            gamecourse.append("<div id = 'obstacle'> </div>");
            obstacleAdded = true;
        }

        if(coinAdded == false) {
            gamecourse.append("<div id = 'coin'> </div>");
            coinAdded = true;
        }

        coin_current_position = parseInt(coin.css('left')); 
                     //Current position of the ghost
        var coin_initial_position = 200;                                   
        var coin_random = Math.floor(Math.random() * 100) + 100 + obstacle_random;

        if(fuelAdded == false) {
            gamecourse.append("<div id = 'fuel'> </div>");
            fuelAdded = true;
        }

        fuel_current_position = parseInt(fuel.css('left'));             
        var fuel_initial_position = 200;                                   
        var fuel_random = Math.floor(Math.random() * 100) + 100 + obstacle_random;
        obstacle.css('left', obstacle_current_position - speed);
        speed += 0.002;
        
        
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

    function moveHorizontal(dx) {
        let obstacle = document.getElementById('obstacle');
        document.getElementById('obstacle').style.top = obstacle.offsetLeft + dx + "px" ;

    }

    function game_over() {
        clearInterval(gameBegin);
        gameArena.replaceWith('<div id = "playArea" > </div>');
        $('#playArea').css('background-color', 'deepSkyBlue');
    }

    function LoadLeaderboard(){
        moveHorizontal(60);
        racer.animate({top:'-=100px'},"fast");
           
    }
});
//<div id = "coin"> </div>
//<div id = "fuel"> </div>
//var fueltoken_initial_position = offsetLeft;  
//if(cross(obstacle,racer))   {
    //--score;
    //game_over();
//}
//if(cross(racer,coin)){
  //  score++;
//}
//if(cross(racer,fueltoken)){
//    score++;

//}
