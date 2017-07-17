var pageSession = new ReactiveDict();

Template.CagesDetailsInsert.onCreated(function() {
	
});

Template.CagesDetailsInsert.onDestroyed(function() {
	
});

Template.CagesDetailsInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CagesDetailsInsert.events({
	
});

Template.CagesDetailsInsert.helpers({
	
});

Template.CagesDetailsInsertInsertForm.onCreated(function() {
	
});

Template.CagesDetailsInsertInsertForm.onDestroyed(function() {
	
});

Template.CagesDetailsInsertInsertForm.onRendered(function() {
	

	pageSession.set("cagesDetailsInsertInsertFormInfoMessage", "");
	pageSession.set("cagesDetailsInsertInsertFormErrorMessage", "");

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

Template.CagesDetailsInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("cagesDetailsInsertInsertFormInfoMessage", "");
		pageSession.set("cagesDetailsInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var cagesDetailsInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(cagesDetailsInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("cagesDetailsInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("cages.details", mergeObjects(Router.currentRouteParams(), {cageId: self.params.cageId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("cagesDetailsInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				values.cageId = self.params.cageId;

				Meteor.call("cageClutchesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
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

Template.CagesDetailsInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("cagesDetailsInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("cagesDetailsInsertInsertFormErrorMessage");
	}
	
});
