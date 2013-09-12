/*global describe, it */
'use strict';
(function () {
  describe('The Note Form', function(){
    this.timeout(15000);

    it('should save a new note and that note should be returned from Parse', function(done){
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

  })
})();
