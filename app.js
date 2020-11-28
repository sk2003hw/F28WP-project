/* this file is used for the server part of the game
  The purpose of this file is to connect the server JS to the client JS.
  The Databases are linked using MySQL.
  SOCKET gives unique ID and link the client side and server side.
*/

function dbFunc() {

  var userN;
  var encPassword;

  console.log("username --->"+$('#pname').val());
  console.log("password--->"+$('#ppass').val());
  var x = +$('#pname').val();
  var y = +$('#ppass').val();
  
  if (x == "" || x == null)
    {
        alert("Username must be filled out");
        return false;                    
    }
                
  if (y == "" || y == null)
    {
        alert("Password must be filled out");
        return false;
    }

     //JUMPING TO GAME.HTML
     location.replace('/F28WP-project/client/game.html');

    console.log("Starting to connect to database"); 
}
