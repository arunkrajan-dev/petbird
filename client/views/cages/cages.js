var pageSession = new ReactiveDict();

Template.Cages.onCreated(function() {
	
});

Template.Cages.onDestroyed(function() {
	
});

Template.Cages.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Cages.events({
	
});

Template.Cages.helpers({
	
});

var CagesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CagesViewSearchString");
	var sortBy = pageSession.get("CagesViewSortBy");
	var sortAscending = pageSession.get("CagesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["number", "pairedDate", "Notes"];
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

var CagesViewExport = function(cursor, fileType) {
	var data = CagesViewItems(cursor);
	var exportFields = ["number", "pairedDate", "Notes"];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.CagesView.onCreated(function() {
	
});

Template.CagesView.onDestroyed(function() {
	
});

Template.CagesView.onRendered(function() {
	pageSession.set("CagesViewStyle", "table");
	
});

Template.CagesView.events({
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
				pageSession.set("CagesViewSearchString", searchString);
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
					pageSession.set("CagesViewSearchString", searchString);
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
					pageSession.set("CagesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("cages.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CagesViewExport(this.cage_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CagesViewExport(this.cage_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CagesViewExport(this.cage_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CagesViewExport(this.cage_list, "json");
	}

	
});

Template.CagesView.helpers({

	"insertButtonClass": function() {
		return Cages.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.cage_list || this.cage_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.cage_list && this.cage_list.count() > 0;
	},
	"isNotFound": function() {
		return this.cage_list && pageSession.get("CagesViewSearchString") && CagesViewItems(this.cage_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CagesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CagesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("CagesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("CagesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CagesViewStyle") == "gallery";
	}

	
});


Template.CagesViewTable.onCreated(function() {
	
});

Template.CagesViewTable.onDestroyed(function() {
	
});

Template.CagesViewTable.onRendered(function() {
	
});

Template.CagesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CagesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CagesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CagesViewSortAscending") || false;
			pageSession.set("CagesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("CagesViewSortAscending", true);
		}
	}
});

Template.CagesViewTable.helpers({
	"tableItems": function() {
		return CagesViewItems(this.cage_list);
	}
});


Template.CagesViewTableItems.onCreated(function() {
	
});

Template.CagesViewTableItems.onDestroyed(function() {
	
});

Template.CagesViewTableItems.onRendered(function() {
	
});

Template.CagesViewTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("cages.details", mergeObjects(Router.currentRouteParams(), {cageId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("cagesUpdate", this._id, values, function(err, res) {
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
						Meteor.call("cagesRemove", me._id, function(err, res) {
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
		Router.go("cages.edit", mergeObjects(Router.currentRouteParams(), {cageId: this._id}));
		return false;
	}
});

Template.CagesViewTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Cages.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Cages.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
