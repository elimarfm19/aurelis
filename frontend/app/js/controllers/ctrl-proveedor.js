'use strict';

app.controller('ctrl-proveedor', function($scope,Proveedor,CierreProveedor,ngProgress,DTOptionsBuilder,$window,$http) {

$scope.proveedor = new Proveedor();
$scope.cierres_p = new CierreProveedor();
$scope.reporteP = true;

var refresh = function() {
  $scope.proveedores = Proveedor.query(); 
  $scope.cierres_p = CierreProveedor.query();
  $scope.cierresproveedor = [];
  $scope.proveedor ="";

}

refresh();

$scope.add = function(proveedor) {
  //console.log(proveedor);
  Proveedor.save(proveedor,function(proveedor){
    //refresh();

    $window.location.reload();
  });
};
$scope.update = function(proveedor) {
  $scope.proveedor.$update(function(){
    //refresh();
    $window.location.reload();
  });
};

$scope.remove = function(proveedor) {
 proveedor.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.proveedor = Proveedor.get({ id: id });
};  

$scope.deselect = function() {
  $scope.proveedor = "";
}

$scope.direccion = function(id) {
  $scope.proveedor = Proveedor.get({ id: id });
};

$scope.contacto = function(id) {
  //  console.log($scope.contacto);
  $scope.proveedor = Proveedor.get({ id: id });
 
};

$scope.tlf = function(id) {
  //  console.log($scope.contacto);
  $scope.proveedor = Proveedor.get({ id: id });
 
};

$scope.verifyDuplicate = function() {

      $scope.isvalid = false;

       angular.forEach($scope.proveedores, function(value, key){
        if(!$scope.isvalid)
        {
          if(value.nacionalidad+value.ced_rif == $scope.proveedor.nacionalidad+$scope.proveedor.ced_rif)
          {
            $scope.isvalid = true;
          }
        }
        });
    };

  // $scope que acciona el ng-change
  $scope.mostrarCierres = function(id) { 
          // $scope.selCategorias NOS TRAE EL VALOR DEL SELECT DE CATEGORIAS
         //console.log( $scope.cliente);
    //$scope.isvalid = false;
        //console.log( $scope.cierres[0].cliente._id);
        $scope.cierresproveedor = [];
        for (var i=0; i <$scope.cierres_p.length; i++){
          if ($scope.cierres_p[i].proveedor._id == id) {
           $scope.cierresproveedor.push($scope.cierres_p[i]);
          } 
        }
     
  };

    $scope.buscarProveedor = function(id) { 
      //console.log(id);
      $scope.proveedor = Proveedor.get({ id: id });
      console.log($scope.proveedor);
     
  };

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

$scope.dtOptions = DTOptionsBuilder.newOptions()
        
        .withLanguage(language)
        .withOption('info', false); 


$scope.generarpqt= function(recepcion) {


  var base64Img = null;

  
    // Returns a new array each time to avoid pointer issues
    var getColumns = function () {
        return [
            {title: "Id", dataKey: "id"},
            {title: "Fecha Entrega", dataKey: "fecha"},
            {title: "Cantidad", dataKey: "cantidad"}
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
       
    $http.get("http://localhost:3001/recepciones/"+recepcion)
                .success(function(recepciones){
                  console.log(recepciones);
                 var data = []; 
                  //for (var i = 0; i < recepciones.length; i++) {
                      data.push({
                          id: recepciones.RecepcionId,
                          fecha: moment(recepciones.fecha_entrega).format('DD-MM-YYYY'),
                          cantidad: recepciones.cantidad
                      });
                //  }
  
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

$scope.generarpqtP= function() {


  var base64Img = null;

  
    // Returns a new array each time to avoid pointer issues
    var getColumns = function () {
        return [
            {title: "Id", dataKey: "id"},
            {title: "Fecha Entrega", dataKey: "fecha"},
            {title: "Cantidad", dataKey: "cantidad"}
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
       
    $http.get("http://localhost:3001/recepciones/proveedor/"+$scope.proveedor._id)
                .success(function(recepciones){
                  console.log(recepciones);
                 var data = []; 
                  for (var i = 0; i < recepciones.length; i++) {
                      data.push({
                          id: recepciones[i].RecepcionId,
                          fecha: moment(recepciones[i].fecha_entrega).format('DD-MM-YYYY'),
                          cantidad: recepciones[i].cantidad
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

$scope.generarpqtPorRecibir= function() {


  var base64Img = null;

  
    // Returns a new array each time to avoid pointer issues
    var getColumns = function () {
        return [
            {title: "Id", dataKey: "id"},
            {title: "Proveedor", dataKey: "proveedor"},
            {title: "Cerrado (g)", dataKey: "cerrado"},
            {title: "Entregado (g)", dataKey: "entregado"},
            {title: "Pendiente (g)", dataKey: "pendiente"},
            {title: "Fecha Última Entrega", dataKey: "fecha_ultima_entrega"}
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
       
    $http.get("http://localhost:3001/recepciones/")
                .success(function(recepciones){
                  console.log(recepciones);
                 var data = []; 
                  for (var i = 0; i < recepciones.length; i++) {
                      data.push({
                          id: recepciones[i].RecepcionId,
                          proveedor: recepciones[i].proveedor.nombres + recepciones[i].proveedor.apellidos,
                          cerrado: recepciones[i].proveedor.cerrado,
                          entregado: recepciones[i].proveedor.entregado,
                          pendiente: recepciones[i].proveedor.entregado - recepciones[i].proveedor.cerrado,
                          fecha_ultima_entrega: moment(recepciones[i].proveedor.ultima_entrega).format('DD-MM-YYYY')
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
