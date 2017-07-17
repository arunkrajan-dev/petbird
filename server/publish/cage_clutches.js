Meteor.publish("cage_clutches", function(cageId) {
	return CageClutches.find({cageId:cageId,ownerId:this.userId}, {});
});

Meteor.publish("cage_clutches_empty", function() {
	return CageClutches.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("cage_clutch", function(clutchId) {
	return CageClutches.find({_id:clutchId,ownerId:this.userId}, {});
});

