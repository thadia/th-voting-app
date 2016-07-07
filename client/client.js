function PollSchemaObject(title, list) {
    var self = this;
    self.title = title;
    self.list = ko.observable(list);
}

var PollViewModel = function() { //firstName
    var self = this;
    this.todoItems = ko.observableArray();
  
    this.refresh = ko.command(function() {
        //make a call to the server...
        return $.getJSON("/polls/all");
    }).done(function(items) {
        //...and update the todoItems collection when the call returns
       for (var i=0; i < items.length; i++ ){
            var newPoll = [items[i].title , items[i].list];
            var poolList = [];
            poolList.push(newPoll);
            //newItems.push(new TodoViewModel(items[i].title , items[i].list));
        }
         self.todoItems(poolList);
     });
    //refresh immediately to load initial data
    this.refresh();
};

// Activates knockout.js
ko.applyBindings(new PollViewModel());

 




