var myApp = angular.module('myApp',[]);

myApp.controller('mainController', function($scope, $http) {
     $http.get("/polls/all")
    .then(function (response) {
        $scope.polls = response.data;
        
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
         $scope.user = "guest";
         $scope.string_API = "/polls/vote/" +$scope.user+ "/"+$scope.poll.title+"/" +$scope.selectedName;
         console.log("LOG: "+ $scope.string_API);
    
         $http.get($scope.string_API)  //string 
        .then(function (response) {
             $scope.getAll();
             $scope.alertVoted = "You voted for: " + $scope.selectedName;
        }); 
    };
      
     $scope.newPoll = function(poll, itemName, slectedItemObj) {
         //voting call here
         $scope.selectedName = slectedItemObj;
         $scope.selectedName.item = itemName;
         $scope.poll = poll;
         $scope.user = "guest";
         $scope.string_API = "/polls/vote/" +$scope.user+ "/"+$scope.poll.title+"/" +$scope.selectedName;
         console.log("LOG: "+ $scope.string_API);
    
         $http.get($scope.string_API)  //string 
        .then(function (response) {
             $scope.getAll();
             $scope.alertVoted = "You voted for: " + $scope.selectedName;
        }); 
    }; 
       
}); 


 
   
 
   
 






