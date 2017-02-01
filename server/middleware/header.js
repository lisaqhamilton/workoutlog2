//creating a header which is linked in app.js file//
module.exports = function(req,res,next) {
	res.header('access-control-allow-origin', '*');
	next();
};