var grogApp = angular.module('grogApp', ['ngRoute']);


grogApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/view/:index', {
            templateUrl: '/partials/IngredientDetail.html',
            controller: 'editIngredient'
        }).
        when('/new/', {
            templateUrl: '/partials/NewIngredient.html',
            controller: 'newIngredientController'
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

grogApp.controller('newIngredientController', ['$http', '$scope', function($http, $scope){

    $scope.addIngredient = function(){

        var ingr = {name:$scope.name, pricePerMl:$scope.pricePerMl ,archType:$scope.archType };

        $http({
            method: 'POST',
            url: '/store/ingredients/',
            data: ingr
        }).then(function successCallback(response) {
    // this callback will be called asynchronously
    console.log(response.data);
    $scope.id = response.data._id
}, function errorCallback(response) {
    console.log(response);
    // or server returns response with an error status.
});

    }


}])

grogApp.controller("editIngredient",['$route','$http','$scope', 'Ingredients', '$routeParams', function ($route,$http,$scope, Ingredients,$routeParams) {
    		// var index = $routeParams.index
            $scope.deleteIngredient = function()
            {

                $http({
                    method: 'DELETE',
                    url: '/store/ingredients/'+$scope.ingredient._id,
                }).then(function successCallback(response) {
    // this callback will be called asynchronously
    alert("Successful Delete")
    location.load();
    
    
}, function errorCallback(response) {
    alert("Error on Delete")
    // or server returns response with an error status.
});
            }
            $scope.editIngredient = function(){

                var ingr = {_id:$scope.ingredient._id,name:$scope.ingredient.name, pricePerMl:$scope.ingredient.pricePerMl ,archType:$scope.ingredient.archType };
                console.log(ingr);
                $http({
                    method: 'POST',
                    url: '/store/ingredients/'+$scope.ingredient._id,
                    data: ingr
                }).then(function successCallback(response) {
    // this callback will be called asynchronously
    alert("Succesful Edit")
    
    
}, function errorCallback(response) {
    console.log(response);
    alert("Error, Please check your form.")
    location.reload();
    // or server returns response with an error status.
});

            }


            $scope.ingredient = Ingredients.success(function(data) {
               console.log(data);
               $scope.ingredient = data[$routeParams.index];
               console.log($scope.ingredient);
           })
        }])


grogApp.controller('metaController', function ($scope) {
  $scope.version='0.0.1';
})




grogApp.factory('Ingredients', ['$http', function($http){
	return $http.get('/store/ingredients');

}])

    // Controller
    grogApp.controller('IngredientController', ['$scope', 'Ingredients', function ($scope, Ingredients) {
      
      Ingredients.success(function(data){
      	// ingredientService.setIngredients = data;
        $scope.ingredients = data;
        console.log(data);
    }).error(function(data, status){
        console.log(data, status);
        $scope.ingredients = [];
    });
}])