$(document).ready(function(){
    console.log('main js loaded...');

    $.ajax({
        // url: "./data.json",
        url : "http://localhost:5000/refresh",
        type : "GET"
      })
    .done((data) => {
        if(data.length > 0) {
            populateLists(data);
            console.log(data);
        }

        $('#refresh').on('click', function(){
                refreshTask();
            
        });

        $(document).on('click', '.delete-btn', function(){
            console.log('dele button clicked');
            console.log($(this));
            // populateLists(data);
            let taskId = $(this).parent().parent().parent().attr('id');
            console.log(taskId);

            let taskDetails = {
                taskId : taskId
            }

             //send this value in ajax on some url 
             $.ajax({
                type: "DELETE",
                url: 'http://127.0.0.1:5000/delete',
                data: taskDetails,
                success: function(value){
                    console.log('successfully sent...');
                    console.log(value);
                    refreshTask();
                }
              });
        });
    });


    function populateLists(listsData){
        let listContainer = $('.main-list-container');
        listContainer.html('');
        for(let i = 0; i < listsData.length; i++){
            let currentListDetail = listsData[i];
            // console.log(currentListDetail['completed']);
            let listBlock = `<div class="todo-lists-block" id="${currentListDetail['taskId']}">
                                <div class="checkbox-para-block">
                                    <div class="task-para-block">
                                        <p class="tasks-para ${(currentListDetail['completed'] == "true") ? 'completed' : 'not-completed'}">${currentListDetail['task']}</p>
                                    </div>
                                    <div class="task-category-block">
                                        <p class="task-category">${currentListDetail['category']}</p>     
                                    </div>
                                    <div class="delete-block">
                                        <img src="./delete.png" alt="" class="delete-btn">
                                    </div>
                                    <div class="input-check-block">
                                        <input type="checkbox" class="task-checkbox-input" ${(currentListDetail['completed'] == "true") ? 'checked' : ''}> 
                                    </div>
                                </div>
                            </div>`;
            listContainer.append(listBlock);
        } 
        console.log('Refreshed...');
    }






    $('#save-btn').on('click', function(){
        let task = $('#todo-task').val();
        let category = $('#category-input').val();
        let isCompleted = false;
        console.log(task);
        console.log(category);

        if(task.length == 0) {
            generateAlert('task cannot be empty ...');
        }else if(category.length == 0){
            generateAlert('category cannot be empty ...');
        }else {
            //create the object to be sent

            let taskToAdd = {
                category : category,
                completed : isCompleted,
                task : task
            }

            //send this value in ajax on some url 
            $.ajax({
                type: "POST",
                url: 'http://127.0.0.1:5000/add',
                data: taskToAdd,
                success: function(value){
                    console.log('successfully sent...');
                    console.log(value);
                    refreshTask();
                    clearFields();
                }
              });
        }

       
    });

    // $('#update').on('click', function(){
    //     let todoListsBlock = $('.todo-lists-block');
    //     if(todoListsBlock.length == 0){
    //         return;
    //     }else {
    //         //create an array which will include all the tasks as objects
    //         let tasksArray = [];
    //         let tasksObject = {};
    //         //loop through each block and add each task details into the array
    //         for (let i = 0; i < todoListsBlock.length; i++){
    //             let currentTodoListBlock = $(todoListsBlock[i]);
    //             let childOfCurrentListBlock = currentTodoListBlock.children();
    //             let grandChildOfCurrentListBlock = childOfCurrentListBlock.children();
    //             let task = getText($(grandChildOfCurrentListBlock[0]));
    //             let category = getText($(grandChildOfCurrentListBlock[1]));
    //             let status = getTasksStatus($(grandChildOfCurrentListBlock[0]));
    //             let taskId = currentTodoListBlock.attr('id');
    //             let taskDetails = {
    //                 taskId : taskId,
    //                 category : category,
    //                 completed : status,
    //                 task : task
    //             }
    //             tasksObject[i] = taskDetails;
    //             tasksArray.push(taskDetails);
    //         }

    //         console.log(tasksArray);

    //         //ajax call here..
    //         $.ajax({
    //             type: "PUT",
    //             url: 'http://127.0.0.1:5000/update',
    //             data: tasksObject,
    //             success: function(value){
    //                 console.log('tasks details successfully sent...');
    //                 console.log(value);
    //             },
    //             failure : function(error) {
    //                 console.log(error);
    //             }
    //           });
    //     }
    // });

    function getText(ele){
        let childOfEle = ele.children();
        let text = $(childOfEle[0]).text();
        return text;
    }
    function getTasksStatus(ele){
        let childOfEle = ele.children();
        let status = '';
        if($(childOfEle).hasClass('completed')){
            status = "true";
        }else {
            status = "false";
        }
        return status;
    }

    $(document).on('change', '.task-checkbox-input', function(){
        let taskId = $(this).parent().parent().parent().attr('id');
        console.log(taskId);
        let thisSibling = $(this).parent().siblings();
        let checkPara = $(thisSibling[0]).children();
        let mainPara = $(checkPara[0]);
        if(mainPara.hasClass('completed')){
            mainPara.removeClass('completed');
            mainPara.addClass('not-completed');
        }else {
            mainPara.addClass('completed');
            mainPara.removeClass('not-completed');
        }

        let completeStatus = (mainPara.hasClass('completed')) ? "true" : "false";
        console.log(completeStatus);

        taskDetails = {
            taskId : taskId,
            completed : completeStatus
        }

        //ajax call here..
        $.ajax({
            type: "PUT",
            url: 'http://127.0.0.1:5000/update',
            data: taskDetails,
            success: function(value){
                console.log('tasks details successfully sent...');
                console.log(value);
            },
            failure : function(error) {
                console.log(error);
            }
          });
        
    });

   




    function generateAlert(alertMessage) {
        bootbox.alert({ 
            size: "small",
            message: alertMessage, 
            callback: function(){
                 return
            }
          });
    }

    function clearFields(){
        $('#todo-task').val('');
        $('#category-input').val('');
        $('#todo-task').focus();
    }   

    function refreshTask(data) {
        $.ajax({
            // url: "./data.json",
            url : "http://localhost:5000/refresh",
            type : "GET"
          }).done((result) => {
            populateLists(result);
            console.log(result);
          });
    }



});