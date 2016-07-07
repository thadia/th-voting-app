function PollSchemaObject(data) {
    this.title = ko.observable(data.title);
    this.list = ko.observable(data.list);
}

var PollViewModel = function() { //firstName
    var self = this;
    
    this.todoItems = ko.observableArray();
  
    this.refresh = ko.command(function() {
        //make a call to the server...
        return $.getJSON("/polls/all");
    }).done(function(items) {
        //...and update the todoItems collection when the call returns
       console.log("Items:  "+items);
       self.todoItems(items);
     });
    //refresh immediately to load initial data
    this.refresh();
};

// Activates knockout.js
ko.applyBindings(new PollViewModel());

 



