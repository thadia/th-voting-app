 
function AppViewModel() {
   
   //  this.firstName= $.getJSON("/polls/all").stringify();
     
     
     
    $.getJSON( "/polls/all", function( data ) {
        this.firstName=data.stringify();
      });
    
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

 




