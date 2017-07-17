Meteor.methods({
	"cagesInsert": function(data) {
		if(!Cages.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Cages.insert(data);
	},

	"cagesUpdate": function(id, data) {
		var doc = Cages.findOne({ _id: id });
		if(!Cages.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Cages.update({ _id: id }, { $set: data });
	},

	"cagesRemove": function(id) {
		var doc = Cages.findOne({ _id: id });
		if(!Cages.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Cages.remove({ _id: id });
	}
});
