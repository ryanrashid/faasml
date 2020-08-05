$(document).ready(function() {
    $("#home").css("height", $("#title").height());
});

$(function() {
    $("#image-input").submit(function() {
        display();
        document.getElementById("image-input").classList.add("disabled");
        $.ajax({
            type: "POST",
            url: "/process",
            data: $("#image-input").serialize(),
            success: function(data) {
                var obj = JSON.parse(data);
                for (i = 0; i < obj.length; i++) {
                    var txt = document.createElement("P");
                    if (i < 3) {
                        txt.innerHTML = "<b>" + obj[i].name + "</b>: ";
                    } else {
                        txt.innerHTML = obj[i].name + ": ";
                    }
                    txt.innerHTML += (obj[i].score * 100).toFixed(4) + "%";
                    document.getElementById("mldata").appendChild(txt);
                }
                document.getElementById("image-input").classList.remove("disabled");
                document.getElementById("url").value = "";
            }
        });
        return false;
    });
});

$(function() {
   $("#image-input2").submit(function() {
       display();
       document.getElementById("image-input2").classList.add("disabled");
       $.ajax({
           type: "POST",
           url: "/blur",
           data: $("#image-input2").serialize(),
           success: function(data) {
               document.getElementById("image-input2").classList.remove("disabled");
               document.getElementById("url").value = "";
               var blurred = document.createElement("img");
               blurred.style.maxWidth = "100%";
               blurred.style.borderRadius = "10px";
               blurred.src = 'data:image/jpeg;base64, ' + data;
               document.getElementById("mldata").appendChild(blurred);
           }
       });
       return false;
   });
});

$(function() {
   $("#image-input3").submit(function() {
       display();
       document.getElementById("image-input3").classList.add("disabled");
       $.ajax({
           type: "POST",
           url: "/draw",
           data: $("#image-input3").serialize(),
           success: function(data) {
               document.getElementById("image-input3").classList.remove("disabled");
               document.getElementById("url").value = "";
               var sketch = document.createElement("img");
               sketch.style.maxWidth = "100%";
               sketch.style.borderRadius = "10px";
               sketch.src = 'data:image/jpeg;base64, ' + data;
               document.getElementById("mldata").appendChild(sketch);
           }
       });
       return false;
   });
});

$(function() {
   $("#image-input4").submit(function() {
       display();
       document.getElementById("image-input4").classList.add("disabled");
       $.ajax({
           type: "POST",
           url: "/color",
           data: $("#image-input4").serialize(),
           success: function(data) {
               document.getElementById("image-input4").classList.remove("disabled");
               document.getElementById("url").value = "";
               var sketch = document.createElement("img");
               sketch.style.maxWidth = "100%";
               sketch.style.borderRadius = "10px";
               sketch.src = 'data:image/jpeg;base64, ' + data;
               document.getElementById("mldata").appendChild(sketch);
           }
       });
       return false;
   });
});

function display() {
    $("#mldata").empty();
    $('#img-container').empty();
    var url = $("form input").val();
    var img = document.createElement("img");
    img.src = url;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "10px";
    document.getElementById("img-container").appendChild(img);
}
