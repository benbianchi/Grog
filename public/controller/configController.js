var grogApp = angular.module('grogApp', []);

grogApp.controller('metaController', function ($scope) {
  $scope.version='0.0.1';
})




grogApp.service("valveService", function ($http, $q)
{
	var deferred = $q.defer();
	$http.get('config/grog.json').then(function (data)
	{
		deferred.resolve(data);
	});

	this.getValves = function ()
	{
		return deferred.promise;
	}
})

.controller("valveController", function ($scope, valveService)
{
	var promise = valveService.getValves();
	promise.then(function (data)
	{
		$scope.allValves = data.data;
		console.log($scope.allValves);
	});
})