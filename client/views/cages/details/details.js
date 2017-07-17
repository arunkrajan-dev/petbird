var pageSession = new ReactiveDict();

Template.CagesDetails.onCreated(function() {
	
});

Template.CagesDetails.onDestroyed(function() {
	
});

Template.CagesDetails.onRendered(function() {
	

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CagesDetails.events({
	
});

Template.CagesDetails.helpers({
	
});

Template.CagesDetailsDetailsForm.onCreated(function() {
	
});

Template.CagesDetailsDetailsForm.onDestroyed(function() {
	
});

Template.CagesDetailsDetailsForm.onRendered(function() {
	

	pageSession.set("cagesDetailsDetailsFormInfoMessage", "");
	pageSession.set("cagesDetailsDetailsFormErrorMessage", "");

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

Template.CagesDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("cagesDetailsDetailsFormInfoMessage", "");
		pageSession.set("cagesDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var cagesDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(cagesDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("cagesDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("cagesDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("cages", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.CagesDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("cagesDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("cagesDetailsDetailsFormErrorMessage");
	}
	
});
