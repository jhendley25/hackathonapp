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


