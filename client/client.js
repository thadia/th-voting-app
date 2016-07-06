 
function AppViewModel() {
   
     this.firstName= $.getJSON("/polls/all").stringify();
    
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

 




