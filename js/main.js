$(document).ready(function(){
    console.log('main js loaded...');

    $.ajax({
        url: "./data.json",
      })
    .done((data) => {
        $('#refresh').on('click', function(){
            populateLists(data);
            
        });

        


    });


    function populateLists(listsData){
        let listContainer = $('.main-list-container');
        for(let i = 0; i < listsData.length; i++){
            let currentListDetail = listsData[i];
            // console.log(currentListDetail['completed']);
            let listBlock = `<div class="todo-lists-block" id="${currentListDetail['id']}">
                                <div class="checkbox-para-block">
                                    <div class="task-para-block">
                                        <p class="tasks-para ${(currentListDetail['completed'] == "true") ? 'completed' : 'not-completed'}">${currentListDetail['task']}</p>
                                    </div>
                                    <div class="task-category-block">
                                        <p class="task-category">${currentListDetail['category']}</p>     
                                    </div>
                                    <div class="input-check-block">
                                        <input type="checkbox" class="task-checkbox-input" ${(currentListDetail['completed'] == "true") ? 'checked' : ''}> 
                                    </div>
                                </div>
                            </div>`;
            listContainer.append(listBlock);
        } 
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
            //send this value in ajax on some url 
        }

       
    });

    $('#update').on('click', function(){
        let todoListsBlock = $('.todo-lists-block');
        if(todoListsBlock.length == 0){
            return;
        }else {
            //create an array which will include all the tasks as objects
            let tasksArray = [];
            //loop through each block and add each task details into the array
            for (let i = 0; i < todoListsBlock.length; i++){
                let currentTodoListBlock = $(todoListsBlock[i]);
                let childOfCurrentListBlock = currentTodoListBlock.children();
                let grandChildOfCurrentListBlock = childOfCurrentListBlock.children();
                let task = getText($(grandChildOfCurrentListBlock[0]));
                let category = getText($(grandChildOfCurrentListBlock[1]));
                let status = getTasksStatus($(grandChildOfCurrentListBlock[0]));

                let taskDetails = {
                    category : category,
                    completed : status,
                    task : task
                }

                tasksArray.push(taskDetails);
            }
        }
    });

    function getText(ele){
        let childOfEle = ele.children();
        let text = $(childOfEle[0]).text();
        return text;
    }
    function getTasksStatus(ele){
        let childOfEle = ele.children();
        let status = '';
        if($(childOfEle).hasClass('completed')){
            status = 'true';
        }else {
            status = 'false';
        }
        return status;
    }

    $(document).on('change', '.task-checkbox-input', function(){
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



});