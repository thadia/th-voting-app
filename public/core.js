var listApp = angular.module('listApp',[]);


function listController($scope, $http) {
    $scope.formData = {};
$http.get('/polls')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    
     // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/polls', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}