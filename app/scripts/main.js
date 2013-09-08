$(document).ready(function () {
	animateGettingStarted();
	animateShowPreview();

});

function getFormValues() {
	var routeNameVal = $("#routename").val()
	var routeRatingVal = $("#routerating").val()
	var routeDegreeVal = $("#routedegree").val()
	var rockTypeVal = $("#rocktype").val()
	var routeDescVal = $("#routedesc").val()

	var formData = {
		routename: routenameVal,
		routerating: routeRatingVal,
		routedegree: routeDegreeVal,
		rocktype: rockTypeVal,
		routedesc: routeDescVal
	}
	return formData;
}


var Route = function (options) {
	this.options = options || {};
	this.routename = options.routename;
	this.routerating = options.routerating;
	this.routedegree = options.routedegree;
	this.rocktype = options.rocktype;
	this.routedesc = options.routedesc;
	this.previewRoute = function() {
		$(".routename").val(this.routename);
		$(".routerating").val(this.routerating);
		$(".routedegree").val(this.routedegree);
		$(".rocktype").val(this.rocktype);
		$(".routedesc").val(this.routedesc);
	}

}


var RouteCollection = function(newRoute) {
	this.newRoute = newRoute || {};
	this.add = function (newRoute) {

	}
}

var ClimbingRoute = function(options) {
	this.options = options || {}

	this.addRoute = function addRoute(routeOptions) {
		this.routeOptions = routeOptions || {}

	}
}

var animateGettingStarted = function(){
	$("#getting-started-btn").click(function(){
		$(".getting-started").hide();
		$(".getting-started-overlay").animate({
			width: "0"},
			1000, function(){

			});

		});
		$(".img-holder").show()
}
var animateShowPreview = function() {
	$("#show-preview-btn").click(function(){
		$(".preview-route-info").animate({
			width: "100%"},
			1000, function(){

			});
		$(".preview-route-info").show();
});
}









