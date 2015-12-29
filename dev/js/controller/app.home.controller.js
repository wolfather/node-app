/* jshint strict: true */
/* jslint vars: true */
/* jslint devel: true */
/* globals angular: false */



function homeFn(product) {
	'use strict';
	this.name = 'HOME';
	this.products = product.data.product;
}

angular.module('app').controller('homeController', 
	['product', homeFn]);
