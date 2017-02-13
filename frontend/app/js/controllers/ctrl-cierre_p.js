'use strict';

app.controller('ctrl-cierre_p', function($scope,$filter,$rootScope,CierreProveedor,DTOptionsBuilder,ngProgress,$window,$http) {

$scope.cierre_p = new CierreProveedor();
$scope.reporteCierre = true;

var refresh = function() {
  $scope.cierres_p = CierreProveedor.query(); 
  //$scope.cierre ="";
}
refresh();

$scope.add = function(cierre_p) {
  // console.log(cierre_p);
  cierre_p.fecha_entrega =document.getElementById('fecha_entrega').value;
  CierreProveedor.save(cierre_p,function(cierre_p){
  	
   //refresh();
   $scope.cierre_p = CierreProveedor.get({ id: cierre_p._id });
  });
};
$scope.update = function(cierre_p) {
// console.log(cierre_p);
console.log("Valor Raiz "+$rootScope.scopeRaiz);
  //cierre_p.monto_pagado = document.getElementById('monto_pagado').value;
  cierre_p.fecha_entrega =document.getElementById('fecha_entrega').value;
  cierre_p.monto_pagado = $rootScope.scopeRaiz;
  $scope.cierre_p.$update(function(cierre_pUpdated){
  	
  	refresh();
  });
};

$scope.remove = function(cierre_p) {
  console.log(cierre_p);
  cierre_p.$remove(function(){
    //refresh();
    $window.location.reload();
  });
};

$scope.edit = function(id) {
  $scope.cierre_p = CierreProveedor.get({ id: id });
};  

$scope.deselect = function() {
  //$window.location.href="http://localhost:9000/aurelis.html#/cierre_proveedor";
  //$route.reload();
  $window.location.reload();

  // $scope.cierre_p = "";
  // $scope.pago_p = "";
}

$scope.date = function() {
  $scope.date = $filter('date')($scope.cierre_p.fecha_entrega, "yyyy-MM-dd");
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

$scope.dtOptionsDCP = DTOptionsBuilder.newOptions()
        
        .withLanguage(language)
        .withOption('info', false); 

$scope.generarpqtDCP= function(cierre_p) {


  var base64Img = null;

  
    // Returns a new array each time to avoid pointer issues
    var getColumns = function () {
        return [
            {title: "Id", dataKey: "id"},
            {title: "Fecha Cierre", dataKey: "fecha_cierre"},
            {title: "Fecha Entrega", dataKey:"fecha_entrega"},
            {title: "Cantidad", dataKey: "cantidad"},
            {title: "Precio", dataKey: "precio"},
            {title: "Total", dataKey: "total"}
        ];
    };

    function imgToBase64(url, callback) {
      if (!window.FileReader) {
          callback(null);
          return;
      }
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result.replace('text/xml', 'image/jpeg'));
          };
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    }

    imgToBase64('document.jpg', function(base64) {
        base64Img = base64;
    }); 
       
    $http.get("http://localhost:3001/cierresProveedor/"+cierre_p)
                .success(function(cierresProveedor){
                  console.log(cierresProveedor);
                 var data = []; 
                  //for (var i = 0; i < cierresProveedor.length; i++) {
                      data.push({
                          id: cierresProveedor.Cierre_pId,
                          fecha_cierre: moment(cierresProveedor.fecha_cierre).format('DD-MM-YYYY'),
                          fecha_entrega: moment(cierresProveedor.fecha_entrega).format('DD-MM-YYYY'),
                          cantidad: cierresProveedor.cantidad,
                          precio: cierresProveedor.precio,
                          total: cierresProveedor.total
                      });
                //  }
  
       var doc = new jsPDF('p','pt');
       var totalPagesExp = "{total_pages_count_string}";

       var pageContent = function (data) {
        // HEADER
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        if (base64Img) {
            doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
        }
        doc.text("Report", data.settings.margin.left + 15, 22);

        // FOOTER
        var str = "Page " + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
    };

    doc.autoTable(getColumns(), data, {
        addPageContent: pageContent,
        margin: {top: 30}
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
    } 


      
       doc.save('table.pdf');

    

    });
             
}

$scope.generarpqtCierre= function(proveedor) {


  var base64Img = null;

  
    // Returns a new array each time to avoid pointer issues
    var getColumns = function () {
        return [
            {title: "Id", dataKey: "id"},
            {title: "Fecha Cierre", dataKey: "fecha_cierre"},
            {title: "Fecha Entrega", dataKey: "fecha_entrega"},
            {title: "Cantidad", dataKey: "cantidad"},
            {title: "Precio", dataKey: "precio"},
            {title: "Total", dataKey: "total"}
        ];
    };

    function imgToBase64(url, callback) {
      if (!window.FileReader) {
          callback(null);
          return;
      }
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function() {
          var reader = new FileReader();
          reader.onloadend = function() {
              callback(reader.result.replace('text/xml', 'image/jpeg'));
          };
          reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.send();
    }

    imgToBase64('document.jpg', function(base64) {
        base64Img = base64;
    }); 

    //console.log('aqui '+proveedor);
       
    $http.get("http://localhost:3001/cierresProveedor/proveedor/"+proveedor)
                .success(function(cierresProveedor){
                  console.log(cierresProveedor);
                 var data = []; 
                  for (var i = 0; i < cierresProveedor.length; i++) {
                      data.push({
                          id: cierresProveedor[i].Cierre_pId,
                          fecha_cierre: moment(cierresProveedor[i].fecha_cierre).format('DD-MM-YYYY'),
                          fecha_entrega: moment(cierresProveedor[i].fecha_entrega).format('DD-MM-YYYY'),
                          cantidad: cierresProveedor[i].cantidad,
                          precio: cierresProveedor[i].precio,
                          total: cierresProveedor[i].total
                      });
                 }
  
       var doc = new jsPDF('p','pt');
       var totalPagesExp = "{total_pages_count_string}";

       var pageContent = function (data) {
        // HEADER
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');
        // if (base64Img) {
        //     doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10);
        // }
        // doc.text("Report", data.settings.margin.left + 15, 22);

        // FOOTER
        var str = "Page " + data.pageCount;
        // Total page number plugin only available in jspdf v1.0+
        if (typeof doc.putTotalPages === 'function') {
            str = str + " of " + totalPagesExp;
        }
        doc.setFontSize(10);
        doc.text(str, data.settings.margin.left, doc.internal.pageSize.height - 10);
    };

    doc.autoTable(getColumns(), data, {
        addPageContent: pageContent,
        margin: {top: 30}
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
        doc.putTotalPages(totalPagesExp);
    } 


      
       doc.save('table.pdf');

    

    });
             
}
})