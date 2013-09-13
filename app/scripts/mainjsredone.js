// create an instance of RoutesCollection
routes = new RouteCollection();

$(document).ready(function () {
	// bind click events
	clickEvents();
	

	// fetch the collection 
	routes.fetch({
		success:function(collection){
			collection.each(function(route){
				updateSidebar(route);
				updateMyRoutes(route);

			})
		}
	})

});

// all click events decoupled from their associated functions
function clickEvents() {
	var newRoute;

	$("#my-routes").click(function(){showMyRoutes()});
	$("#home-btn").click(function(){
		returnHome()
	});

	// create a new Route instance from the form
	// and pass it into the generateRoutePreview
	$("#show-preview-btn").click(function(){
		newRoute = Route.createFromForm()
		generateRoutePreview(newRoute)
	});

	// save the Route to Parse, return "Home", and cleanup form
	$("#confirm-route").click(function(){
		saveRouteInfo(newRoute)
		animateToHomeScreen();
		clearInputs()
	});

	// just return home
	$("#cancel-route").click(function(){
		animateToHomeScreen();
	});
}


// Start the flow for creating a new route
// First generate a preview based on the route argument
function generateRoutePreview(route){
		animateShowPreview()
		$("#routename-preview").html(route.get("name"))
		$("#routerating-preview").html(route.get("rating"))
		$("#routetype-preview").html(route.get("type"))
		$("#routedegree-preview").html(route.get("degree"))
		$("#rocktype-preview").html(route.get("rocktype"))
		$("#routedesc-preview").html(route.get("desc"))		
}

 

function updateSidebar(route) {
	var ul = $(".route-list ul")
	var text = "<li>" + route.get("name") + ", " + route.get("rating") + "</li>";
		ul.append(text);
}

function updateMyRoutes(route) {

	var myRoutesDisplay = $(".my-routes-list")
	var routeId = route.id;
	var accordianButton = _.template( $('#accordian-template').text() ) 
	myRoutesDisplay.append( accordianButton({routeId: routeId, route: route}) )

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
					refreshRouteLists();
				},
				error: function(route, error){
					console.log("route not deleted")
				}
			})
		}
	})
}


function saveRouteInfo(route) {
  	route.save(null, {
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
	route.updateFromForm();
	route.save(null, {
		success: function(){
			$("#show-preview-btn").css("display", "block");
			$("#confirm-route-update-button").css("display", "none");
			showMyRoutes();
			refreshRouteLists();
		},
		
		error: function(){
			console.log("there was an error saving the function");
		}
		
	})
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

function clearInputs(){
	$('input').val("");
	$('textarea').val("");
}

function returnHome(){
	if($(".my-routes-overlay").css("display") == "block") {
		hideMyRoutes();
	}else if($(".preview-route-info").css("display") == "block"){
		animateToHomeScreen();
	}else {
		animateGettingStarted();
	}
}