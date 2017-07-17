Cages.allow({
	insert: function (userId, doc) {
		return Cages.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Cages.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Cages.userCanRemove(userId, doc);
	}
});

Cages.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

Cages.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Cages.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Cages.before.remove(function(userId, doc) {
	
});

Cages.after.insert(function(userId, doc) {
	
});

Cages.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Cages.after.remove(function(userId, doc) {
	
});
