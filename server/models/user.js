//user model created using sequelize
//talks to the user table
module.exports = function(sequelize,DataTypes) {
	var User = sequelize.define('user', {
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING
		});
		return User;
};

module.exports = function(sequelize,DataTypes) {
	return sequelize.define('user', {
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING
	});
};
