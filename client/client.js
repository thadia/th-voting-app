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
     $scope.newPoll = function(owner, pollName, items ) {
         // polls/post/:user/:title/:list
         $scope.owner = owner;
         $scope.pollName = pollName;
         $scope.items = items;
         $scope.string_API = "/polls/post/" +$scope.owner+ "/"+$scope.pollName+"/" +$scope.items;
         console.log("LOG New Poll: "+ $scope.string_API);
    
         $http.get($scope.string_API)  
        .then(function (response) {
             $scope.getAll();
             $scope.alertAddedPoll = "Your New Poll was added.";
        }); 
    }; 
       
}); 


 
   
 
   
 






