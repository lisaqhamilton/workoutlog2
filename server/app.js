var express = require('express');
var app = express();

//creating a middleware header//
app.use(require('./middleware/header'));

//creating port 3000 and creating feedback to developer it is on//
app.listen(3000, function() {
	console.log("app is listening on 3000");
});

//creating link to api and creating feedback it is working//
app.use('/api/test', function(req, res) {
	res.send("Hello World");
});
