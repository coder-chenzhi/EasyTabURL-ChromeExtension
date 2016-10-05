/*LICENSE
Copyright (c) 2016 Coder-chenzhi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
function list(tabs) {
  var contents = '';
  for (var i = 0; i < tabs.length; i++) {
    contents += tabs[i].url + '\n';
  }
  $('#url-list').val(contents);
}

document.getElementById("generate").addEventListener('click', function(e) {
  chrome.tabs.getAllInWindow(null, list);
  $('#copy').removeClass("disabled");
  $('#save').removeClass("disabled");
  $('#msg').addClass("alert-success");
  $('#msg').html('Get all tabs\' URLs!');
});

document.getElementById("copy").addEventListener('click', function(e) {
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
  var file = document.getElementById("load").files[0];
  var textType = /text.*/;
  if (file.type.match(textType)) {
    var reader = new FileReader();

    reader.onload = function(e) {
      $('#url-list').val(reader.result);
    }

    reader.readAsText(file);
    $('#copy').removeClass("disabled");
    $('#save').removeClass("disabled");
  } else {
    $('#msg').html('File not supported!');
    $('#msg').addClass("alert-danger");
  }
});

document.getElementById("save").addEventListener('click', function(e) {
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