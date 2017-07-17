this.CageDeaths = new Mongo.Collection("cage_deaths");

this.CageDeaths.userCanInsert = function(userId, doc) {
	return true;
};

this.CageDeaths.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
};

this.CageDeaths.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
};
