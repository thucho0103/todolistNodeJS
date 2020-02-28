$(document).ready(function(){ 

      $('.btn-add-task').on('click', function(){   
        let item = $('#task-title').val().trim();
        let desc = $('#task-desc').val();
        let check = document.querySelector('.btn-add-task').textContent;
        console.log(check);
        let timestamp = new Date;
        var todo = {
          item: item,
          desc: desc,
          timestamp: timestamp.toLocaleDateString(), 
          //status : $('#hight').val(),
        };
        if(item !='' && check ==='Add'){
          $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){
            //do something with the data via front-end framework
            setTimeout(() => {
              location.reload();
            }, 500);
          }
        });
        }
        else if (check !='Save')
        {
          document.querySelector('.overlay > span').classList.add('-w-animation');
          document.querySelector('.overlay > span').innerText = 'Fill at least the title of the task, description is not required 😵';
          document.querySelector('.overlay > span').addEventListener('animationend', () => {
            document.querySelector('.overlay > span').classList.remove('-w-animation');
            document.querySelector('.overlay > span').innerText = 'Fill at least the title of the task, description is not required 😁';
          });
        }
        return false;  
    });
    
    $('.btn-edit-task').on('click', function(){
      let check = document.querySelector('.btn-add-task').textContent
      const task = this.parentNode.parentNode.parentNode;
      let itemUpdate = task.querySelector(".task-title").innerText;//.replace(/ /gi,"_");
      console.log('ajax update '+ itemUpdate);
        $('.btn-add-task').on('click', function(){
          let item = $('#task-title').val().trim();
          let timestamp = new Date;
          let desc = $('#task-desc');
          var todo = {
            item: item,
            desc: desc.val(),
            timestamp: timestamp.toLocaleDateString(), 
            //status : $('#hight').val(),
          };
          if(item !='' && check === 'Save'){
              $.ajax({
              type: 'PUT',
              url: '/todo/' + itemUpdate,
              data: todo,
              success: function(data){
                  //do something with the data via front-end framework
                  setTimeout(() => {
                    location.reload();
                  }, 500);
              }
            });
          } else
              if (check !='Save') {
              document.querySelector('.overlay > span').classList.add('-w-animation');
              document.querySelector('.overlay > span').innerText = 'Fill at least the title of the task, description is not required 😵';
              document.querySelector('.overlay > span').addEventListener('animationend', () => {
              document.querySelector('.overlay > span').classList.remove('-w-animation');
              document.querySelector('.overlay > span').innerText = 'Fill at least the title of the task, description is not required 😁';
              });
              }
          });  
        }); 

    $('.btn-remove-task').on('click', function(){
        //let item = $(this).text().replace(/ /g, "");
        //let item = $("#task-title").parent(this).text();
        const task = this.parentNode.parentNode.parentNode;
        let item =  task.querySelector(".task-title").innerText;//.replace(/ /gi,"_");
        console.log('ajax delete '+item);
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + item,
          success: function(data){
            //do something with the data via front-end framework
          }
        });
    });  
});