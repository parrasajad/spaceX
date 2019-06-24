const app = module.exports = require('express')();
const User = require('../models/user');
const mongoose = require('mongoose');


mongoose.connect('mongodb://locahost:27017/example',  { useNewUrlParser: true });



app.post('/', function(req, res){
    var newUser = new User();
    newUser.first_name = req.body.first_name;
    newUser.last_name = req.body.last_name;
    newUser.save(function(err, user){
        if(err) {
            console.log("error while saving the user")
            res.status(500).send('error saving user');
        } else {
            console.log(user);
            res.send(user);
        }
    });
});

app.put('/:id', function(req, res){
    User.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            last_name: req.body.last_name,
        }
    },{
        upsert: true
    },function(err, newUser){
        if(err) {
            console.log("error while saving the user")
            res.status(500).send('error updating user');
        } else {
            console.log(newUser);
            res.send(newUser);
        }
    });
});