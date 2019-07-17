$.ajax({
       type : "get",
       url : '/get/quotes',
       contentType : "application/json",
       dataType : 'json',
       success : function(data){

         for(var i = 0 ; i < data.length ; i++){
            $('.viewquotes').append("<div class='well'><p class='title'>"+data[i].title+"</p><form class='delete' action=/delete/"+data[i]._id+"/quote  method='post'><button class='btn-danger submit'>delete</button>\</form><p class='body'>"+data[i].body+"</p><p class='author'> ~ "+data[i].author+"</p></div>");
         }
       }
    })