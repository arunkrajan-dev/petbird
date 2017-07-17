Meteor.publish("cage_deaths", function(cageId) {
	return CageDeaths.find({cageId:cageId,ownerId:this.userId}, {});
});

Meteor.publish("cage_deaths_empty", function() {
	return CageDeaths.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("cage_death", function(deathId) {
	return CageDeaths.find({_id:deathId,ownerId:this.userId}, {});
});

