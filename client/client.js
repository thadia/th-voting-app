var myApp = angular.module('myApp',[]);
var chart_array = [];

myApp.controller('mainController', function($scope, $http) {
     $http.get("/polls/all")
    .then(function (response) {
         console.log( $scope.polls + "MY Obj: ");
      $scope.polls = response.data;
       
            // ng-options="type as type.item for type in poll.list" ng-init="selectedName = poll.list[0]"  
    });
     
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
    
    
    
    
    
/*    
    
    
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);


    function drawChart(array_data, title) {
        var data = google.visualization.arrayToDataTable(array_data);
 
 */
/*
        var data = google.visualization.arrayToDataTable([
          ['Item', 'Votes'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);
*/

/*
        var options = {
          title:  title
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
      } 
   
   */
      
}); 




 
   
 






