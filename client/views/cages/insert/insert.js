var pageSession = new ReactiveDict();

Template.CagesInsert.onCreated(function() {
	
});

Template.CagesInsert.onDestroyed(function() {
	
});

Template.CagesInsert.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.CagesInsert.events({
	
});

Template.CagesInsert.helpers({
	
});

Template.CagesInsertInsertForm.onCreated(function() {
	
});

Template.CagesInsertInsertForm.onDestroyed(function() {
	
});

Template.CagesInsertInsertForm.onRendered(function() {
	

	pageSession.set("cagesInsertInsertFormInfoMessage", "");
	pageSession.set("cagesInsertInsertFormErrorMessage", "");

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

Template.CagesInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("cagesInsertInsertFormInfoMessage", "");
		pageSession.set("cagesInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var cagesInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(cagesInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("cagesInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("cages.details", mergeObjects(Router.currentRouteParams(), {cageId: newId}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("cagesInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("cagesInsert", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("cages", mergeObjects(Router.currentRouteParams(), {}));
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

Template.CagesInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("cagesInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("cagesInsertInsertFormErrorMessage");
	}
	
});
