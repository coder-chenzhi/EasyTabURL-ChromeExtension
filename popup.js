/*LICENSE
Copyright (c) 2016 Coder-chenzhi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/* Google Analytics Code */
var _AnalyticsCode = 'UA-81857152-2';
var _gaq = _gaq || [];
_gaq.push(['_setAccount', _AnalyticsCode]);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


function list(tabs) {
  var contents = '';
  for (var i = 0; i < tabs.length; i++) {
    contents += tabs[i].url + '\n';
  }
  $('#url-list').val(contents);
  create_table(contents);
}

function create_table(contents) {
  urls = contents.split('\n');
  for (var i = urls.length - 1; i >= 0; i--) {
    $('#url-table').append('<tr><td>' + urls[i] +'</td></tr>');
  };
}

document.getElementById("generate").addEventListener('click', function(e) {
  /* Google Analytics Code */
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
  chrome.tabs.getAllInWindow(null, list);
  $('#copy').removeClass("disabled");
  $('#save').removeClass("disabled");
  $('#msg').addClass("alert-success");
  $('#msg').html('Get all tabs\' URLs!');
});

document.getElementById("copy").addEventListener('click', function(e) {
  /* Google Analytics Code */
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
  /* code here to copy, use a invisible textarea */
  var textarea = $('#url-list');
  textarea.focus();
  var result = document.execCommand('copy');
  if (result) {
    textarea.select();
    $('#msg').html('Copied to clipboard(Chrome Only!)!');
    $('#msg').addClass("alert-success");
  } else {
    $('#msg').html('Error copying to clipboard!');
    $('#msg').addClass("alert-danger");
  }
});

document.getElementById("load").addEventListener('change', function(e) {
  /* Google Analytics Code */
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
  var file = document.getElementById("load").files[0];
  var textType = /text.*/;
  if (file.type.match(textType)) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#url-list').val(reader.result);
      create_table(reader.result);
      urls = reader.result.split('\n');
      for (var i = urls.length - 1; i >= 0; i--) {
        chrome.tabs.create({ url: urls[i] });
      };
    }

    reader.readAsText(file);
    $('#copy').removeClass("disabled");
    $('#save').removeClass("disabled");
    $('#msg').html('File loaded!');
    $('#msg').addClass("alert-success");
  
  } else {
    $('#msg').html('File not supported!');
    $('#msg').addClass("alert-danger");
  }
});

document.getElementById("save").addEventListener('click', function(e) {
  /* Google Analytics Code */
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
  var textToSave = $("#url-list").val();
  var textToSaveAsBlob = new Blob([textToSave], {
    type: "text/plain"
  });
  var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

  var downloadLink = document.createElement("a");
  var date = new Date();

  downloadLink.download = "URLs_" + date.getFullYear() + "_" + date.getMonth() + "_" + date.getDate() + ".txt";
  downloadLink.innerHTML = "Download File";
  downloadLink.href = textToSaveAsURL;
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);

  downloadLink.click();
});