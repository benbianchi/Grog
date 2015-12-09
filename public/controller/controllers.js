var grogApp = angular.module('grogApp', []);

grogApp.controller('metaController', function ($scope) {
  $scope.version='0.0.1';
});


grogApp.controller('titlePageDrinks', function ($scope) {
  $scope.popularAvaliableDrinks = [{title:"Dirty Whiskey", description:"2 of these and youll be flying with frank sinatra",hits:0},
  {title:"Gin and Tonic", description:"a bianchi favorite", hits:1}]
});

grogApp.controller('browseAllDrinks', function ($scope) {
	$scope.allDrinks = [{title:"Dirty Whiskey", description:"2 of these and youll be flying with frank sinatra",hits:0},
  {title:"Gin and Tonic", description:"a bianchi favorite", hits:1}];
  $scope.stamp = "now";


	
})
 grogApp.controller('getCompleteDetailsDrink' ,function ($scope ,index) {
 	$scope.allDrinks = [{title:"Dirty Whiskey", description:"2 of these and youll be flying with frank sinatra",hits:0},
  {title:"Gin and Tonic", description:"a bianchi favorite", hits:1}];

 	$scope.detailed =$scope.allDrinks[index];
 });