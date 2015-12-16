var grogApp = angular.module('grogApp', ['ngRoute']);


grogApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/view/:index', {
                    templateUrl: '/partials/IngredientDetail.html',
                    controller: 'RouteController'
                }).
                when('/', {
                    templateUrl: '/partials/IngredientDirectory.html',
                    controller: 'IngredientController'
                })
        }]);

grogApp.service("ingredientService",function(){
	var ingredients = [];
	var setIngredients = function(list)
	{
		ingredients = list;
	} 
	var getIngredients = function(){
		return ingredients;
	}
	return	{	
		setIngredients: setIngredients,
		getIngredients: getIngredients
	};
});

    grogApp.controller("RouteController",function($scope,$routeParam, ingredientService){
    		// var index = $routeParams.index

			
			$scope.ingredient = ingredientService.getIngredients[$routeParams.index];
			console.log($scope.ingredients);
		})


grogApp.controller('metaController', function ($scope) {
  $scope.version='0.0.1';
})




grogApp.factory('Ingredients', ['$http', function($http){
	return $http.get('/store/ingredients');

    }])

    // Controller
    grogApp.controller('IngredientController', ['$scope', 'Ingredients', function ($scope, ingredientService, Ingredients) {
      Ingredients.success(function(data){
      	ingredientService.setIngredients = data;
        $scope.ingredients = data;
        console.log(data);
      }).error(function(data, status){
        console.log(data, status);
        $scope.ingredients = [];
      });
    }])