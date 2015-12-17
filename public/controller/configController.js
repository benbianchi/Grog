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
});


grogApp.service("ingredientService", function ($http, $q)
{
	var deferred = $q.defer();
	$http.get('/store/ingredients').then(function (data)
	{
		deferred.resolve(data);
	});

	this.getIngredients = function ()
	{
		return deferred.promise;
	}
});


grogApp.controller("valveController", function ($http, $scope, valveService, ingredientService)
{
	var promise = valveService.getValves();
	promise.then(function (data)
	{
		$scope.allValves = data.data;
		console.log($scope.allValves);
	});

	var ingPromise = ingredientService.getIngredients();
	ingPromise.then(function(res){
		$scope.ingredients = res.data;
		console.log($scope.ingredients);
	});


	 $scope.saveValves = function()
	{
		console.log($scope.allValves);
		$http.post('/config/grog.json',$scope.allValves);
	}
})

