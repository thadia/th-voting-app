var myApp = angular.module('myApp',[]);

myApp.controller('mainController', function($scope, $http) {
     $http.get("/polls/all")
    .then(function (response) {
        $scope.polls = response.data;
        
    });
        

     $scope.vote = function() {
         //voting call here
          $scope.string_API = "/polls/vote/:user/:poolName/:" + $scope.selectedName;
         console.log("LOG: "+string_API);
         
         
    /*     
         $http.get("/polls/vote/:user/:poolName/:itemType")  //string 
        .then(function (response) {
             $scope.polls = response.data;}); */
          
         
         
    };
       
}); 


 
   
 
   
 






