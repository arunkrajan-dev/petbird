this.Cages = new Mongo.Collection("cages");

this.Cages.userCanInsert = function(userId, doc) {
	return true;
};

this.Cages.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
};

this.Cages.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
};
