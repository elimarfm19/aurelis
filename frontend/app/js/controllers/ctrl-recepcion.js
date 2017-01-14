'use strict';

app.controller('ctrl-recepcion', function($scope,Recepcion,ngProgress) {

$scope.recepcion = new Recepcion();

var refresh = function() {
  $scope.recepciones = Recepcion.query(); 
  $scope.recepcion ="";
}
refresh();

$scope.add = function(recepcion) {
  console.log(recepcion);
  Recepcion.save(recepcion,function(recepcion){
    refresh();
  });
};
$scope.update = function(recepcion) {
  $scope.recepcion.$update(function(){
    refresh();
  });
};

$scope.remove = function(recepcion) {
 recepcion.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.recepcion = Recepcin.get({ id: id });
};  

$scope.deselect = function() {
  $scope.recepcion = "";
} 
})
