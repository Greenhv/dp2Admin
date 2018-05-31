var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port);
