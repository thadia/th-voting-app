
var myApp = angular.module('myApp',[]);


myApp.controller('mainController', function($scope, $http) {
     $http.get("/polls/all")
    .then(function (response) {
         
        $scope.polls = response.data;
        
       
         
         

     //   console.log( $scope.polls[1].title + "  MY Obj: ");
     //   console.log( $scope.polls[1].list[0].item + "  MY Obj item: ");
     //   console.log( $scope.polls[1].list[0].count + "  MY Obj count: ");
         for(var i=0;i<$scope.polls.length;i++){
                 $scope.dataTable = new google.visualization.DataTable();
                 $scope.dataTable.addColumn('string', 'Items');
                 $scope.dataTable.addColumn('number', 'Votes');
             for(var j=0;j<$scope.polls[i].list.length;j++) {
                 $scope.dataTable.addRow([$scope.polls[i].list[j].item, $scope.polls[i].list[j].count]);
             }
             console.log($scope.dataTable  + " MY CHART OBJ.");
             google.charts.setOnLoadCallback(drawVisualization($scope.dataTable,$scope.polls[1].title));
         }
           
    });
    
    
     google.charts.load('current');   // Don't need to specify chart libraries!
   
        function drawVisualization(dataTable,Title) {
            var wrapper = new google.visualization.ChartWrapper({
              chartType: 'PieChart',
              dataTable: dataTable,
              options: {'title': Title},
              containerId: 'pie'
            });
            wrapper.draw();
          }
          
          
          
          
    
     
     $scope.getAll = function(){
          $http.get("/polls/all")
            .then(function (response) {
            $scope.polls = response.data;
        });
     } 
     $scope.vote = function(poll, itemName, slectedItemObj) {
         //voting call here
         $scope.selectedName = slectedItemObj;
         $scope.selectedName.item = itemName;
         $scope.poll = poll;
        // $scope.user = "guest";
         $scope.string_API = "/polls/vote/" +$scope.poll.title+"/" +$scope.selectedName;
         console.log("LOG Voting: "+ $scope.string_API);
    
         $http.get($scope.string_API)  //string 
        .then(function (response) {
             $scope.getAll();
             $scope.alertVoted = "You voted for: " + $scope.selectedName;
        }); 
    };
      
   //  $scope.newPoll = function(owner, pollName, items ) {
     $scope.newPoll = function(pollName, items ) {
         // polls/post/:user/:title/:list
         
         $scope.pollName = pollName;
         $scope.items = items;
         $scope.string_API = "/polls/post/"+$scope.pollName+"/" +$scope.items;
         console.log("LOG New Poll: "+ $scope.string_API);
    
         $http.get($scope.string_API)  
        .then(function (response) {
             $scope.getAll();
             $scope.alertAddedPoll = "Your New Poll was added.";
        }); 
    }; 
    

    
   

          
}); 




 
   
 






