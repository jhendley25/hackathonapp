$(document).ready(function () {
	updateRouteList(routeCollection);
	clickEvents();

});
Parse.initialize("t6rhvRcGOJ9IzFv3446cDzxt8m83AinxgspVseIt", "anOSummNpwlSlsWKuELaWQ3y3PoaYqbI1zZ782fF");


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
	{routename:"Ball Scratcher", routerating: "5.12",routetype: "Sport", routedegree: "Overhanging", rocktype: "Sandstone", routedesc: "Move right from Heart Shaped Box about 50 feet to a rounded arete where the approach trail meets the wall. Balance up the creepy arete to the anchors"},
	{routename: "Chainsaw Massacre", routerating: "5.12",routetype: "Sport", routedegree: "Overhanging", rocktype: "Sandstone", routedesc: "Classic Enduro climbing. This route provides a good introduction to the steeper routes at The Lode.  Begin atop the low boulder. Climb up, then make a tough move left to a good shake.  Paddle up on good edges in a groove between two blank walls, keeping enough energy in reserve to clip the anchors."},
	{routename: "Transworld Depravity", routerating: "5.14",routetype: "Sport", routedegree: "Overhanging", rocktype: "Sandstone", routedesc: "Walk right from Cosmic Sausage to the beginning of the obvious overhang of the Madness Cave.  Begin by climbing through roughly 60 feet of 5.12c moves to a rest.  When recovered, power through a hard move to reach sustained tough climbing, which leads to another hard move. Finish by romping up the relaxing 5.13a moves to the anchors."}
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
	
}


var RoutesCollection = Parse.Object.extend("RoutesCollection")
var routesCollection = new RoutesCollection();


function generateRoutePreview(){
		animateShowPreview();
		// one thing that isn't quite right about my setup.  global variable
		newRoute = new Route(getFormValues());
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
		uploadImage();
		saveRouteInfo();
}


function entryCancellation(){
		routeCollection.pop();
		animateToHomeScreen();
		updateRouteList(routeCollection);
}

function updateRouteList(list){
	var ul = $(".route-list ul")
	var myRoutesDisplay = $(".my-routes-list")
	myRoutesDisplay.html('')
	ul.html('')
	

	list.forEach(function(o) {
		var text = "<li>" + o.routename + ", " + o.routerating + "</li>";
		ul.append(text);
		var routeId = o.routename.replace(" ", "-");
		var routeToggles = 
		'<button type="button" class="btn btn-large btn-block btn-primary" data-toggle="collapse" ' + 
		'data-target="#' + routeId + '-description">' + o.routename + ", " + o.routerating +'</button>' 
		+ '<div id="' + routeId + '-description" class="collapse">' + 
			'<h5>Route Type: ' + o.routetype + '</h5><br>' + 
			'<h5>Route Degree: ' + o.routedegree + '</h5><br>' + 
			'<h5>Rock Type: ' + o.rocktype + '</h5><br>' + 
			'<blockquote><strong>Route Description:</strong><br>' + '<p>' + o.routedesc + '</p></blockquote><br>' + 
		'</div>';
		
		myRoutesDisplay.append(routeToggles);
	})
}

// animations for splash, preview, and home pages

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



function uploadImage () {
    var file;

    // Set an event listener on the Choose File field.
    $('#profilePhotoFileUpload').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      file = files[0];
    });

    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#submit-photo').click(function() {
      var serverUrl = 'https://api.parse.com/1/files/' + file.name;

      $.ajax({
        type: "POST",
        beforeSend: function(request) {
          request.setRequestHeader("X-Parse-Application-Id", 't6rhvRcGOJ9IzFv3446cDzxt8m83AinxgspVseIt');
          request.setRequestHeader("X-Parse-REST-API-Key", 'KJsEJix8NpFAomBtNBnPztvYm1cdKVojSOPCBOe3');
          request.setRequestHeader("Content-Type", file.type);
        },
        url: serverUrl,
        data: file,
        processData: false,
        contentType: false,
        success: function(data) {

          console.log("File available at: " + data.url);
        },
        error: function(data) {
          var obj = jQuery.parseJSON(data);
          alert(obj.error);
        }
      });
    });


  };
  function saveRouteInfo() {
  	routesCollection.save(newRoute.options,{
			success: function(routesCollection){
				console.log("Success!")
			},
			error: function(routesCollection, error){
				console.log("No Luck!")
			}
		})
  }

function previewImage () {
		var file;

    // Set an event listener on the Choose File field.
    $('#profilePhotoFileUpload').bind("change", function(e) {
      var files = e.target.files || e.dataTransfer.files;
      // Our file var now holds the selected file
      file = files[0];
    });

    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#preview-image').click(function() {
      var imgText = '<img src="' + file + '">'
      $(".img-holder").append(imgText);
    });
  }

