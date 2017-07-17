Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"cages",
	"cages.insert",
	"cages.details",
	"cages.details.clutches",
	"cages.details.insert",
	"cages.details.edit",
	"cages.edit",
	"deaths",
	"insert",
	"edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout"
];

Router.freeRoutes = [
	
];

Router.roleMap = [
	
];

Router.defaultFreeRoute = "";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "home_private";

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("/", {name: "home_public", controller: "HomePublicController"});
	this.route("/login", {name: "login", controller: "LoginController"});
	this.route("/register", {name: "register", controller: "RegisterController"});
	this.route("/forgot_password", {name: "forgot_password", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", controller: "HomePrivateController"});
	this.route("/cages", {name: "cages", controller: "CagesController"});
	this.route("/cages/insert", {name: "cages.insert", controller: "CagesInsertController"});
	this.route("/cages/details/:cageId", {name: "cages.details", controller: "CagesDetailsController"});
	this.route("/cages/details/:cageId/clutches", {name: "cages.details.clutches", controller: "CagesDetailsClutchesController"});
	this.route("/cages/details/:cageId/insert", {name: "cages.details.insert", controller: "CagesDetailsInsertController"});
	this.route("/cages/details/:cageId/edit/:clutchId", {name: "cages.details.edit", controller: "CagesDetailsEditController"});
	this.route("/cages/edit/:cageId", {name: "cages.edit", controller: "CagesEditController"});
	this.route("/deaths", {name: "deaths", controller: "DeathsController"});
	this.route("/insert", {name: "insert", controller: "InsertController"});
	this.route("/edit/:deathId", {name: "edit", controller: "EditController"});
	this.route("/user_settings", {name: "user_settings", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", controller: "LogoutController"});
});
