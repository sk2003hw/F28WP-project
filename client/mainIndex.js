/*
  This File Will Animate The "Start Adventure" Button.
  All user details collected and user information are sent as cookies to the main "game.js" JS File.
*/

$(document).ready(function(){ 
    
 $('#join').hover(
     function(){
         $(this).animate({fontSize: '50px'}, 1000);
     },        
     function(){
         $(this).animate({fontSize: '40px'}, 1000);
     },
 );

 var socket = io();
   //On Sign up, the user details will be sent as COOKIES.
 $('#submit').submit(function () {
     socket.emit('user_details', $('#username').val(), $('#password').val());
 });    
});
