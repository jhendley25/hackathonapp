function validateForm (formElement) {
	var result = {
		errors: [],
		valid: true,
		render: function(){
			if (this.errors.length) {
				this.errors.forEach(function(error){
					error.input.addClass('warning')
					error.input.next("span".text(error.description))
				}
			}
		} //end render method
	}; //end result object

	// make sure all fields are not empty
	// the below if statement targets DOM inputs with 'type="text"'
	formElement.find('input[type=text]').each(function(input){
		if ( $(input).val() == '' ) {
			addToErrors($(input), "Can\'t be Blank!")
		}
	})
	//the below if statement targets DOM elements with the '.numeric' class assigned
	if(!formElement.find('.numeric').isNumeric()) {
		addToErrors($('.numeric'), "Isn\'t a number!")
	}

	function addToErrors (elem, description){
		result.valid = false	
		result.errors.push({
			input: elem,
			description: description
		})
	}
	result.render();
}

validationResults = validateForm($(".form"));







// form.find('input[type=text]').each(function(input){
// 		if ( $(input).val() == '' ) {
// 			valid = false	
// 			//interacting directly with the html, adding error class
// 			$(input).addClass('error')
// 			//and adding the text 'cant be blank' to a span element directly after targeted input
// 			$(input).next('span').text('Cant be blank!')
// 		}
// 	})