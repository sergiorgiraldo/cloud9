var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var Client = require('node-rest-client').Client;
     
    var client = new Client();
     
    client.get('http://jsonplaceholder.typicode.com/posts/1', 
        function (data, response) {
            //console.log(data);
            res.render('index', { "result": data, title: 'Express'});
        }    
    );
});


/* GET a random user */
router.get('/randomuser', function(req, res, next) {
    var Client = require('node-rest-client').Client;
     
    var client = new Client();
     
    client.get('http://api.randomuser.me/', 
        function (data, response) {
            var result = JSON.parse(data).results[0];
            //console.log(result);
            res.render('index_1', { "result": result, title: 'Express'});
        }    
    );
});

/* GET random posts */
router.get('/posts', function(req, res, next) {
    var Client = require('node-rest-client').Client;
     
    var client = new Client();
     
    client.get('http://jsonplaceholder.typicode.com/posts', 
        function (data, response) {
            //console.log(data);
            res.render('posts', { "result": data, title: 'All posts'});
        }    
    );
});

module.exports = router;
