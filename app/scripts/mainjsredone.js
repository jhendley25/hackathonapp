$(document).ready(function () {
	clickEvents();
	
});
Parse.initialize("t6rhvRcGOJ9IzFv3446cDzxt8m83AinxgspVseIt", "anOSummNpwlSlsWKuELaWQ3y3PoaYqbI1zZ782fF");

//testing - and it worked
// var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}, {
//   success: function(object) {
//     alert("yay! it worked");
//   }
// });


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
	// $("#getting-started-btn").click(function(){animateGettingStarted()});
	$("#show-preview-btn").click(function(){generateRoutePreview()});
	$("#confirm-route").click(function(){entryConfirmation()});
	$("#cancel-route").click(function(){entryCancellation()});
}


//Parse constructor
var Route = Parse.Object.extend('Route', 

{//no instance methods
},
{ //class methods
		createFromForm: function(){
			newRoute = new Route()
			var routeNameVal = $("#routename").val()
			var routeRatingVal = $("#routerating").val()
			var routeTypeVal = $("#routetype").val()
			var routeDegreeVal = $("#routedegree").val()
			var rockTypeVal = $("#rocktype").val()
			var routeDescVal = $("#routedesc").val()
			
			


			newRoute.set("name", routeNameVal)
			newRoute.set("rating", routeRatingVal)
			newRoute.set("type", routeTypeVal)
			newRoute.set("degree", routeDegreeVal)
			newRoute.set("rocktype", rockTypeVal)
			newRoute.set("desc", routeDescVal)

			return newRoute
			}
		}
);

var RouteCollection = Parse.Collection.extend({
	model: Route
	})

var routes = new RouteCollection();

routes.fetch({
	success:function(collection){
		collection.each(function(route){
			updateSidebar(route);
			updateMyRoutes(route);

		})
	}
})

//incorporate this into the constructor!!!!! - maybe
function generateRoutePreview(){
		var newRoute = Route.createFromForm()
		animateShowPreview()
		$("#routename-preview").html(newRoute.get("name"))
		$("#routerating-preview").html(newRoute.get("rating"))
		$("#routetype-preview").html(newRoute.get("type"))
		$("#routedegree-preview").html(newRoute.get("degree"))
		$("#rocktype-preview").html(newRoute.get("rocktype"))
		$("#routedesc-preview").html(newRoute.get("desc"))
		
} //this works

 

function updateSidebar(route) {
	var ul = $(".route-list ul")
	var text = "<li>" + route.get("name") + ", " + route.get("rating") + "</li>";
		ul.append(text);
}

function updateMyRoutes(route) {

	var myRoutesDisplay = $(".my-routes-list")
	var routeId = route.id;
	var accordianButton = 
				//the button itself
				'<button type="button" class="btn btn-large btn-block btn-primary" data-toggle="collapse" ' + 
				'data-target="#' + routeId + '">' + route.get("name") + ", " + route.get("rating") +'</button>'
				//the accordian data
				+ '<div id="' + routeId + '" class="collapse">' + 
				//edit & delete buttons
				 '<div class="modify-route-buttons">' + 
  					'<button type="button" class="btn btn-primary btn-xs edit-route-button" id="' + routeId + '">Edit</button>&nbsp;' +
 					'<button type="button" class="btn btn-primary btn-xs delete-route-button" id="' + routeId + '">Delete</button>'
				+ '</div>'
				//route info
					+'<h5>Route Type: ' + route.get("type") + '</h5><br>' + 
					'<h5>Route Degree: ' + route.get("degree") + '</h5><br>' + 
					'<h5>Rock Type: ' + route.get("rocktype") + '</h5><br>' + 
					'<blockquote><strong>Route Description:</strong><br>' + '<p>' + route.get("desc") + '</p></blockquote><br>'
				+'</div>'
	myRoutesDisplay.append(accordianButton)

	$('.edit-route-button').click(function(){
		var id = this.id;
		hideMyRoutes();
		editRoute(id);

	})
	$(".delete-route-button").click(function(){
		var id = this.id;
		deleteRoute(id); //modify later to display modal
	})
}

function deleteRoute(id) {
	var id = id;
	var query = new Parse.Query(Route);
	query.get(id, {
		success: function(routeToDestroy){
			routeToDestroy.destroy({
				success: function(Route){
					console.log("route successfully removed")
				},
				error: function(route, error){
					console.log("route not deleted")
				}
			})
		}
	})
}


function saveRouteInfo() {
  	newRoute.save(newRoute.options,{
			success: function(route){
				console.log("Success!")
				updateSidebar(route);
				updateMyRoutes(route);
			},
			error: function(route, error){
				console.log("No Luck!")
			}
		})
  }



function editRoute(id) {
	var id = id;
	var query = new Parse.Query(Route);
	query.get(id, {
		success: function(route){
			$("#routename").val(route.get("name"))
			$("#routerating").val(route.get("rating"))
			$("#routetype").val(route.get("type"))
			$("#routedegree").val(route.get("degree"))
			$("#rocktype").val(route.get("rocktype"))
			$("#routedesc").val(route.get("desc"))
			//hide preview btn, show update btn
			$("#show-preview-btn").css("display", "none");
			$("#confirm-route-update-button").css("display", "block");
			$("#confirm-route-update-button").click(function(){confirmUpdate(route)});
			
			
			
		},
		error: function(route, error) {
			console.log("no luck getting the object")
		}
	})
	
}

function refreshRouteLists() {
	$(".my-routes-list").html("");
	$(".route-list ul").html("");
	routes.fetch({
	success:function(collection){
		collection.each(function(route){
			updateSidebar(route);
			updateMyRoutes(route);
			
		})
	}
})

}


function confirmUpdate(route) {
	
				route.set("name", $("#routename").val())
				route.set("rating", $("#routerating").val())
				route.set("type", $("#routetype").val())
				route.set("degree", $("#routedegree").val())
				route.set("rocktype", $("#rocktype").val())
				route.set("desc", $("#routedesc").val())
				route.save()
				$("#show-preview-btn").css("display", "block");
				$("#confirm-route-update-button").css("display", "none");
				// $('input').val("");
				// $('textarea').val("");
				showMyRoutes();
				// setTimeout(function() {
				// 	refreshRouteLists()
				// }, 2000);

}




//navigation animations
function animateGettingStarted() {
		$(".getting-started").hide();
		$(".getting-started-overlay").animate({
			width: "0"},
			500, function(){});
		$(".welcome-logo").hide();
		$(".img-holder").show();
		$(".home-left-column").show();
}
function animateShowPreview() {
		$(".preview-route-info").animate({
			width: "100%"},
			500, function(){

			});
		$(".preview-route-info").show();
		$(".home-left-column").hide();

}

function animateToHomeScreen () {
	$(".preview-route-info").animate({
			width: "0"},
			500, function(){

			});
		$(".preview-route-info").hide("slow");
		$(".home-left-column").show();

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


//page stuff...
function entryConfirmation() {
		$('input').val("");
		$('textarea').val("");
		saveRouteInfo()
		animateToHomeScreen();
}


function entryCancellation(){

		animateToHomeScreen();
}





