var myApp = angular2.module('myApp',[]);

myApp.controller('mainController', function($scope, $http) {
     $http.get("/polls/all")
    .then(function (response) {
        $scope.polls = response.data;});
        

    
       
}); 


 
   
 
   
 






