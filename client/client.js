
var AppViewModel = function() { //firstName
    var self = this;
    this.todoItems = ko.observableArray();
 
    this.refresh = ko.command(function() {
        //make a call to the server...
        return $.getJSON("/polls/all");
    }).done(function(items) {
        //...and update the todoItems collection when the call returns
       
        self.todoItems(items[0].title);
    });
    //refresh immediately to load initial data
    this.refresh();
};

// Activates knockout.js
ko.applyBindings(new AppViewModel());

 




