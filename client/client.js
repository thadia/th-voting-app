var myApp = angular.module('myApp',[]);

myApp.controller('voteController', ['$scope', function($scope) {
 
      $.getJSON('/polls/all', function(data){
         
            $scope.data=data;
            console.log("LOG "+ data + ":::" + data[0] + ":::" + data[0].title);
      });        
           
}]);
 

