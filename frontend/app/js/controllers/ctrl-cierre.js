'use strict';

app.controller('ctrl-cierre', function($scope,Cierre,ngProgress) {

$scope.cierre = new Cierre();

var refresh = function() {
  $scope.cierres = Cierre.query(); 
  //$scope.cierre ="";
}
refresh();

$scope.add = function(cierre) {
  console.log(cierre);
  Cierre.save(cierre,function(cierre){
  	
   //refresh();
   $scope.cierre = Cierre.get({ id: cierre._id });
  });
};
$scope.update = function(cierre) {
  $scope.cierre.$update(function(cierreUpdated){
  	
  	refresh();
  });
};

$scope.remove = function(cierre) {
 cierre.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.cierre = Cierre.get({ id: id });
};  

$scope.deselect = function() {
  $scope.cierre = "";
}

})