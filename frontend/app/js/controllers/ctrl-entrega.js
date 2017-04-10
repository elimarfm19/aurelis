'use strict';

app.controller('ctrl-entrega', function($scope,Entrega,$http,Cliente,DTOptionsBuilder,ngProgress,$window,$rootScope) {

var route_frontend = "http://localhost:9000/";
// var route_frontend = "https://aurelis-frontend.herokuapp.com/";
var route_backend = "http://localhost:3001/";
// var route_backend = "https://aurelis-backend.herokuapp.com/";

if (localStorage.getItem("username") !== null) {
    //console.log($localStorage.username);
     $rootScope.username = localStorage.getItem("username");
    document.getElementById("cont").value = 1200;
  }
  else{
   window.location = route_frontend;
  } 
$scope.entrega = new Entrega();
//$scope.cliente = new Cliente();
//$scope.cierre = new Cierre();

var refresh = function() {
  $scope.entregas = Entrega.query(); 
  

  //$scope.cierrescliente = [];  //cierresproveedor
}
refresh();

$scope.add = function(entrega) {
  


 // console.log(entrega.cliente);

  $http.get(route_backend+"clientes/"+entrega.cliente)
            .success(function(cliente){
                //console.log(respuesta);
        $scope.restante = cliente.cerrado - cliente.entregado;
                //refresh();
   });

  Entrega.save(entrega,function(entrega){


      

        $scope.entrega = Entrega.get({ id: entrega._id });
     
       
       //$scope.cliente = Cliente.get({ id: entrega.cliente._id });
    //refresh();
  });
};

$scope.update = function(entrega) {

  entrega.cantidad = document.getElementById('cantidade').value;
  // console.log(entrega.cantidad);
  $scope.entrega.$update(function(entregaUpdated){

    $http.get(route_backend+"clientes/"+entregaUpdated.cliente)
      .success(function(cliente){
       
       var historialCliente = {
          fecha : moment(entregaUpdated.fecha_entrega).format('DD-MM-YYYY'),
          cierre : null,
          entrega : entregaUpdated._id,
          cliente : entregaUpdated.cliente,
          cerrado: Number(cliente.cerrado),
          entregado: Number(cliente.entregado),
          pendiente : (- Number(cliente.cerrado) + Number(cliente.entregado) )
       }
        $http.post(route_backend+"historial/cliente",historialCliente)
            .success(function(historial){
             console.log(historial); 
            $window.location.reload();
           
        }); 
    });
    
  });
};


$scope.remove = function(entrega) {
 entrega.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.entrega = Entrega.get({ id: id });
};  

$scope.deselect = function() {
  $scope.entrega = "";
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
}

$scope.dtOptionsE = DTOptionsBuilder.newOptions()
        
        .withLanguage(language)
        .withOption('info', false); 

})
