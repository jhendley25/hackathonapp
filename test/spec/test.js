/*global describe, it */
var routeIdToCheck;
'use strict';
(function () {
  describe('The Route Form', function(){
    this.timeout(10000);
    
    it('should save a new route and that route should be returned from Parse', function(done){
      var result;

      // fill out the form
      var form = $('.route-info-form')
      // make a random title with which we can query
      var randomTitle = 'A Test Post #'+ Math.floor(Math.random()*10000000)
      form.find('#routename').val(randomTitle)
      form.find('#routetype').val("misc filler text")
      form.find('#routedegree').val("misc filler text")
      form.find('#rocktype').val("misc filler text")
      form.find('#routedesc').val('This is a really great post! I loved writing it!')

      // submit it
      $('#show-preview-btn').click()
      $('#confirm-route').click()


      setTimeout((function(){

        var query = new Parse.Query(Route);
        query.equalTo("name", randomTitle);
        query.find({
          success: function(results) {
            result = results[0]
            console.log(results)
            expect(result.get('name')).to.equal(randomTitle)
            done()
          },
          error: function(error) {
            done(error.description)
          }
        });

      }), 2000)
    }); // end it()
    it("should update a route from Parse when edit/update is clicked", function(done){
      var form = $('.route-info-form')
      // make a random title with which we can query
      form.find('#routename').val("toBeChecked")
      form.find('#routetype').val("misc filler text")
      form.find('#routedegree').val("misc filler text")
      form.find('#rocktype').val("misc filler text")
      form.find('#routedesc').val('This is a very short lived post')

      // submit it
      $('#show-preview-btn').click()
      $('#confirm-route').click()

      // grab the id from parse for testing purposes
      
      var query = new Parse.Query(Route);
      query.equalTo("name", "toBeChecked")
      query.find({
        success: function(results){
          results = results[0];
          routeIdToCheck = results.id
          console.log("success!" + results.id)
          $('#' + routeIdToCheck + '.edit-route-button').click()
          form.find('#routename').val("toBeUpdated");
          //click update
          $('#confirm-route-update-button').click()
          
        },
        error: function(result){
          console.log("error!")
        }
      })
      //click edit on appropriate route & change title
      

      setTimeout((function(){

        var query2 = new Parse.Query(Route);
        query.get(routeIdToCheck, {
          success: function(results) {
            console.log(results)
            expect(results.get('name')).to.equal("toBeUpdated")
            done()
          },
          error: function(error) {
            done(error.description)
          }
        });

      }), 4000)


      
      
    })
  })
})();
