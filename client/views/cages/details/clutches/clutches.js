var pageSession = new ReactiveDict();

Template.CagesDetailsClutches.onCreated(function() {
	
});

Template.CagesDetailsClutches.onDestroyed(function() {
	
});

Template.CagesDetailsClutches.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CagesDetailsClutches.events({
	
});

Template.CagesDetailsClutches.helpers({
	
});

var CagesDetailsClutchesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CagesDetailsClutchesViewSearchString");
	var sortBy = pageSession.get("CagesDetailsClutchesViewSortBy");
	var sortAscending = pageSession.get("CagesDetailsClutchesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["count", "clutchDate", "notes"];
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

var CagesDetailsClutchesViewExport = function(cursor, fileType) {
	var data = CagesDetailsClutchesViewItems(cursor);
	var exportFields = ["count", "clutchDate", "notes"];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.CagesDetailsClutchesView.onCreated(function() {
	
});

Template.CagesDetailsClutchesView.onDestroyed(function() {
	
});

Template.CagesDetailsClutchesView.onRendered(function() {
	pageSession.set("CagesDetailsClutchesViewStyle", "table");
	
});

Template.CagesDetailsClutchesView.events({
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
				pageSession.set("CagesDetailsClutchesViewSearchString", searchString);
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
					pageSession.set("CagesDetailsClutchesViewSearchString", searchString);
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
					pageSession.set("CagesDetailsClutchesViewSearchString", "");
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
		CagesDetailsClutchesViewExport(this.cage_clutches, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CagesDetailsClutchesViewExport(this.cage_clutches, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CagesDetailsClutchesViewExport(this.cage_clutches, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CagesDetailsClutchesViewExport(this.cage_clutches, "json");
	}

	
});

Template.CagesDetailsClutchesView.helpers({

	"insertButtonClass": function() {
		return CageClutches.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.cage_clutches || this.cage_clutches.count() == 0;
	},
	"isNotEmpty": function() {
		return this.cage_clutches && this.cage_clutches.count() > 0;
	},
	"isNotFound": function() {
		return this.cage_clutches && pageSession.get("CagesDetailsClutchesViewSearchString") && CagesDetailsClutchesViewItems(this.cage_clutches).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CagesDetailsClutchesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CagesDetailsClutchesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("CagesDetailsClutchesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("CagesDetailsClutchesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CagesDetailsClutchesViewStyle") == "gallery";
	}

	
});


Template.CagesDetailsClutchesViewTable.onCreated(function() {
	
});

Template.CagesDetailsClutchesViewTable.onDestroyed(function() {
	
});

Template.CagesDetailsClutchesViewTable.onRendered(function() {
	
});

Template.CagesDetailsClutchesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CagesDetailsClutchesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CagesDetailsClutchesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CagesDetailsClutchesViewSortAscending") || false;
			pageSession.set("CagesDetailsClutchesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CagesDetailsClutchesViewSortAscending", true);
		}
	}
});

Template.CagesDetailsClutchesViewTable.helpers({
	"tableItems": function() {
		return CagesDetailsClutchesViewItems(this.cage_clutches);
	}
});


Template.CagesDetailsClutchesViewTableItems.onCreated(function() {
	
});

Template.CagesDetailsClutchesViewTableItems.onDestroyed(function() {
	
});

Template.CagesDetailsClutchesViewTableItems.onRendered(function() {
	
});

Template.CagesDetailsClutchesViewTableItems.events({
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

		Meteor.call("cageClutchesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("cageClutchesRemove", me._id, function(err, res) {
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
		Router.go("cages.details.edit", mergeObjects(Router.currentRouteParams(), {cageId: UI._parentData(1).params.cageId, clutchId: this._id}));
		return false;
	}
});

Template.CagesDetailsClutchesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return CageClutches.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return CageClutches.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
