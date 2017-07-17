this.DeathsController = RouteController.extend({
	template: "Deaths",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("cage_deaths", this.params.cageId)
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
			cage_deaths: CageDeaths.find({cageId:this.params.cageId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});