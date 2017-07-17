Meteor.publish("cage_list", function() {
	return Cages.find({ownerId:this.userId}, {});
});

Meteor.publish("cage_empty", function() {
	return Cages.find({_id:null,ownerId:this.userId}, {});
});

Meteor.publish("cage_details", function(cageId) {
	return Cages.find({_id:cageId,ownerId:this.userId}, {});
});

