function init(){
$(document).ready(function() {
    $.get('/api/scores',function(scores) {
            for(var i = 0; i<scores.length; i++){
                $('#scores').append($('<li>').html(scores[i].username+ ":" + scores[i].score ));
            }
    });
});
}