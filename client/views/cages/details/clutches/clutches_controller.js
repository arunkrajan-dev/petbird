this.CagesDetailsClutchesController = RouteController.extend({
	template: "CagesDetails",
	

	yieldTemplates: {
		'CagesDetailsClutches': { to: 'CagesDetailsSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("CagesDetails"); this.render("loading", { to: "CagesDetailsSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("cage_clutches", this.params.cageId),
			Meteor.subscribe("cage_details", this.params.cageId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			cage_clutches: CageClutches.find({cageId:this.params.cageId}, {}),
			cage_details: Cages.findOne({_id:this.params.cageId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});