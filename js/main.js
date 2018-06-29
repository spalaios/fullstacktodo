$(document).ready(function(){
    console.log('main js loaded...');

    

    $('#save-btn').on('click', function(){
        let task = $('#todo-task').val();
        let category = $('#category-input').val();
        console.log(task);
        console.log(category);

        //send this value in ajax on some url 
    });



});