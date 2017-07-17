var pageSession = new ReactiveDict();

Template.Insert.onCreated(function() {
	
});

Template.Insert.onDestroyed(function() {
	
});

Template.Insert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Insert.events({
	
});

Template.Insert.helpers({
	
});

Template.InsertInsertForm.onCreated(function() {
	
});

Template.InsertInsertForm.onDestroyed(function() {
	
});

Template.InsertInsertForm.onRendered(function() {
	

	pageSession.set("insertInsertFormInfoMessage", "");
	pageSession.set("insertInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.InsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("insertInsertFormInfoMessage", "");
		pageSession.set("insertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var insertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(insertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("insertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("cages.details", mergeObjects(Router.currentRouteParams(), {cageId: self.params.cageId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("insertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.cageId = self.params.cageId;

				Meteor.call("cageDeathsInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("cages.details", mergeObjects(Router.currentRouteParams(), {cageId: this.params.cageId}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.InsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("insertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("insertInsertFormErrorMessage");
	}
	
});
