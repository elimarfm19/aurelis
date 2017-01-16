'use strict';

app.controller('ctrl-cierre_p', function($scope,CierreProveedor,ngProgress) {

$scope.cierre_p = new CierreProveedor();

var refresh = function() {
  $scope.cierres_p = CierreProveedor.query(); 
  //$scope.cierre ="";
}
refresh();

$scope.add = function(cierre_p) {
  console.log(cierre_p);
  CierreProveedor.save(cierre_p,function(cierre_p){
  	
   //refresh();
   $scope.cierre_p = CierreProveedor.get({ id: cierre_p._id });
  });
};
$scope.update = function(cierre_p) {
  $scope.cierre_p.$update(function(cierreUpdated){
  	
  	refresh();
  });
};

$scope.remove = function(cierre_p) {
 CierreProveedor.$remove(function(){
    refresh();
  });
};

$scope.edit = function(id) {
  $scope.cierre_p = CierreProveedor.get({ id: id });
};  

$scope.deselect = function() {
  $scope.cierre_p = "";
}

})





	app.controller('ctrlModalPagos', function($scope){
		$scope.personas=[{
		ref: '1234',
		banco: 'Bancaribe',
		titular: 'Juana',
		monto: 15000
	}, {
		ref: 'V-20.153.333',
		banco: 'Juana Magallanes',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20',
		banco: 'Joao Da Silva',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20.153.333',
		banco: 'Pedro Perez',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20.153.333',
		banco: 'Maria Clavento',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20.153.333',
		banco: 'Juan',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}, {
		ref: 'V-20.153.333',
		banco: 'Luis Fonsi',
		titular: '+58 0414-8897458',
		monto: 'una casa, al lado de una referencia zona tal urb tal'
	}];

	$scope.eliminar = function(row) {
		if (confirm("¿Seguro que desea eliminar?")) {
		$scope.personas.splice(row, 1);
		}
  	};

  	$scope.agregar = function() {
		$scope.personas.push({
		ref: '',
		banco: '',
		titular: '',
		monto: ''
		})
  	};
});

