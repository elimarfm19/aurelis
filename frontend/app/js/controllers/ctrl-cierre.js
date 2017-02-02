'use strict';

app.controller('ctrl-cierre', function($scope,$http,$rootScope,$filter,Cierre,Cliente,Proveedor,CierreProveedor,Pago,ngProgress,$window) {

$scope.cierre = new Cierre();
$scope.cliente = new Cliente();
$scope.proveedor = new Proveedor();
$scope.cierre_p = new CierreProveedor();
$scope.pago = new Pago();
var refresh = function() {
  $scope.cierres = Cierre.query();
  $scope.clientes = Cliente.query();
  $scope.proveedores = Proveedor.query();  
  $scope.cierreproveedores = CierreProveedor.query();
  $scope.pagos = Pago.query();
  $scope.cierre_p ="";
  $scope.pago="";
}
refresh();



$scope.add = function(cierre) {
  //console.log(cierre.cliente);
  var fecha_cierre = document.getElementById('fecha_cierre').value;

  var fecha_entrega = document.getElementById('fecha_entrega').value;
  

  
  if(fecha_cierre !='' && fecha_entrega == ''){

    var fecha = moment(fecha_cierre);
    
    cierre.fecha_cierre = fecha_cierre;
    cierre.fecha_entrega = moment(fecha.add(7,'days')).format('YYYY-MM-DD');

    //console.log('llene fecha de cierra y la de entrega esta vacia');
  }
  else if(fecha_cierre=='' && fecha_entrega==''){


    var fecha = moment();
    cierre.fecha_cierre = moment(fecha).format('YYYY-MM-DD');
    cierre.fecha_entrega = moment(fecha.add(7,'days')).format('YYYY-MM-DD');

    //console.log('las dos fechas estan vacias');
  }else{

    cierre.fecha_cierre = fecha_cierre;
    cierre.fecha_entrega = fecha_entrega;

     //console.log('las dos fechas estan llenas');
  }

  Cierre.save(cierre,function(cierre){
   //refresh();
  $scope.cierre = Cierre.get({ id: cierre._id });

  //document.getElementById('fecha_cierre').value = "aloja";
    //$scope.date = moment(cierre.fecha_entrega).format('YYYY-MM-DD');
  //$scope.date_c = moment(cierre.fecha_cierre).format('YYYY-MM-DD');
  });
  //$scope.cierre.fecha_cierre = '12344';
};
$scope.update = function(cierre) {
  console.log(cierre);
  cierre.fecha_entrega =document.getElementById('fecha_entrega').value;
  cierre.fecha_cierre =document.getElementById('fecha_cierre').value;
  //cierre.monto_pagado = document.getElementById('monto_pagado').value;
  //cierre.monto_pagado = $rootScope.scopeRaiz;
  $scope.cierre.$update(function(cierreUpdated){
  	
  	refresh();
  });
};

$scope.remove = function(cierre) {
  console.log(cierre);
  cierre.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.cierre = Cierre.get({ id: id });
};  

$scope.deselect = function() {
  $window.location.reload();
}

$scope.addCierreProveedor = function(idCierre) {

  $scope.cierre_p.cierre = idCierre;

  $http.post("http://localhost:3001/cierresProveedor/",$scope.cierre_p)
            .success(function(respuesta){
                console.log(respuesta);
                refresh();
   });
  console.log($scope.cierre_p);
  //$scope.cierre = Cierre.get({ id: id });
}; 

$scope.openPagosProveedor = function(idCierreProveedor) {

  document.getElementById('cierre_pId').value = idCierreProveedor;

  $scope.cierre_pId= idCierreProveedor;

  // $http.post("http://localhost:3001/cierresProveedor/",$scope.cierre_p)
  //           .success(function(respuesta){
  //               console.log(respuesta);
  //               refresh();
  //  });
  console.log($scope.cierre_pId);
  //$scope.cierre = Cierre.get({ id: id });
};
$scope.addPagosProveedor = function(pago) {

  console.log($scope.cierre_pId);
  pago.cierre_p =  document.getElementById('cierre_pId').value;

  //$scope.cierre_p = idCierreProveedor;

  $http.post("http://localhost:3001/pagos/",pago)
            .success(function(respuesta){
                console.log(respuesta);
                //refresh();
                  $scope.pagos = Pago.query();
                  $scope.pago="";
                //$scope.pago="";

   });
  
  
  
  //$scope.cierre = Cierre.get({ id: id });
};  

// $scope.date = function() {
//   // $scope.date = moment($scope.cierre.fecha_entrega).format('YYYY-MM-DD');
//   //$scope.date = $filter('date')($scope.cierre.fecha_entrega, "yyyy-MM-dd");;
// }

// $scope.date_c = function() {
//    //$scope.date_c = moment($scope.cierre.fecha_cierre).format('YYYY-MM-DD');
//  // $scope.date_c = $filter('date')($scope.cierre.fecha_cierre, "yyyy-MM-dd");;
// }

})

