

var app = angular.module('myapp',[]);

	app.controller('ctrlpaginado', function($scope){
		$scope.personas=[{
		orden: 1,
		cliente: 'Juan Perez',
		cierre: 2799,
		entregado: 2000,
		precio: 98000,
		fecha_entrega: '20-12-2016'
	}, {
		orden: 2,
		cliente: 'Pedro Perez',
		cierre: 7100,
		entregado: 5850,	
		precio: 97500,
		fecha_entrega: '21-12-2016'
	}, {
		orden: 3,
		cliente: 'Juana Margarita',
		cierre: 10250,
		entregado: 10000,		
		precio: 98000,
		fecha_entrega: '19-12-2016'
	}, {
		orden: 4,
		cliente: 'Manuel  Guzman',
		cierre: 250,
		entregado: 0,		
		precio: 1000000,
		fecha_entrega: '20-12-2016'
	}, {
		orden: 5,
		cliente: 'Andres Morillo',
		cierre: 5550,
		entregado: 550,		
		precio: 98500,
		fecha_entrega: '21-12-2016'
	}, {
		orden: 6,
		cliente: 'Adriana Sosa',
		cierre: 1250,
		entregado: 900,
		precio: 98250,
		fecha_entrega: '21-12-2016'
	}, {
		orden: 7,
		cliente: 'Adriana Sosa',
		cierre: 5250,
		entregado: 2000,
		precio: 97000,
		fecha_entrega: '21-12-2016'
	}, {
		orden: 9,
		cliente: 'Adriana Sosa',
		cierre: 10250,
		entregado: 1000,
		precio: 99000,
		fecha_entrega: '22-12-2016'
	}, {
		orden: 8,
		cliente: 'Juana Margarita',
		cierre: 1250,
		entregado: 1000,
		precio: 98000,
		fecha_entrega: '22-12-2016'
	}, {
		orden: 10,
		cliente: 'Nayker Arevalo',
		cierre: 1000,
		entregado: 575,
		precio: 99000,
		fecha_entrega: '21-12-2016'
	}, {
		orden: 11,
		cliente: 'Elias Tomedez',
		cierre: 3550,
		entregado: 0,
		precio: 99500,
		fecha_entrega: '22-12-16'
	}, {
		orden: 12,
		cliente: 'Tirso Garcia',
		cierre: 9650,
		entregado: 50,
		precio: 98000,
		fecha_entrega: '19-12-2016'
	}, {
		orden: 13,
		cliente: 'Joa Da Silva',
		cierre: 5000,
		entregado: 2250,
		precio: 99000,
		fecha_entrega: '20-12-2016'
	}, {
		orden: 14,
		cliente: 'Juan Perez',
		cierre: 2500,
		entregado: 500,
		precio: 98500,
		fecha_entrega: '22-12-2016'
	}, {
		orden: 15,
		cliente: 'Juan Linares',
		cierre: 1900,
		entregado: 900,
		precio: 97500,
		fecha_entrega: '22-12-2016'
	}, {
		orden: 16,
		cliente: 'Juan Andrade',
		cierre: 15500,
		entregado: 10500,
		precio: 98000,
		fecha_entrega: '23-12-2016'
	}, {
		orden: 17,
		cliente: 'Joan Da Silva',
		cierre: 9000,
		entregado: 2250,
		precio: 97500,
		fecha_entrega: '24-12-2016'
	}, {
		orden: 18,
		cliente: 'Joao Da Silva',
		cierre: 5000,
		entregado: 2500,
		precio: 98000,
		fecha_entrega: '24-12-2016'
	}];
});

		app.controller('ctrlmodal', function($scope){
		$scope.personas=[{
		fecha: '22-12-2016',
		proveedor: 'Juan Perez',
		cantidad: 10750,
		precio: 97000,
	}, {
		fecha: '22-12-2016',
		proveedor: 'Juana Magallanes',
		cantidad: 5900,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Joao Da Silva',
		cantidad: 8500,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Pedro Perez',
		cantidad: 5900,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Maria Clavento',
		cantidad: 8900,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Juan',
		cantidad: 9000,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Luis Fonsi',
		cantidad: 1250,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Juan Andrade',
		cantidad: 6500,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Miguel Roman',
		cantidad: 7500,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Teresa Gomez',
		cantidad: 8500,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Juan Perez',
		cantidad: 6500,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Jose Perez',
		cantidad: 3500,
		precio: 98000,
		
	}, {
		fecha: '20-12-2016',
		proveedor: 'Manuel Orta',
		cantidad: 2200,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Jose Perez',
		cantidad: 1500,
		precio: 98000,
		
	}, {
		fecha: '20-12-2016',
		proveedor: 'Manuel Andrade',
		cantidad: 4500,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Nelson Muñoz',
		cantidad: 10500,
		precio: 98000,
		
	}, {
		fecha: '22-12-2016',
		proveedor: 'Tirso Garcia',
		cantidad: 25500,
		precio: 98000,
		
	}, {
		fecha: '20-12-2016',
		proveedor: 'Daniel Garcia',
		cantidad: 3300,
		precio: 98000,
		
	}];
});

var application = angular.module('ngPagination', [])
.filter('startFrom', function() {
    return function(input, inicio) {
    	if (input!==undefined) {
	        inicio = +inicio;
	        return input.slice(inicio);
    	}else{
    		console.error("Modulo ng-pagination Filter startFrom Error");
    		throw "Filter startFrom tiene variable "+input;
    	}
    };
})
.filter('pagFilter', function () {
	return filtrar;
})
.service('$paginationRegister', function($injector){
	function registerMetodos () {
		this.page_id = '';
		this.variable = '';
	}
	registerMetodos.prototype.set = function (id) {
		this.page_id = 'pag_'+id;
		this.variable = id;
	};
	registerMetodos.prototype.get = function () {
		return this.page_id;
	};
	registerMetodos.prototype.getDataNotation = function () {
		return this.variable;
	};
	registerMetodos.prototype.getSizeNotation = function () {
		return this.page_id + '.pageSize';
	};
	registerMetodos.prototype.getPagesNotation = function () {
		return this.page_id + '.pages';
	};
	registerMetodos.prototype.getDataLengthNotation = function () {
		return this.page_id + '.dataLength';
	};
	registerMetodos.prototype.getCurrentNotation = function () {
		return this.page_id + '.pageCurrent';
	};

	registerMetodos.prototype.getNextNotation = function () {
		return this.page_id + '.nextPage';
	};
	registerMetodos.prototype.getBeforeNotation = function () {
		return this.page_id + '.beforePage';
	};
	registerMetodos.prototype.getSearchNotation = function () {
		return this.variable+'_search';
	};

	return function() {
		return $injector.instantiate(registerMetodos);
	};
});

var getPaginas = function (datos, size){
	var pag=0;
	if (datos!==undefined) {pag = Math.ceil(datos.length/size);}
    return pag;
};

var getVarname = function (RepeatValue) {
	var variable = RepeatValue.replace(' in ','~');
	variable = variable.replace(' | ','~');
	variable = variable.replace('|','~');
	variable = variable.split('~');
	return variable[1].replace(' ','');
};

// DIRECTIVA PARA PAGINAR
application.directive('ngPagination', function($compile, $parse, $paginationRegister){

	return {
		terminal: true, // NOS SIRVE POR SI TENEMOS OTRA DIRECTIVA DENTRO DEL  NG-REPEAT
        multiElement: true,
        priority: 20,
	    restrict: 'A', // RESTRINGIDO SOLO A ATTRIBUTO
		scope: false, // NOS DICE QUE EL SCOPE ES EL MISMO DEL CONTROLADOR

		compile: function(tElement, tAttrs) {
			// COMPILE RETURNED LINKED
			return function(scope, element, attr){
				var registro = new $paginationRegister();
				var dataNotation = getVarname(element.attr('ng-pagination'));
				registro.set(dataNotation);
				$parse(registro.get()).assign(scope, {pageCurrent:0, pageSize:5, pages:1, dataLength:1, nextPage: function(){}, beforePage: function(){}});

				// AGREGANDO ng-repeat Y QUITANDO ng-pagination PARA EVITAR LOOP
				element.attr('ng-pagination', element.attr('ng-pagination') + " | pagFilter:"+registro.getSearchNotation());
				element.attr('ng-pagination', element.attr('ng-pagination') + " | startFrom:"+registro.getCurrentNotation()+"*"+registro.getSizeNotation()+" | limitTo:"+registro.getSizeNotation());
				element.attr('ng-repeat', element.attr('ng-pagination'));
				element.removeAttr('ng-pagination');

				// NUMERO DE DATOS POR PAGINA
				var size = Number(element.attr('ng-pagination-size')) + 0;
				if(angular.isDefined(size) && angular.isNumber(size) && size>0){
					$parse(registro.getSizeNotation()).assign(scope, Number(size));
				}

				// NUMERO DE PAGINAS
				var paginas = getPaginas($parse(dataNotation)(scope), $parse(registro.getSizeNotation())(scope));
				if(paginas!==undefined && paginas!==''){
					$parse(registro.getPagesNotation()).assign(scope, Number(paginas));
				}

				// EVENTO WATCH PARA CUANDO CAMBIA LA VARIABLE DE LOS DATOS
				scope.$watch(dataNotation, function () {
					var data = $parse(dataNotation)(scope);
					var paginas = getPaginas(data, $parse(registro.getSizeNotation())(scope));
					$parse(registro.getPagesNotation()).assign(scope, Number(paginas));
					$parse(registro.getDataLengthNotation()).assign(scope, data.length);
				});

				$compile(element)(scope);
			};
		}
	};
});


// DIRECTIVA PARA LOS CONTROLES DE PAGINACION
application.directive('ngPaginationControl', function($compile, $parse, $paginationRegister){
	// VARIABLES PARA CREAR ESTILO
	var fondo='#03A9F4';
	var fondoHover='#286090';
	var color='black';
	var alto= '40px';
	var borderRadius=6;

	function CreateStyle() {
		var estilo = '<style>'+
			'.pagination-panel{'+
			'position: relative;'+
			'display: -webkit-inline-box;'+
			'height: '+alto+';'+
			'border: 0px solid #2e6da4;'+
			// 'box-shadow: inset 0 -3px rgba(0,0,0,0.5);'+
			'border-radius:'+borderRadius+'px;'+
		'}'+
		'.pagination-panel .indicator{'+
			'color: '+color+';'+
			'font-weight: bold;'+
			'font-size: 12px;'+
			'padding: 0px 10px;'+
			'line-height: 50px;'+
		'}'+
		'.pagination-panel button{'+
			'background-color: '+fondo+';'+
			'color: '+color+';'+
			// 'box-shadow: inset 0 -3px rgba(0,0,0,0.5);'+
			// 'height: '+alto+';'+
			'height: 100%;'+
			// 'padding-bottom:2px;'+
			'border: none;'+
			'cursor: pointer;'+
		'}'+
		'.pagination-panel button:hover{'+
			'background-color: '+fondoHover+';'+
		'}'+
		'.pagination-panel button:first-child{'+
			'border-radius: '+(borderRadius-2)+'px 0px 0px '+(borderRadius-2)+'px;'+
			'border-right: none;'+
		'}'+
		'.pagination-panel button:last-child{'+
			'border-radius: 0px '+(borderRadius-2)+'px '+(borderRadius-2)+'px 0px;'+
			'border-left: none;'+
		'}'+
		'.pagination-panel button[disabled]{'+
			'color: #506E7D;'+
			'background-color: #D1D5D8;'+
			'cursor: not-allowed;'+
		'}'+
		'</style>';
		angular.element(document.head).prepend(estilo);
	}

	return {
		priority:10,
		restrict:'E',
		scope:false,

		compile: function (element, attrs) {
			var registro = new $paginationRegister();
			if(element.attr('pagination-id')===undefined || element.attr('pagination-id')===''){
				throw "directiva NG-PAGINATION-CONTROL requiere atributo pagination-id\n";
			}else{
				registro.set(element.attr('pagination-id'));
			}

			if(element.attr('background')!==undefined && element.attr('background')!==''){
				fondo = element.attr('background');
			}
			if(element.attr('background-hover')!==undefined && element.attr('background-hover')!==''){
				fondoHover = element.attr('background-hover');
			}
			if(element.attr('color')!==undefined && element.attr('color')!==''){
				color = element.attr('color');
			}
			if(element.attr('height')!==undefined && element.attr('height')!==''){
				alto = element.attr('height');
			}
			CreateStyle();

			// COMPILE RETURNED LINKED
			return function (scope, element, atributos) {
				var dataNotation = registro.getDataNotation();
				var resultados = filtrar($parse(dataNotation)(scope), $parse(registro.getSearchNotation())(scope));
				var controls = angular.element(
					'<div class="row'+
						'<div class="btn-group col-md-11">'+
							'<div class="pagination-panel">'+
								'<button ng-click="'+registro.getBeforeNotation()+'()" type="button"'+
								'ng-disabled="'+registro.getCurrentNotation()+'<=0">&laquo;</button>'+

								'<label class="indicator">{{'+registro.getCurrentNotation()+'+1}}/{{'+registro.getPagesNotation()+'}}</label>'+

								'<button ng-click="'+registro.getNextNotation()+'()" type="button"'+
								'ng-disabled="'+registro.getCurrentNotation()+'>=('+registro.getDataLengthNotation()+'/'+registro.getSizeNotation()+')-1">&raquo;</button>'+
							'</div>'+
						'</div>'+
					'</div');

				$parse(registro.getBeforeNotation()).assign(scope, function () {
					var actual = $parse(registro.getCurrentNotation())(scope);
					actual = actual-1;
					$parse(registro.getCurrentNotation()).assign(scope, actual);
				});

				$parse(registro.getNextNotation()).assign(scope, function () {
					var actual = $parse(registro.getCurrentNotation())(scope);
					actual = actual+1;
					$parse(registro.getCurrentNotation()).assign(scope, actual);
				});

				$compile(controls)(scope);
				element.replaceWith(controls);
			};
		}
	};
});


// METODO PARA FILTRAR DATOS DE UN JSON
function filtrar(DATOS, FILTRO) {
	var busqueda=[];
	if(FILTRO==='' || FILTRO===undefined){
		return DATOS;
	}
	angular.forEach(DATOS, function(fila) {
		for(var key in fila){
			var propiedad = fila[key];
			if (esIgualFn(propiedad, FILTRO)) { busqueda.push(fila); return; }
		}
	});
	return busqueda;
}
function esIgualFn(propiedad, filtro) {
	if(angular.isString(propiedad)){propiedad = propiedad.toLowerCase();}
	if(angular.isString(filtro)){filtro = filtro.toLowerCase();}
	if(angular.isString(propiedad) && propiedad.length<100 && (angular.isString(filtro) || angular.isNumber(filtro)) ) {
		if (propiedad.indexOf(filtro)>-1) {return true;}
	}
	return false;
}

application.directive('ngPaginationSearch', function($compile, $parse, $paginationRegister){
	return {
		priority: 5,
		restrict:'A',
		scope:false,

		compile: function(iElement, iAttrs){
			// ESTA DIRECTIVA SOLO PUEDE SER USADA POR UN ELEMENTO INPUT
			if(iElement[0].localName.toLowerCase()!='input'){
				throw "DIRECTIVE NG-PAGINATION-SEARCH SOLO PUEDE SER USADA POR UN ELEMENTO INPUT\n";
			}

			var registro = new $paginationRegister();
			if(iElement.attr('ng-pagination-search')===undefined || iElement.attr('ng-pagination-search')===''){
				throw "DIRECTIVE NG-PAGINATION-SEARCH NOT VALUE\n";
			}else{
				registro.set(iElement.attr('ng-pagination-search'));
			}

			return function (scope, element, attrs){
				var modelo = registro.getSearchNotation();
				element.attr('ng-model',modelo);
				element.removeAttr('ng-pagination-search');

				// EVENTO WATCH PARA EL CAMBIO DEL INPUT EN BUSQUEDA
				var dataNotation = registro.getDataNotation();
				var tempDataNotation = dataNotation+'_tmp';
				$parse(modelo).assign(scope,'');
				scope.$watch(modelo, function () {
					// CAPTURANDO EL VALOR DEL INPUT
					var paginas=0;
					var filtro = $parse(modelo)(scope);
					// AL MOMENTO DE BUSQUEDA MANDAR EL CURRENT PAGE A 0 PARA QUE SE VAYA A LA PRIMERA PAGINA
					$parse(registro.getCurrentNotation()).assign(scope, 0);
					if(filtro===undefined || filtro===''){
						paginas = getPaginas($parse(dataNotation)(scope), $parse(registro.getSizeNotation())(scope));
						$parse(registro.getDataLengthNotation()).assign(scope, ($parse(dataNotation)(scope)).length);
						$parse(registro.getPagesNotation()).assign(scope, Number(paginas));
					}else{
						var resultados = filtrar($parse(dataNotation)(scope), filtro);
						paginas = getPaginas(resultados, $parse(registro.getSizeNotation())(scope));
						$parse(registro.getDataLengthNotation()).assign(scope, resultados.length);
						$parse(registro.getPagesNotation()).assign(scope, Number(paginas));
					}
				});
				$compile(element)(scope);
			};
		}
	};
});