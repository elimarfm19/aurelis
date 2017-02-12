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
  $scope.pago="";
  monto_pagado();
  gramos();
  //$rootScope.gramosp =0;
 // $rootScope.scopeRaiz =0;
}
var refresh2 = function(){

if ($routeParams.cierreId) {
  $scope.cierre = Cierre.get({ id: $routeParams.cierreId });
  monto_pagado();
  gramos();
}
else{
  //console.log('No tengo parametros');
}

}
refresh();
refresh2();

function monto_pagado(){
   //var cierre_id = document.getElementById('cierre_id').value;
  // console.log();
  var total=0;
  //var cierresProveedor;
  if ($routeParams.cierreId != ''){
    $http.get("http://localhost:3001/cierresProveedor/")
    .success(function(cierres){
      //console.log(cierres);
       for (var i=0; i < cierres.length; i++){
        if (cierres[i].cierre == $routeParams.cierreId) {
          total += cierres[i].total;
        } 
      }
      //console.log(total);
      $rootScope.scopeRaiz = total;
      $scope.ganancia(total,$routeParams.cierreId);
   });
   
  }
}

function gramos(){
   //var cierre_id = document.getElementById('cierre_id').value;
  var total=0;
  //var cierresProveedor;
  if ($routeParams.cierreId != ''){
    $http.get("http://localhost:3001/cierresProveedor/")
    .success(function(cierres){
      //console.log(cierres);
       for (var i=0; i < cierres.length; i++){
        if (cierres[i].cierre == $routeParams.cierreId) {
          total += cierres[i].cantidad;
        } 
      }
     //console.log(total);
      $rootScope.gramosp = total;
   });
   
  }
}

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

 // console.log(cierre.precio);
 //// console.log(cierre.total);
  //console.log(cierre.cantidad);
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
  //console.log(cierre);
  cierre.$remove(function(){
    refresh();
     //$window.location.reload();
  });
};

$scope.edit = function(id) {
  //console.log('cualquier cosa');
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
                //$scope.cierre_p ="";
                $scope.monto_pagado();
                $scope.gramos();

                  $scope.cierre_p.cantidad = 0;
                  $scope.cierre_p.precio = 0;
                  $scope.cierre_p.total = 0;
              // $window.location.reload();
                //refresh();
   });        

  console.log($scope.cierre_p.cantidad );
  console.log($scope.cierre_p.precio );
  console.log($scope.cierre_p.total );
}; 

$scope.deleteCierreProveedor = function(cierreProveedorId) {


  $http.get("http://localhost:3001/pagos/")
              .success(function(pagos){
     
               for (var i=0; i < pagos.length; i++){

                 if (pagos[i].cierre_p._id == cierreProveedorId) {

                 $http.delete("http://localhost:3001/pagos/"+pagos[i]._id)
                    .success(function(respuesta){
                         console.log("Eliminando Pago"+ pagos[i]._id);
                   });                 
                  }
             // console.log(total);
                } 
              //$scope.ganancia(total,cierre_id);
           });  

    $http.delete("http://localhost:3001/cierresProveedor/"+cierreProveedorId)
            .success(function(respuesta){




              $scope.proveedores = Proveedor.query();  
                $scope.cierreproveedores = CierreProveedor.query();
                //$scope.cierre_p ="";
                $scope.monto_pagado();
                $scope.gramos();

                  $scope.cierre_p.cantidad = 0;
                  $scope.cierre_p.precio = 0;
                  $scope.cierre_p.total = 0;



                
   //            //  $scope.cierre_p ="";
   //            // monto_pagado();
   //            //gramos();
   //            // $window.location.reload();
   //           // refresh();

   });
};

$scope.openPagosProveedor = function(idCierreProveedor) {

  document.getElementById('cierre_pId').value = idCierreProveedor;

  $scope.cierre_pId= idCierreProveedor;

  var cierre_p_id = idCierreProveedor;
  var total=0;
  //var cierresProveedor;
  if (cierre_p_id != ''){
    $http.get("http://localhost:3001/pagos/cierre/"+cierre_p_id)
    .success(function(pagos){
     
       for (var i=0; i < pagos.length; i++){
        if (pagos[i].cierre_p._id == cierre_p_id) {
          total += pagos[i].monto_pagado;
        
           $rootScope.totalCierreProveedor = pagos[i].cierre_p.total;
        } 
        
      }
     // console.log(total);
      $rootScope.totalPagos = total;
      
      //$scope.ganancia(total,cierre_id);
   })
    .error(function(error){
      //console.log('Error'+error);
      $rootScope.totalCierreProveedor = 0;
      $rootScope.totalPagos = 0;

    });
   
  }

  //monto_pagado_cierre();
  //console.log($scope.cierre_pId);
  //$scope.pagos = Pago.query();
};

$scope.addPagosProveedor = function(pago) {

  pago.cierre_p =  document.getElementById('cierre_pId').value;

  $http.post("http://localhost:3001/pagos/",pago)
    .success(function(respuesta){
          $scope.pagos = Pago.query();
          $scope.pago="";
          $scope.monto_pagado_cierre_p();
   });
    //$window.location.reload();

};
$scope.deletePagosProveedor = function(idPago) {

  //pago.cierre_p =  document.getElementById('cierre_pId').value;

  $http.delete("http://localhost:3001/pagos/"+idPago)
    .success(function(respuesta){
          $scope.pagos = Pago.query();
          $scope.pago="";
          $scope.monto_pagado_cierre_p();
   });
    //$window.location.reload();

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
$scope.monto_pagado_cierre_p=function(){
  var cierre_p_id = document.getElementById('cierre_pId').value;

  console.log(cierre_p_id);
  var total=0;
  //var cierresProveedor;
  if (cierre_p_id != ''){
    $http.get("http://localhost:3001/pagos/cierre/"+cierre_p_id)
    .success(function(pagos){
      //console.log(cierres);
       for (var i=0; i < pagos.length; i++){
        if (pagos[i].cierre_p._id == cierre_p_id) {
          total += pagos[i].monto_pagado;
        
           $rootScope.totalCierreProveedor = pagos[i].cierre_p.total;
        } 
        
      }
     // console.log(total);
      $rootScope.totalPagos = total;
      //$scope.ganancia(total,cierre_id);
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
  //console.log('hola'+id);
  $scope.proveedor = Proveedor.get({ id: id });
};

$scope.calcularCantidad = function(){

  $scope.cierre.cantidad = parseFloat($scope.cierre.total / $scope.cierre.precio).toFixed(2);

}

$scope.calcularTotal = function(){

  $scope.cierre.total = $scope.cierre.cantidad * $scope.cierre.precio;

}

$scope.calcularTotalP = function(){

  $scope.cierre_p.total = $scope.cierre_p.cantidad * $scope.cierre_p.precio;

}

$scope.calcularCantidadP = function(){

  $scope.cierre_p.cantidad = parseFloat($scope.cierre_p.total / $scope.cierre_p.precio).toFixed(2);

}

var language = {

    "sProcessing":     "Procesando...",
    "sLengthMenu":     "Mostrar _MENU_ registros",
    "sZeroRecords":    "No se encontraron resultados",
    "sEmptyTable":     "Ningún dato disponible en esta tabla",
    "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix":    "",
    "sSearch":         "Buscar:",
    "sUrl":            "",
    "sInfoThousands":  ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    }
    // "ordering": false,
    // "info":     false,
}

$scope.dtOptions = DTOptionsBuilder.newOptions()
        
        .withLanguage(language)
        .withOption('info', false); 
   
})

