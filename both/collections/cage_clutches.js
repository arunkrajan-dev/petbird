this.CageClutches = new Mongo.Collection("cage_clutches");

this.CageClutches.userCanInsert = function(userId, doc) {
	return true;
};

this.CageClutches.userCanUpdate = function(userId, doc) {
	return userId && doc.ownerId == userId;
};

this.CageClutches.userCanRemove = function(userId, doc) {
	return userId && doc.ownerId == userId;
};
