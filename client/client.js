var myApp = angular.module('myApp',[]);

myApp.controller('mainController', function($scope, $http) {
     $http.get("/polls/all")
    .then(function (response) {
        $scope.polls = response.data;});
        

    $scope.showSelectValue = function(mySelect) {
    console.log(mySelect);
}
   
   
   $scope.secondMethod = function() {
      $http.get("/polls/vote/:user/:poolName/:mySelect")
      .then(function (response) {
          $scope.polls = response.data;});
};
       
}); 


 
   
 
   
 






