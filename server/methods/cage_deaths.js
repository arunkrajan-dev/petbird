Meteor.methods({
	"cageDeathsInsert": function(data) {
		if(!CageDeaths.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return CageDeaths.insert(data);
	},

	"cageDeathsUpdate": function(id, data) {
		var doc = CageDeaths.findOne({ _id: id });
		if(!CageDeaths.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		CageDeaths.update({ _id: id }, { $set: data });
	},

	"cageDeathsRemove": function(id) {
		var doc = CageDeaths.findOne({ _id: id });
		if(!CageDeaths.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		CageDeaths.remove({ _id: id });
	}
});
