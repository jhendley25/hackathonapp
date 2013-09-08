(function(){

describe("UI", function(){

	describe("getting started page", function(){
		it("should set 'display' to none when button is clicked", function(){
			$("#getting-started-btn").click();
			var displayProp = $(".getting-started").css("display");
			expect(displayProp).toBe("none");

			var contentDispProp = $(".getting-started-overlay").css("display");
			expect(contentDispProp).toBe("none");

			var imgHolderDispProp = $(".img-holder").css("display");
			expect(imgHolderDispProp).toBe("block");
		})
		
			
		})
	})
})
})