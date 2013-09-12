$(document).ready(function () {
	updateRouteList(routeCollection);
	clickEvents();

});
Parse.initialize("t6rhvRcGOJ9IzFv3446cDzxt8m83AinxgspVseIt", "anOSummNpwlSlsWKuELaWQ3y3PoaYqbI1zZ782fF");
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
var Route = Parse.Object.extend("Route",

	{ //class methods
		createFromForm: function(){

			var routeNameVal = $("#routename").val()
			var routeRatingVal = $("#routerating").val()
			var routeTypeVal = $("#routetype").val()
			var routeDegreeVal = $("#routedegree").val()
			var rockTypeVal = $("#rocktype").val()
			var routeDescVal = $("#routedesc").val()
			
			
			route = new Route()

			route.set("name", routeNameVal)
			route.set("rating", routeRatingVal)
			route.set("type", routeTypeVal)
			route.set("degree", routeDegreeVal)
			route.set("rocktype", rockTypeVal)
			route.set("desc", routeDescVal)

			return route
			}
	})

var RouteCollection = Parse.Collection.extend("RouteCollection", {
	model: Route;
	})

collectionDisplay = new RouteCollection();

collectionDisplay.fetch({
	success: function(collectionDisplay){
		collectionDisplay.each(function(route){
			accordianDisplay(route)
		})
	}
})

function accordianDisplay(route) {
	var accordianButton = 
				'<button type="button" class="btn btn-large btn-block btn-primary" data-toggle="collapse" ' + 
				'data-target="#' + route.get("id") + '>' + route.get("name") + ", " + route.get("rating") +'</button>' 
				+ '<div id="' + route.get("id") + ' class="collapse">' + 
					'<h5>Route Type: ' + route.get("type") + '</h5><br>' + 
					'<h5>Route Degree: ' + route.get("degree") + '</h5><br>' + 
					'<h5>Rock Type: ' + route.get("rocktype") + '</h5><br>' + 
					'<blockquote><strong>Route Description:</strong><br>' + '<p>' + route.get("desc") + '</p></blockquote><br>' + 
				'</div>'
				myRoutesDisplay.append(accordianButton);
				
}










