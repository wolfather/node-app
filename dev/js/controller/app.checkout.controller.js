/* jshint strict: true */
/* jslint vars: true */
/* jslint devel: true */
/* globals angular: false */



function checkoutFn() {
	'use strict';
	this.name = 'Checkout';
}

angular.module('app').controller('checkoutController', 
	[checkoutFn]);
