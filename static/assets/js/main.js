var reader = new FileReader();
var data = new FormData();
var xhr = new XMLHttpRequest(); 
var check_status_timer;
var mailid_element = document.getElementById("mailid");
var linkedin_element = document.getElementById("linkedin");
var apikey = document.getElementById("apikey");
var apikey_div = document.getElementById("apikey_div");
apikey_div.style.display = 'none'

function copyToClipboard(text, el) {
  var copyTest = document.queryCommandSupported('copy');
  var elOriginalText = el.attr('data-bs-original-title');

  if (copyTest === true) {
    var copyTextArea = document.createElement("textarea");
    copyTextArea.value = text;
    document.body.appendChild(copyTextArea);
    copyTextArea.select();
    try {
      var successful = document.execCommand('copy');
      var msg = successful ? 'Copied!' : 'Whoops, not copied!';
      el.attr('data-bs-original-title', msg).tooltip('show');
    } catch (err) {
      console.log('Oops, unable to copy');
    }
    document.body.removeChild(copyTextArea);
    el.attr('data-bs-original-title', elOriginalText);
  } else {
    window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
  }
}

$(document).ready(function() {
  $('.js-tooltip').tooltip();
  $('.js-copy').click(function() {
    var text = linkedin_element.value;
    var el = $(this);
    copyToClipboard(text, el);
  });
});

function search() {
  var xhr = new XMLHttpRequest();
  data = new FormData();
  data.append('mailid',mailid_element.value)
  api_value = "-1"
  if (apikey.value != ""){
    api_value = apikey.value
  }
  data.append('apikey',api_value)

  xhr.open("POST", 'https://'+window.location.host+"/search");  
  xhr.send(data);
  localStorage.setItem("mailid",mailid_element.value)
  xhr.onreadystatechange = function() { 
    console.log(xhr.readyState,xhr.status,xhr.responseText)
    if(xhr.readyState == 4 && xhr.status == 200) {
        linkedin_element.placeholder = "Searching..."
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
            linkedin_element.placeholder = "Click SEARCH to start searching"
            clearInterval(check_status_timer);
            linkedin_element.value = xhr.responseText
        }
    }}
  }

  function showDiv(element)
{
    if (apikey_div.style.display == "none"){
      apikey_div.style.display = ''
    }
    else {
      apikey_div.style.display = 'none'
    }
}
