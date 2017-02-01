var express = require('express');
var app = express();
var bodyParser = require('body-parser');




//creating a middleware header//
app.use(require('./middleware/header'));

//creating link to api and creating feedback it is working//
app.use('/api/test', function(req, res) {
	res.send("Hello World");
});

//creating port 3000 and creating feedback to developer it is on//
app.listen(3000, function() {
	console.log("app is listening on 3000");
});

var Sequelize = require('sequelize');
var sequelize = new Sequelize('workoutlog', 'postgres', 'codequeen', {
	host: 	'localhost',
	dialect: 	'postgres'  
});

sequelize.authenticate().then(
	function() {
		console.log("connected to workoutlog postgres db");
	},
	function(err) {
		console.log(err);
	}
);

//telling the app to use body-Parser
app.use(bodyParser.json());



//build a user model in squelize
var User = sequelize.define('user', {
	username: Sequelize.STRING,
	passwordhash: Sequelize.STRING,
});
//creates a table in postgres
User.sync();

//DANGER: deletes the entire table
//User.sync({force:true});

//creating an endpoint
app.post('/api/user', function(req,res) {
	var username = req.body.user.username;
	var pass = req.body.user.password;
		User.create( {
			username: username,
			passwordhash: ""
		}).then(
			//Sequelize is going to return the object it created from db
			function createSuccess(user) {
				res.json({
					user: user,
					message: 'create'
				});
			},
			function createError(err) {
				res.send(500,err.message);
			}
		);
});