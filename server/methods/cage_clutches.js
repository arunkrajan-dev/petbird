Meteor.methods({
	"cageClutchesInsert": function(data) {
		if(!CageClutches.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return CageClutches.insert(data);
	},

	"cageClutchesUpdate": function(id, data) {
		var doc = CageClutches.findOne({ _id: id });
		if(!CageClutches.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		CageClutches.update({ _id: id }, { $set: data });
	},

	"cageClutchesRemove": function(id) {
		var doc = CageClutches.findOne({ _id: id });
		if(!CageClutches.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		CageClutches.remove({ _id: id });
	}
});
