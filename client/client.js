
var myApp = angular.module('myApp',[]);


myApp.controller('mainController', function($scope, $http) {
     $http.get("/polls/all")
    .then(function (response) {
         
         $scope.polls = response.data;
     //   console.log( $scope.polls[1].title + "  MY Obj: ");
     //   console.log( $scope.polls[1].list[0].item + "  MY Obj item: ");
     //   console.log( $scope.polls[1].list[0].count + "  MY Obj count: ");
         for(var i=0;i<$scope.polls.length;i++){
             $scope.chart_array = new Array();
             $scope.chart_array[0] =['Items','Votes'];
             for(var j=0;j<$scope.polls[i].list.length;j++){
                 $scope.chart_array.push(Array.from([$scope.polls[i].list[j].item, $scope.polls[i].list[j].count]));
             }
             console.log($scope.chart_array + " MY CHART OBJ.");
           //  drawChart($scope.chart_array, $scope.polls[1].title);
             //$scope.chart_array.length = 0;
         }
           
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
    

     google.charts.load('current', {'packages':['corechart']});
     google.charts.setOnLoadCallback(drawChart);


      function drawChart(array_data, item_title) {
         console.log(array_data[1][0] + " DATA " + array_data[1][1]);
        var data = google.visualization.arrayToDataTable(array_data,false);
 
 
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

 
        var options = {
          title:  item_title
        };

        var chart = new google.visualization.PieChart(document.getElementById('pie'));
        chart.draw(data, options);
        
        
       } 
   
   
          
}); 




 
   
 






