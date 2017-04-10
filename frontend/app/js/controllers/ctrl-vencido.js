'use strict';
// 
app.controller('ctrl-vencido', function($scope,$rootScope,ngProgress,$http) {

var route_frontend = "http://localhost:9000/";
// var route_frontend = "https://aurelis-frontend.herokuapp.com/";
var route_backend = "http://localhost:3001/";
// var route_backend = "https://aurelis-backend.herokuapp.com/";

if (localStorage.getItem("username") !== null) {
   // console.log($localStorage.username);
    $rootScope.username = localStorage.getItem("username");
    document.getElementById("cont").value = 1200;
  }
  else{
   window.location = route_frontend;
  } 
    $scope.clientes_pendientes = [];
    $scope.proveedores_pendientes = [];

    var fecha_actual = moment();

    $http.get(route_backend+"/clientes")
      .success(function(clientes){

          for (var i = 0; i < clientes.length; i++) 
          {
            if (clientes[i].cerrado>0) 
            {

              $http.get(route_backend+"/historial/cliente/"+clientes[i]._id)
                  .success(function(historiales){
                  
                  // console.log(historiales);
                  
                   var vencido = historiales[historiales.length-1].pendiente;
                    //console.log(vencido);
                   for (var j=historiales.length-1; j >= 0; j--)
                   {
                      if ((fecha_actual.diff(historiales[j].fecha_cierre,'days')>7) && (typeof(historiales[j].fecha_entrega)!= 'undefined')) {
                          //vencido+= historiales[i].cierre.cantidad;
                        $scope.clientes_pendientes.push({"cliente":historiales[j].cliente.nombres +' '+historiales[j].cliente.apellidos,
                                  "telefono":historiales[j].cliente.tlf,
                                  "vencido": numeral(vencido).format('0,0.00')});
                        break;
                       // return true;
                       //status = true;
                      }else if((fecha_actual.diff(historiales[j].fecha_cierre,'days')<=7) && (typeof(historiales[j].fecha_entrega)!= 'undefined'))
                      {
                        vencido+= historiales[j].cierre.cantidad;
                      }
                    //return status;
                      //data.push(fecha_actual.diff(historiales[i].fecha_entrega,'days'));
                   }
                  
                   //fecha2.diff(fecha1, 'days')
                  //$scope.ven = historiales;
                });

            }

          }
          console.log($scope.clientes_pendientes);
      });

      $http.get(route_backend+"/proveedores")
      .success(function(proveedor){

          for (var i = 0; i < proveedor.length; i++) 
          {
            if (proveedor[i].cerrado>0) 
            {

              $http.get(route_backend+"/historial/proveedor/"+proveedor[i]._id)
                  .success(function(historiales){
                  
                  // console.log(historiales);
                  
                   var vencido_proveedor = historiales[historiales.length-1].pendiente;
                    //console.log(vencido_proveedor);
                   for (var j=historiales.length-1; j >= 0; j--)
                   {
                      if ((fecha_actual.diff(historiales[j].fecha_cierre,'days')>7) && (typeof(historiales[j].fecha_entrega)!= 'undefined')) {
                          //vencido_proveedor+= historiales[i].cierre.cantidad;
                        $scope.proveedores_pendientes.push({"proveedor":historiales[j].proveedor.nombres +' '+historiales[j].proveedor.apellidos,
                                  "telefono":historiales[j].proveedor.tlf,
                                  "vencido": numeral(vencido_proveedor).format('0,0.00')});
                        break;
                       // return true;
                       //status = true;
                      }else if((fecha_actual.diff(historiales[j].fecha_cierre,'days')<=7) && (typeof(historiales[j].fecha_entrega)!= 'undefined'))
                      {
                        vencido_proveedor+= historiales[j].cierre.cantidad;
                      }
                    //return status;
                      //proveedores.push(fecha_actual.diff(historiales[i].fecha_entrega,'days'));
                   }
                  
                   //fecha2.diff(fecha1, 'days')
                  //$scope.ven = historiales;
                });

            }

          }
          console.log($scope.proveedores_pendientes);
      });  

})
