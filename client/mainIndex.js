/*
  This File Will Animate The "Begin Game" Button.
  All user details collected and user information are sent as cookies to the main "game.js" JS File.
*/

$(document).ready(function(){ 
    
 var canvas = $('#login');

   //ON LOADING - The div will be of color blue 
 canvas.css('background-color', 'deepSkyBlue');

 $('#submit').hover(
     function(){
         $(this).animate({fontSize: '105px'}, 1000);
     },        
     function(){
         $(this).animate({fontSize: '75px'}, 1000);
     },
 );

 var socket = io();
   //On Sign up, the user details will be sent as COOKIES.
 $('#signup').submit(function () {
     socket.emit('user_details', $('#username').val(), $('#password').val());
 });    
});
