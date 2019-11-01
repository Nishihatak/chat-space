$(function() {


  var search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUser(user){
    var html =  `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                 <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>`
              search_list.append(html);
              
  }

  function appendErrMsgToHTML(msg){
    var html = 
                  `<div class="chat-group-user clearfix">
                      <p class="chat-group-user__name">${msg}</p>
                  </div>`;
                  search_list.append(html);
  }

  function appendAdd(user_id, user_name){
    var html = `<div class='chat-group-user'>
                <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                <p class='chat-group-user__name'>${user_name}</p>
                <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
              </div>`
              member_list.append(html);
  }
  $("#chat-group-users").on("click", ".chat-group-user__btn--remove", function(){
    $(this).parent().remove();
  })
  
  
  $("#user-search-field").on("keyup", function() {
    $("#user-search-field").off("keyup")
    var input = $("#user-search-field").val();  

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    
    .done(function(users){
      if (users.length !== 0) {
        $('#user-search-result').empty();
        users.forEach(function(user){
          appendUser(user)
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    
    .fail(function(){
      alert('error');
    })
    $(document).off("click").on("click", ".user-search-add", function () {
      var user_id = $(this).data('user-id');
      var user_name = $(this).data('user-name');
      $(this).parent().remove();
      appendAdd(user_id, user_name)
      
    })

    $(document).on("click", ".user-search-remove", function () {
      $(this).parent().remove();
    })
  });
});