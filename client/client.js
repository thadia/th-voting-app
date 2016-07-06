 
function AppViewModel() {
   
   //  this.firstName= $.getJSON("/polls/all").stringify();
     
      var self = this;
      this.firstName;

     
    $.getJSON( "/polls/all", function( data ) {
        self.firstName=data;
        console.log(data);
      });
    
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

 




