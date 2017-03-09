'use strict';

/**
 * @ngdoc function
 * @name aurelisApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the aurelisApp
 */

  app.controller('MainCtrl', function ($scope,$http) {

//delete $localStorage.username;
 if (localStorage.getItem("username") !== null) {

  console.log("si existe variable de session " + localStorage.getItem("username") );

 }else{
  console.log("no existe variable de session");
 }
 var route_frontend = "http://localhost:9000/";
// var route_frontend = "https://aurelis-frontend.herokuapp.com/";
var route_backend = "http://localhost:3001/";
// var route_backend = "https://aurelis-backend.herokuapp.com/";


 $scope.submit = function(){
     $http({
        method: 'GET',
        url: route_backend+"user/"+$scope.username+"/"+$scope.password
     }).then(function (success){
  
        localStorage.setItem("username", $scope.username);
        //$localStorage.username = $scope.username;

        window.location = route_frontend+"aurelis.html#/";
     },function (error){
        //console.log(error);
        alert("Datos de Ingreso Incorrectos");
     });
 };

  $scope.propertyName = 'ultima_entrega';
  $scope.reverse = true;
  //$scope.friends = friends;

  $scope.sortBy = function(propertyName) {
    $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
    $scope.propertyName = propertyName;
  };



  });
