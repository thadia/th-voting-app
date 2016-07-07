var myApp = angular.module('myApp',[]);

myApp.controller('voteController', ['$scope', function($scope) {
 
 
      $http.get('/polls/all').
          success(function (data, status, headers, config) {
            $scope.data=data;
            console.log("LOG "+ data + ":::" + data[0] + ":::" + data[0].title)
          }).
          error(function (data, status, headers, config) {
            // ...
          });
 
}]);
 

