this.CagesInsertController = RouteController.extend({
	template: "CagesInsert",
	

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
			Meteor.subscribe("cage_empty"),
			Meteor.subscribe("cage_list")
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
			cage_empty: Cages.findOne({_id:null}, {}),
			cage_list: Cages.find({}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});