//var ko = require('knockout');// This is a simple *viewmodel* - JavaScript that defines the data and behavior of your UI
//
function AppViewModel() {
    this.firstName = "Bert";
    this.lastName = "Bertington";
}

// Activates knockout.js
ko.applyBindings(new AppViewModel());

/*

module.exports = { 
    AppViewModel: function(){
     try{
          this.firstName = "Bert";
          this.lastName = "Bertington";
      }
     catch(err){
        return false;
       
     }  
    }
};



*/




