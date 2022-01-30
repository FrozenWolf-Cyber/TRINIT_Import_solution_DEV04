var reader = new FileReader();
var data = new FormData();
var xhr = new XMLHttpRequest(); 
var check_status_timer;
var mailid_element = document.getElementById("mailid");
var linkedin_element = document.getElementById("linkedin");


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

// $(document).ready(function() {
//   // Initialize the tooltip.
//   $('#copy-button').tooltip();

//   // When the copy button is clicked, select the value of the text box, attempt
//   // to execute the copy command, and trigger event to update tooltip message
//   // to indicate whether the text was successfully copied.
//   $('#copy-button').bind('click', function() {
//     mailid_element.setSelectionRange(0, mailid_element.value.length + 1);
//     try {
//       var success = document.execCommand('copy');
//       if (success) {
//         $('#copy-button').trigger('copied', ['Copied!']);
//       } else {
//         $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
//       }
//     } catch (err) {
//       $('#copy-button').trigger('copied', ['Copy with Ctrl-c']);
//     }
//   });

//   // Handler for updating the tooltip message.
//   $('#copy-button').bind('copied', function(event, message) {
//     $(this).attr('title', message)
//         .tooltip('fixTitle')
//         .tooltip('show')
//         .attr('title', "Copy to Clipboard")
//         .tooltip('fixTitle');
//   });
// });


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
