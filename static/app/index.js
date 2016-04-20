var path = require('path');
var express = require('express');

var app = express();

app.get('/', function (req, res){
    res.send('Hello World!! Put something in ./public :)');
});

var staticPath = path.resolve(__dirname, '../public');
app.use(express.static(staticPath));

app.listen(process.env.PORT, process.env.HOST, function () {
  console.log('Server listening at port ' + process.env.PORT);
  console.log('http://first-sergiorgiraldo.c9users.io');
  console.log('all files in ~/workspace/static/public can be accessed');
});

