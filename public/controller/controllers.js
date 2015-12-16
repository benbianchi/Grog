var grogApp = angular.module('grogApp', []);

grogApp.controller('metaController', function ($scope) {
  $scope.version='0.0.1';
});


grogApp.controller('titlePageDrinks', function ($scope) {
  $scope.popularAvaliableDrinks = [{id:0,title:"Dirty Whiskey", description:"2 of these and youll be flying with frank sinatra",hits:0},
  {id:1,title:"Gin and Tonic", description:"a bianchi favorite", hits:1}]
});

grogApp.controller('browseAllDrinks', function ($scope) {
	$scope.allDrinks = [{id:0,title:"Dirty Whiskey", description:"2 of these and youll be flying with frank sinatra",hits:0},
  {id:1,title:"Gin and Tonic", description:"a bianchi favorite", hits:1}];
  $scope.stamp = "now";


	
})
 grogApp.controller('getCompleteDetailsDrink' ,function ($scope) {

 	var allDrinks = [{id:0,title:"Dirty Whiskey", description:"2 of these and youll be flying with frank sinatra",hits:0},
  {id:1,title:"Gin and Tonic", description:"a bianchi favorite", hits:1}];

 	$scope.select = function(index)
 	{
 		$scope.selectedDrink = allDrinks[index];
 		console.log($scope.selectedDrink);
 	}

 });