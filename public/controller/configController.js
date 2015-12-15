var grogApp = angular.module('grogApp', []);

grogApp.controller('metaController', function ($scope) {
  $scope.version='0.0.1';
});


grogApp.controller('getValveObjects', function ($scope) {
	//TODO build service to return the valves
	
	console.log("Reading Valve Objects");
	
  $scope.allValves = [{title:"",amount:""},{title:"",amount:""}];

});
