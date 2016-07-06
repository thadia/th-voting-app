 
function AppViewModel() {
   
   //  this.firstName= $.getJSON("/polls/all").stringify();
     
     
     
    $.getJSON( "/polls/all", function( data ) {
        this.firstName=data;
        console.log(data);
      });
    
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

 




