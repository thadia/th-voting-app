var myApp = angular.module('myApp',[]);

myApp.controller('voteController', function($scope, $http) {
     $http.get("/polls/all")
    .then(function (response) {
        $scope.polls = response.data;});
}); 

