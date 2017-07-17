CageClutches.allow({
	insert: function (userId, doc) {
		return CageClutches.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return CageClutches.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return CageClutches.userCanRemove(userId, doc);
	}
});

CageClutches.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.ownerId) doc.ownerId = userId;
});

CageClutches.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

CageClutches.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

CageClutches.before.remove(function(userId, doc) {
	
});

CageClutches.after.insert(function(userId, doc) {
	
});

CageClutches.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

CageClutches.after.remove(function(userId, doc) {
	
});
