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
            routeIdToCheck = result.id;
            expect(result.get('name')).to.equal(randomTitle)
            // deleteRoute(result.id)
            done()
          },
          error: function(error) {
            done(error.description)
          }
        });

      }), 2000)
    }); // end it()
    it("should update a route from Parse when edit/update is clicked", function(done){
      
      
      

      setTimeout((function(){
        
        $('#' + routeIdToCheck + '.edit-route-button').click()
        var form = $('.route-info-form')
        form.find('#routename').val("toBeUpdated")
        $("#confirm-route-update-button").click()
        
        setTimeout((function(){
        var query = new Parse.Query(Route);
        query.get(routeIdToCheck, {
          success: function(results) {
            console.log(results)
            expect(results.get('name')).to.equal("toBeUpdated")
            deleteRoute(results.id)
            done()
          },
          error: function(error) {
            done(error.description)
          }
        });
        }), 2000)
      }), 4000)


      
      
    })
  })
})();
