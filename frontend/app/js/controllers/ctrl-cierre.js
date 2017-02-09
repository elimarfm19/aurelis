'use strict';

app.controller('ctrl-cierre', function($scope,$http,DTOptionsBuilder,$routeParams,$rootScope,$filter,Cierre,Cliente,Proveedor,CierreProveedor,Pago,ngProgress,$window) {

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
var refresh2 = function(){

if ($routeParams.cierreId) {
  $scope.cierre = Cierre.get({ id: $routeParams.cierreId });
}
else{
  console.log('No tengo parametros');
}

}
refresh();
refresh2();


$scope.add = function(cierre) {
  var fecha_cierre = document.getElementById('fecha_cierre').value;
  var fecha_entrega = document.getElementById('fecha_entrega').value;
   
  if(fecha_cierre !='' && fecha_entrega == ''){

    var fecha = moment(fecha_cierre);
    
    cierre.fecha_cierre = fecha_cierre;
    cierre.fecha_entrega = moment(fecha.add(7,'days')).format('YYYY-MM-DD');
  }
  else if(fecha_cierre=='' && fecha_entrega==''){

    var fecha = moment();

    cierre.fecha_cierre = moment(fecha).format('YYYY-MM-DD');
    cierre.fecha_entrega = moment(fecha.add(7,'days')).format('YYYY-MM-DD');
  }else{

    cierre.fecha_cierre = fecha_cierre;
    cierre.fecha_entrega = fecha_entrega;
  }

  Cierre.save(cierre,function(cierre){
    $scope.cierre = Cierre.get({ id: cierre._id });
  });
};

$scope.update = function(cierre) {
  //console.log(cierre);
  cierre.fecha_entrega =document.getElementById('fecha_entrega').value;
  cierre.fecha_cierre =document.getElementById('fecha_cierre').value;


  $http.get("http://localhost:3001/cierres/"+cierre._id)
    .success(function(cierreViejo){


    $http.get("http://localhost:3001/clientes/"+cierreViejo.cliente)
      .success(function(cliente){
        //console.log(cliente);
        cliente.cerrado -= cierreViejo.cantidad;       
      
        cliente.cerrado += parseFloat(cierre.cantidad);

      $http.put("http://localhost:3001/clientes/"+cliente._id,cliente)
        .success(function(cliente2){
         //console.log(cliente2); 
   
      }); 
   
    });

  });

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
  console.log('cualquier cosa');
  $scope.cierre = Cierre.get({ id: id });
  $rootScope.cierre = $scope.cierre;  // console.log(serveData);
};  

$scope.deselect = function() {
  $window.location.reload();
}

$scope.addCierreProveedor = function(idCierre) {

  $scope.cierre_p.cierre = idCierre;

  $http.post("http://localhost:3001/cierresProveedor/",$scope.cierre_p)
            .success(function(respuesta){
               // console.log(respuesta);
                $scope.proveedores = Proveedor.query();  
                $scope.cierreproveedores = CierreProveedor.query();
                $scope.cierre_p ="";
                $scope.monto_pagado();
                $scope.gramos();
               
                //refresh();
   });        
  console.log($scope.cierre_p);
}; 

$scope.deleteCierreProveedor = function(cierreProveedorId) {

    $http.delete("http://localhost:3001/cierresProveedor/"+cierreProveedorId)
            .success(function(respuesta){
                //console.log(respuesta);
                 $scope.proveedores = Proveedor.query();  
                $scope.cierreproveedores = CierreProveedor.query();
                $scope.cierre_p ="";
                $scope.monto_pagado();
                $scope.gramos();

   });
};

$scope.openPagosProveedor = function(idCierreProveedor) {

  document.getElementById('cierre_pId').value = idCierreProveedor;

  $scope.cierre_pId= idCierreProveedor;
};

$scope.addPagosProveedor = function(pago) {

  pago.cierre_p =  document.getElementById('cierre_pId').value;

  $http.post("http://localhost:3001/pagos/",pago)
    .success(function(respuesta){
          $scope.pagos = Pago.query();
          $scope.pago="";
   });

};  

$scope.monto_pagado=function(){
  var cierre_id = document.getElementById('cierre_id').value;
  var total=0;
  //var cierresProveedor;
  if (cierre_id != ''){
    $http.get("http://localhost:3001/cierresProveedor/")
    .success(function(cierres){
      //console.log(cierres);
       for (var i=0; i < cierres.length; i++){
        if (cierres[i].cierre == cierre_id) {
          total += cierres[i].total;
        } 
      }
     // console.log(total);
      $rootScope.scopeRaiz = total;
      $scope.ganancia(total,cierre_id);
   });
   
  }


 
 // console.log(cierre_id);
}

$scope.gramos=function(){
  var cierre_id = document.getElementById('cierre_id').value;
  var total=0;
  //var cierresProveedor;
  if (cierre_id != ''){
    $http.get("http://localhost:3001/cierresProveedor/")
    .success(function(cierres){
      //console.log(cierres);
       for (var i=0; i < cierres.length; i++){
        if (cierres[i].cierre == cierre_id) {
          total += cierres[i].cantidad;
        } 
      }
     //console.log(total);
      $rootScope.gramosp = total;
   });
   
  }


 
 // console.log(cierre_id);
}

$scope.ganancia=function(total_pago,cierre_id){

 //var cierre = Cierre.get({ id: cierre_id });
 var total_cierre = $scope.cierre.total;

// cierre.cantidad = $scope.cierre.cantidad;
 //cierre.precio = $scope.cierre.precio;
 $scope.cierre.ganancia = total_cierre - total_pago;
 // var total_pago = document.getElementById('total_pago').value;
 // var total_gramos = document.getElementById('total_gramos').value;
  // console.log($scope.cierre);
 $rootScope.ganancia = $scope.cierre.ganancia;

  $http.put("http://localhost:3001/cierres/"+cierre_id,$scope.cierre)
    .success(function(respuesta){
         console.log(respuesta); 
   });

 //console.log(total_pago+'/'+total_cierre);
}

$scope.tlf = function(id) {
  console.log('hola'+id);
  $scope.proveedor = Proveedor.get({ id: id });
};
  var language = {
        "sEmptyTable":     "Ingen tilgængelige data (prøv en anden søgning)",
        "sInfo":           "Viser _START_ til _END_ af _TOTAL_ rækker",
        "sInfoEmpty":      "Viser 0 til 0 af 0 rækker",
        "sInfoFiltered":   "(filtreret ud af _MAX_ rækker ialt)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "Vis _MENU_ rækker",
        "sLoadingRecords": "Henter data...",
        "sProcessing":     "Processing...",
        "sSearch":         "Filter:",
        "sZeroRecords":    "Ingen rækker matchede filter",
        "oPaginate": {
          "sFirst":    "Første",
          "sLast":     "Sidste",
          "sNext":     "Siguiente",
          "sPrevious": "Anterior"
        },
        "oAria": {
          "sSortAscending":  ": activate to sort column ascending",
          "sSortDescending": ": activate to sort column descending"
        }
      }

$scope.dtOptions = DTOptionsBuilder.newOptions()
        
        .withLanguage(language)
        
   
})

