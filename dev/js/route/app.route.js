/* jshint strict: true */
/* jslint vars: true */
/* jslint devel: true */
/* globals angular: false */


var partialPath = './build/html/partials/';

angular.module('app').config(function($routeProvider) {
	'use strict';
	$routeProvider
	.when('/', {
		templateUrl: partialPath + 'home.html',
		controller: 'homeController',
		controllerAs: 'home',
		resolve: {
			product : function(product) {
				console.log(product.home());
				return product.home();
			}
		}
	})

	.when('/home', {
		templateUrl: partialPath + 'home.html',
		controller: 'homeController',
		controllerAs: 'home',
		resolve: {
			product : function(product) {
				return product.home();
			}
		}
	})

	.when('/produto/:id?', {
		templateUrl: partialPath + 'product.html',
		controller: 'productController',
		controllerAs: 'detail',
		resolve: {
			product : function(product, $route) {
				//console.log('prod', product.byId($route.current.params.id));
				return product.byId($route.current.params.id);
			}
		}
	})
	
	.when('/checkout/', {
		templateUrl: partialPath + 'checkout.html',
		controller: 'checkoutController',
		controllerAs: 'checkout'
	})
	.otherwise({redirect: '/'});

	//$locationProvider.html5Mode(false).hashPrefix('!');
});







