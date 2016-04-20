var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * PUT to upduser.
 */
router.put('/upduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToUpdate = req.body.id;
    collection.update({ '_id' : userToUpdate }, req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToDelete = req.params.id;
    collection.remove({ '_id' : userToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});

/*
 * GET user.
 */
router.get('/:nome', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    var userToGet = req.params.nome;
    var user = collection.find(
                    { 'username' : userToGet }, 
                    function(error, data){
                        if(error){
                            console.log(error);
                        } 
                        else {
                            res.render('user',{
                                title: userToGet,
                                result: data[0]
                            });
                        }    
                    }
                );
});

module.exports = router;