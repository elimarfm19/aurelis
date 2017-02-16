'use strict';

app.controller('ctrl-main', function($scope,$http,ngProgress,$window) {

$scope.propertyName = 'ultima_entrega';
  $scope.reverse = true;
  //$scope.friends = friends;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };

})
