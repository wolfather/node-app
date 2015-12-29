/* jshint strict: true */
/* jslint vars: true */
/* jslint devel: true */
/* globals angular: false */


angular.module('app').factory('product', 
	['$http', 'URL_PATH', function($http, URL_PATH) {
	
	'use strict';

	$http.defaults.headers.put = {
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, JSONP',
		'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
	};
	$http.defaults.useXDomain = true;
	delete $http.defaults.headers.common['X-Requested-With'];

	return {
		home : function() {
			return $http({
				method: 'GET',
				url: URL_PATH.url + 'home.json',
				//headers: {'Content-Type': 'application/json'},
				cache: false

			}).then(function(response) {
				return response;
			
			}).catch(function(e) {
				console.log('erro', e);
			});

		},

		byId : function(productId) {

			return $http({
				method: 'GET',
				url: URL_PATH.url + 'produto.json?id=' + productId,
				headers: {'Content-Type': 'application/json'},
				//data: JSON.stringify({id:productId}),
				cache: false

			}).then(function(response) {
				return response;
			
			}).catch(function(e) {
				console.log('erro', e);
			});

		},

		alterLengthProduct: function(productId, productQtdy) {
			return $http({
				method: 'POST',
				url: URL_PATH.url + 'alterqtdy.json?id=' + productId + '&qtdy='+productQtdy,
				headers: {'Content-Type': 'application/json'},
				//data: JSON.stringify({'id':productId, 'qtdy': productQtdy}),
				cache: false
			});
		}
	};
}]);





