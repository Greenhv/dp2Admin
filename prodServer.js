var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT || 5000;


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port);
