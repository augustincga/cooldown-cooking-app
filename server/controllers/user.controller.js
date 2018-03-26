var passwordHash = require('password-hash');

var User = require('../models/user.model.js');

exports.registerUser = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    let processedUser = req.body;
    processedUser.password = passwordHash.generate(processedUser.password);

    let user = new User(processedUser);

	User.findOne({email: req.body.email}, function(err, data){
		if(err) {
			console.log(err);
			res.status(500).send({message: "Some error occurred while trying to register."});
		} else if(data === null) {
			user.save();
			res.status(200).send(user);
		} else {
			res.status(422).send({message: "E-mail address already exists. Please choose another one."})
		}
	});
};

exports.loginUser = function(req, res) {
    if(!req.body) {
        return res.status(400).send({message: req.body});
    }

    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log(err);
            res.status(500).send({message: "There was an error trying to login."});
        } else if(user !== null && passwordHash.verify(req.body.password, user.password)){
            res.status(200).send(user);
        } else {
            res.status(403).send({message: "Credentials do not match."});
        }
    });
};