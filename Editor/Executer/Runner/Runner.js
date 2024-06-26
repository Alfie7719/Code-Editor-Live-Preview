require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs' }});

require(['vs/editor/editor.main'], function() {
  var editor = monaco.editor.create(document.getElementById('editor'), {
    value: [
      '<!DOCTYPE html>',
      '<html lang="en">',
      '<head>',
      '  <meta charset="UTF-8">',
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
      '  <title>Document</title>',
      '</head>',
      '<body>',
      '',
      '</body>',
      '</html>'
    ].join('\n'),
    language: 'html'
  });

  var preview = document.getElementById('preview');

  function updatePreview() {
    var previewContent = editor.getValue();
    preview.contentDocument.open();
    preview.contentDocument.write(previewContent);
    preview.contentDocument.close();
  }

  updatePreview();

  editor.onDidChangeModelContent(updatePreview);

  var consoleOutput = document.getElementById('console');
  var oldLog = console.log;
  console.log = function(message) {
    oldLog.apply(console, arguments);
    consoleOutput.innerHTML += '<div>' + message + '</div>';
  };
});
