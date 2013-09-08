$(document).ready(function(){
	$("#getting-started-btn").click(function(){
		$(".getting-started").hide();
		$(".getting-started-overlay").animate({
			opacity: 0.25,
			width: "0"},
			1000, function(){

			});

		});
		$(".img-holder").show();
	})
