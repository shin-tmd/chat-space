$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="messages">
        <div class="member">
          <div class="member__name">
            ${message.user_name}
          </div>
          <div class="member__timestamp">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
          <div class="message__content">
            ${message.content}
          </div>
          <img class="message__content" src=${message.image} >
          </div>
        </div>
      </div>`
     return html;
   } else {
     var html =
     `<div class="messages">
        <div class="member">
          <div class="member__name">
            ${message.user_name}
          </div>
          <div class="member__timestamp">
            ${message.created_at}
          </div>
        </div>
        <div class="message">
          <div class="message__content">
            ${message.content}
          </div>
        </div>
      </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
     })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__member-message').append(html);
      $('form')[0].reset();
      $('.main-chat__member-message').animate({ scrollTop: $('.main-chat__member-message')[0].scrollHeight});
      $('.submit-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  })
});