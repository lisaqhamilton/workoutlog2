var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db.js');
var User = sequelize.import('../models/user.js');


//1) Need a function that searches for a particular user that matches the incoming request
//2) If the request is sucessful and the username matches, we need to so some stuff
	//Compare the password
		//if password matches, show success and give user a token
		//if password doesn't match, show failure to authenticate
	//If the request is not successful and there is not a user that matches that request
	//throw an error
	//If request was not successful and user does not exist, throw an error	

router.post(' / ', function(res,req) {
	User.findOne( {where: {username: req.body.user.username}}).then(
		function(user) {
			if (user) {
				bcrypt.compare(req.body.user.password, user.passwordhash, function(err,matches) {
					if (matches) {
						var token = jwt.sign( {id: user.id}, "i_am_secret", {expiresIn: 60*60*24});
						res.json({
							user: user,
							message: "successfully authenticated",
							sessionToken: token
						});
					} else {
						res.status(500).send({ error: "failed to authenticate"});
					}
				});
			} else {
				res.status(500).send({ error: "failed to authenticate"});
			}
		},
		function(err) {
			res.json(err);
		}
	);
});

module.exports = router;