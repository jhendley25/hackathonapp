$(document).ready(function () {
	updateRouteList(routeCollection);
	clickEvents();
});


// all click events decoupled from their associated functions
function clickEvents() {
	$("#my-routes").click(function(){showMyRoutes()});
	$("#home-btn").click(function(){
		if($(".my-routes-overlay").css("display") == "block") {
			hideMyRoutes();
		}else if($(".preview-route-info").css("display") == "block"){
			animateToHomeScreen();
		}else {
			animateGettingStarted();
		}
	});
	$("#getting-started-btn").click(function(){animateGettingStarted()});
	$("#show-preview-btn").click(function(){generateRoutePreview()});
	$("#confirm-route").click(function(){entryConfirmation()});
	$("#cancel-route").click(function(){entryCancellation()});
}


// routeCollection initialized with three predefined objects for display purposes
routeCollection = [
	{routename:"Ball Scratcher", routerating: "5.12",routetype: "sport", routedegree: "Overhanging", rocktype: "sandstone", routedesc: "Move right from Heart Shaped Box about 50 feet to a rounded arete where the approach trail meets the wall. Balance up the creepy arete to the anchors"},
	{routename: "Chainsaw Massacre", routerating: "5.12",routetype: "sport", routedegree: "Overhanging", rocktype: "sandstone", routedesc: "Classic Enduro climbing. This route provides a good introduction to the steeper routes at The Lode.  Begin atop the low boulder. Climb up, then make a tough move left to a good shake.  Paddle up on good edges in a groove between two blank walls, keeping enough energy in reserve to clip the anchors."},
	{routename: "Transworld Depravity", routerating: "5.14",routetype: "sport", routedegree: "Overhanging", rocktype: "sandstone", routedesc: "Walk right from Cosmic Sausage to the beginning of the obvious overhang of the Madness Cave.  Begin by climbing through roughly 60 feet of 5.12c moves to a rest.  When recovered, power through a hard move to reach sustained tough climbing, which leads to another hard move. Finish by romping up the relaxing 5.13a moves to the anchors."}
];


//get input values and return an object for use in Route constructor
function getFormValues() {
	var routeNameVal = $("#routename").val()
	var routeRatingVal = $("#routerating").val()
	var routeTypeVal = $("#routetype").val()
	var routeDegreeVal = $("#routedegree").val()
	var rockTypeVal = $("#rocktype").val()
	var routeDescVal = $("#routedesc").val()

	var formData = {
		routename: routeNameVal,
		routerating: routeRatingVal,
		routetype: routeTypeVal,
		routedegree: routeDegreeVal,
		rocktype: rockTypeVal,
		routedesc: routeDescVal
	}
	return formData;
}

//route constructor
var Route = function (options) {
	this.options = options || {};
	this.routename = options.routename;
	this.routerating = options.routerating;
	this.routetype = options.routetype;
	this.routedegree = options.routedegree;
	this.rocktype = options.rocktype;
	this.routedesc = options.routedesc;
	this.previewRoute = function() {
		$(".routename").val(this.routename);
		$(".routerating").val(this.routerating);
		$(".routetype").val(this.routetype);
		$(".routedegree").val(this.routedegree);
		$(".rocktype").val(this.rocktype);
		$(".routedesc").val(this.routedesc);
	}

}






function generateRoutePreview(){
		animateShowPreview();
		var newRoute = new Route(getFormValues());
		$("#routename-preview").html(newRoute.routename)
		$("#routerating-preview").html(newRoute.routerating)
		$("#routetype-preview").html(newRoute.routetype)
		$("#routedegree-preview").html(newRoute.routedegree)
		$("#rocktype-preview").html(newRoute.rocktype)
		$("#routedesc-preview").html(newRoute.routedesc)
		routeCollection.push(newRoute);
}
function entryConfirmation() {
		$('input').val("");
		$('textarea').val("");
		updateRouteList(routeCollection);
		animateToHomeScreen();
	}
function entryCancellation(){
		routeCollection.pop();
		animateToHomeScreen();
		updateRouteList(routeCollection);
}

function updateRouteList(list){
	var ul = $(".route-list ul")
	ul.html('')
	

	list.forEach(function(o) {
		var text = "<li>" + o.routename + ", " + o.routerating + "</li>"
		ul.append(text)
	})
}

// animations for splash, preview, and home pages

function animateGettingStarted() {
		$(".getting-started").hide();
		$(".getting-started-overlay").animate({
			width: "0"},
			1000, function(){});
		$(".img-holder").show()
}
function animateShowPreview() {
		$(".preview-route-info").animate({
			width: "100%"},
			1000, function(){

			});
		$(".preview-route-info").show();
}

function animateToHomeScreen () {
	$(".preview-route-info").animate({
			width: "0"},
			1000, function(){

			});
		$(".preview-route-info").hide("slow");
}

// animations for My Routes page

function showMyRoutes () {
	$(".my-routes-overlay").show("slow");
	$(".my-routes-display").show();
}
function hideMyRoutes () {
	$(".my-routes-overlay").hide("slow");
	$(".my-routes-display").hide();
}








