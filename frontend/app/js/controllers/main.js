'use strict';

/**
 * @ngdoc function
 * @name aurelisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aurelisApp
 */
angular.module('aurelisApp')
  .controller('MainCtrl', function ($scope) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];



  $scope.propertyName = 'ultima_entrega';
  $scope.reverse = true;
  //$scope.friends = friends;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };



  });
