$(document).ready(function () {
	updateRouteList(routeCollection);
	clickEvents();

});
Parse.initialize("t6rhvRcGOJ9IzFv3446cDzxt8m83AinxgspVseIt", "anOSummNpwlSlsWKuELaWQ3y3PoaYqbI1zZ782fF");

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
			var accordianDisplay = 
				'<button type="button" class="btn btn-large btn-block btn-primary" data-toggle="collapse" ' + 
				'data-target="#' + routeId + '-description">' + o.routename + ", " + o.routerating +'</button>' 
				+ '<div id="' + routeId + '-description" class="collapse">' + 
					'<h5>Route Type: ' + o.routetype + '</h5><br>' + 
					'<h5>Route Degree: ' + o.routedegree + '</h5><br>' + 
					'<h5>Rock Type: ' + o.rocktype + '</h5><br>' + 
					'<blockquote><strong>Route Description:</strong><br>' + '<p>' + o.routedesc + '</p></blockquote><br>' + 
				'</div>'
				myRoutesDisplay.append(accordianDisplay);
				accordianDisplay.click(function(){
					
				})
		})
	}
})
