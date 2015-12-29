/* jshint strict: true */
/* jslint vars: true */
/* jslint devel: true */
/* globals angular: false */

function productFn(product, sendqtdy) {
	'use strict';

	this.product = product.data;

	this.prodLen = sendqtdy.prodLen;

	this.addproduct = function() {
		sendqtdy.alterQtdy(product.data.product._id);
	};

	this.sumLength = function() {
		sendqtdy.sumLength(product.data.product.qtdy);
	};

	this.subLength = function() {
		sendqtdy.subLength()
	};
}

angular.module('app').controller('productController', 
	['product', 'sendqtdy', productFn]);







