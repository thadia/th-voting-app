 
function AppViewModel() {
   
     this.firstName= $.getJSON("/polls/all");
    
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

 




