var pageSession = new ReactiveDict();

Template.Edit.onCreated(function() {
	
});

Template.Edit.onDestroyed(function() {
	
});

Template.Edit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Edit.events({
	
});

Template.Edit.helpers({
	
});

Template.EditEditForm.onCreated(function() {
	
});

Template.EditEditForm.onDestroyed(function() {
	
});

Template.EditEditForm.onRendered(function() {
	

	pageSession.set("editEditFormInfoMessage", "");
	pageSession.set("editEditFormErrorMessage", "");

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

Template.EditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("editEditFormInfoMessage", "");
		pageSession.set("editEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var editEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(editEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("editEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("cages.details", mergeObjects(Router.currentRouteParams(), {cageId: self.params.cageId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("editEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("cageDeathsUpdate", t.data.cage_death._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.EditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("editEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("editEditFormErrorMessage");
	}
	
});
