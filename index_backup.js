var server = require('express');
var port = process.env.PORT || 3500;
var app = server();
app.use(server.static(__dirname + '/public'));
app.use('/bower_components', server.static(__dirname + '/bower_components'));
app.use('/client', server.static(__dirname + '/client'));
var path = require('path');
var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectID;

var ItemSchema = new Schema({
    item : { type: String, required: true, trim: true },
    count : { type: Number, required: false, trim: true },
    votedBy : { type: Array, required: false, trim: true }
   
});

var PoolSchema = new Schema({
    title : { type: String, required: true, trim: true },
    list : { type: Array, required: true, trim: true }
    
});


var Item = mongoose.model('Item',ItemSchema);
var Poll = mongoose.model('Pool',PoolSchema);

mongoose.connect('mongodb://db_voter:voting-app@ds011495.mlab.com:11495/th-voting-app-db');

var poll_list;

app.listen(port, function(){ 
  console.log('Ready: ' + port);
  });
  
app.get('/polls/post/:title/:list',  function (req, res) {
  
      console.log("Title: " + req.params.title + "List: " + req.params.list);
      var itemList = req.params.list.replace(/\s/g,'').split(',');
      var newArray = [];
      for (var i=0;i<itemList.length;i++){
         var item = new Item ( {
                 item: itemList[i],
                 count: 0
          });
          newArray.push(item);
      }
      
       var poll = new Poll ( {
                  title: req.params.title,
                  list:  newArray
                  
              });
              
       poll.save( function(error, data){
                  if(error){
                      console.log(error);
                  }
                  else{
                      console.log(data +  " is saved.");
                  }
              });

});



app.get('/', function(req, res) {
        var fileName = path.join(__dirname, '/client/index.html');
        res.sendFile(fileName, function (err) {
          if (err) {
            console.log(err);
            res.status(err.status).end();
          }
          else {
            console.log('Sent:', fileName);
          }
        });
});

app.get('/polls/all', function(req, res) {  //  '-_id' , 

       Poll.find({},function(err, latest_data) {
        if (err) return console.error(err);
        else{
          console.log(latest_data);
          res.json(latest_data);
        }
      });



});

// https://thinkster.io/mean-stack-tutorial
// https://www.npmjs.com/package/slush-meanjs
// https://auth0.com/blog/2014/01/15/auth-with-socket-io/
// CRUD Auth

app.get('/polls/remove_all', function(req, res) {

 Poll.remove({__v:'0'}, function(err) {
    if (!err) {
            console.log('notification removing!');
    }
    else {
             console.log('error on removing');
    }
 });  
    
});





app.get('/polls/vote/:id', function(req, res) {
    
   

 Poll.findOne({ _id: "577e81afc7280390736a6fc1"}, function(err, item){ 
          // var item = items.list[0];
//          console.log(item.list[0]._id);
//           console.log(item);
        if(item){   
                    for(var i=0;i<item.list.length; i++){
                       if(item.list[i]._id == "577e81afc7280390736a6fbd" ) {
                          console.log(item.list[i].item + " ::: " + item.list[i].count + "  --> Before update.");
                          item.list[i].count += 1;
                          console.log(item.list[i].item + " ::: " + item.list[i].count + "  --> After update.");
                       }
                     
                    }
                    
         
                    if (err) { console.log('error on find_update'); }
        /*         
                 
                    item.save(function(err,item) {
                            if (err) { console.log('error on save_update');}
                            else {  
                               res.response(item);
                               console.log('Data is saved: ' + item); }
                           
                    });  */
         } 
         
        
        
           var conditions = {
            _id: '577e81afc7280390736a6fc1',
            "list.id": '577e81afc7280390736a6fbd',
            },
            update = {
              "list.$.count": '1'
            },
            options = {
              upsert: false
            };
            
            Item.update(conditions, update, options, function(err, data) {
              console.log("data is updated.");
              if (err) { console.log('error on save_update');}
            });
        
        
 });     
         
        
 /*        
      Poll.findOneAndUpdate(
          { "_id": '577e81afc7280390736a6fc1', "item._id": '577e81afc7280390736a6fbd' },
          { 
              "$set": {
                  "item.$.count": 1
              }
          },
          function(err,doc) {
             if(err) { console.log('error on save_update'); }
          }
      );
              
  */      

    
});


app.get('/items/all', function(req, res) {

       Poll.find({}, {limit: 10},function(err, latest_data) {
        if (err) return console.error(err);
        else{
          console.log(latest_data);
          res.json(latest_data);
        }
      });



});