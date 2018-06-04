var express = require('express');
var path = require('path');
var fs = require('fs');
var cors = require('cors');
var app = express();
var port = process.env.PORT || 8086;

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.listen(port);
