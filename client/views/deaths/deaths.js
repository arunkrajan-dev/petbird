var pageSession = new ReactiveDict();

Template.Deaths.onCreated(function() {
	
});

Template.Deaths.onDestroyed(function() {
	
});

Template.Deaths.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Deaths.events({
	
});

Template.Deaths.helpers({
	
});

var DeathsViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("DeathsViewSearchString");
	var sortBy = pageSession.get("DeathsViewSortBy");
	var sortAscending = pageSession.get("DeathsViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["date", "notes"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var DeathsViewExport = function(cursor, fileType) {
	var data = DeathsViewItems(cursor);
	var exportFields = ["date", "notes"];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.DeathsView.onCreated(function() {
	
});

Template.DeathsView.onDestroyed(function() {
	
});

Template.DeathsView.onRendered(function() {
	pageSession.set("DeathsViewStyle", "table");
	
});

Template.DeathsView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("DeathsViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("DeathsViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("DeathsViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("cages.details.insert", mergeObjects(Router.currentRouteParams(), {cageId: this.params.cageId}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		DeathsViewExport(this.cage_deaths, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		DeathsViewExport(this.cage_deaths, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		DeathsViewExport(this.cage_deaths, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		DeathsViewExport(this.cage_deaths, "json");
	}

	
});

Template.DeathsView.helpers({

	"insertButtonClass": function() {
		return CageDeaths.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.cage_deaths || this.cage_deaths.count() == 0;
	},
	"isNotEmpty": function() {
		return this.cage_deaths && this.cage_deaths.count() > 0;
	},
	"isNotFound": function() {
		return this.cage_deaths && pageSession.get("DeathsViewSearchString") && DeathsViewItems(this.cage_deaths).length == 0;
	},
	"searchString": function() {
		return pageSession.get("DeathsViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("DeathsViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("DeathsViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("DeathsViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("DeathsViewStyle") == "gallery";
	}

	
});


Template.DeathsViewTable.onCreated(function() {
	
});

Template.DeathsViewTable.onDestroyed(function() {
	
});

Template.DeathsViewTable.onRendered(function() {
	
});

Template.DeathsViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("DeathsViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("DeathsViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("DeathsViewSortAscending") || false;
			pageSession.set("DeathsViewSortAscending", !sortAscending);
		} else {
			pageSession.set("DeathsViewSortAscending", true);
		}
	}
});

Template.DeathsViewTable.helpers({
	"tableItems": function() {
		return DeathsViewItems(this.cage_deaths);
	}
});


Template.DeathsViewTableItems.onCreated(function() {
	
});

Template.DeathsViewTableItems.onDestroyed(function() {
	
});

Template.DeathsViewTableItems.onRendered(function() {
	
});

Template.DeathsViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("cageDeathsUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("cageDeathsRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("cages.details.edit", mergeObjects(Router.currentRouteParams(), {cageId: UI._parentData(1).params.cageId, deathId: this._id}));
		return false;
	}
});

Template.DeathsViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return CageDeaths.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return CageDeaths.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
