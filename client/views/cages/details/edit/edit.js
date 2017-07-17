var pageSession = new ReactiveDict();

Template.CagesDetailsEdit.onCreated(function() {
	
});

Template.CagesDetailsEdit.onDestroyed(function() {
	
});

Template.CagesDetailsEdit.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CagesDetailsEdit.events({
	
});

Template.CagesDetailsEdit.helpers({
	
});

Template.CagesDetailsEditEditForm.onCreated(function() {
	
});

Template.CagesDetailsEditEditForm.onDestroyed(function() {
	
});

Template.CagesDetailsEditEditForm.onRendered(function() {
	

	pageSession.set("cagesDetailsEditEditFormInfoMessage", "");
	pageSession.set("cagesDetailsEditEditFormErrorMessage", "");

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

Template.CagesDetailsEditEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("cagesDetailsEditEditFormInfoMessage", "");
		pageSession.set("cagesDetailsEditEditFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var cagesDetailsEditEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(cagesDetailsEditEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("cagesDetailsEditEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("cages.details", mergeObjects(Router.currentRouteParams(), {cageId: self.params.cageId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("cagesDetailsEditEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("cageClutchesUpdate", t.data.cage_clutch._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.CagesDetailsEditEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("cagesDetailsEditEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("cagesDetailsEditEditFormErrorMessage");
	}
	
});
