var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var sequelize = require('./db.js');

var User = sequelize.import('./models/user.js');

//creates a table in postgres
User.sync();
//DANGER: deletes the entire table
// User.sync({force:true});

//telling the app to use body-Parser
app.use(bodyParser.json());

//creating a middleware header//
app.use(require('./middleware/header'));

app.use('/api/user', require('./routes/user'));

//creating link to api and creating feedback it is working//
app.use('/api/test', function(req, res) {
	res.send("Hello World");
});

//creating port 3000 and creating feedback to developer it is on//
app.listen(3000, function() {
	console.log("app is listening on 3000");
});

//build a user model in squelize moved to user.js
// var User = sequelize.define('user', {
// 	username: Sequelize.STRING,
// 	passwordhash: Sequelize.STRING,
// });
