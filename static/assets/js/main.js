var reader = new FileReader();
var data = new FormData();
var xhr = new XMLHttpRequest(); 
var check_status_timer;
var mailid_element = document.getElementById("mailid");
var linkedin_element = document.getElementById("linkedin");

function search() {
  var xhr = new XMLHttpRequest();
  data = new FormData();
  data.append('mailid',mailid_element.value)

  xhr.open("POST", 'https://'+window.location.host+"/search");  
  xhr.send(data);
  localStorage.setItem("mailid",mailid_element.value)
  xhr.onreadystatechange = function() { 
    console.log(xhr.readyState,xhr.status,xhr.responseText)
    if(xhr.readyState == 4 && xhr.status == 200) {
        check_status_timer = setInterval(check_status,300); //300ms
  };
}
  }

  function check_status(){
    xhr = new XMLHttpRequest(); 
    data = new FormData()
    data.append('mailid',localStorage.getItem("mailid"))

    xhr.open("POST", 'https://'+window.location.host+"/status");  
    xhr.send(data); 
    var status = 0;
    xhr.onreadystatechange = function() { 
     if(xhr.readyState == 4 && xhr.status == 200) {
         console.log(xhr.responseText)
        if (xhr.responseText != "-1"){
            clearInterval(check_status_timer);
            linkedin_element.value = xhr.responseText
        }
    }}
  }
