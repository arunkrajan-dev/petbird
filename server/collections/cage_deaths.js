CageDeaths.allow({
	insert: function (userId, doc) {
		return CageDeaths.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CageDeaths.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CageDeaths.userCanRemove(userId, doc);
	}
});

CageDeaths.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CageDeaths.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CageDeaths.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

CageDeaths.before.remove(function(userId, doc) {
	
});

CageDeaths.after.insert(function(userId, doc) {
	
});

CageDeaths.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CageDeaths.after.remove(function(userId, doc) {
	
});
