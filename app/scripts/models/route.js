// Define a Route class
var Route = Parse.Object.extend('Route', 
  {
    // instance methods
    updateFromForm: function(){
      this.set("name"      , $("#routename").val() )
      this.set("rating"    , $("#routerating").val() )
      this.set("type"      , $("#routetype").val() )
      this.set("degree"    , $("#routedegree").val() )
      this.set("rocktype"  , $("#rocktype").val() )
      this.set("desc"      , $("#routedesc").val() )
    }
  },
  { 
    //class methods
    createFromForm: function(){
      var newRoute = new Route();
      newRoute.set("name"      , $("#routename").val() )
      newRoute.set("rating"    , $("#routerating").val() )
      newRoute.set("type"      , $("#routetype").val() )
      newRoute.set("degree"    , $("#routedegree").val() )
      newRoute.set("rocktype"  , $("#rocktype").val() )
      newRoute.set("desc"      , $("#routedesc").val() )

      return newRoute
    }
  }
);

// A Class from a collection of Route instances
var RouteCollection = Parse.Collection.extend({
  model: Route
})