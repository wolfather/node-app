/* jshint strict: true */
/* jslint vars: true */
/* jslint devel: true */
/* globals angular: false */


function productboxFn() {
	'use strict';

	return {
		restrict: 'A',
		replace: false,
		template: '<div class="product-box"><figure class="product-box-figure"><a href="#/produto/{{id}}"><img class="product-box-mediumimage" src="assets/images/products/{{image}}" alt="{{alias}}"item-prop="image"></a><figcaption><a class="product-box-name" href="#/produto/{{id}}">{{alias}}</a><a class="product-box-short-description" href="#/produto/{{id}}">{{desc}}</a></figcaption></figure><p class="product-box-fullprice" item-prop="price">{{price}}</p></div>',
		scope: {
			id 		:'=',
			alias 	:'=',
			desc 	:'=',
			image 	:'=',
			price 	:'='
		}
	};
}

angular.module('app').directive('productbox', productboxFn);