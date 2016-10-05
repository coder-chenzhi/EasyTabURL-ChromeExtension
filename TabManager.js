/*
<license>
Get opened tabs URLs - a Google Chrome extension
Copyright 2010 Christophe Benz.

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
</license>

Icon from Silk icon set:
http://www.famfamfam.com/lab/icons/silk/
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