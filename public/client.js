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

// Activates knockout.js
ko.applyBindings(new AppViewModel());