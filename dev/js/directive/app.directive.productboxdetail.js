function productDetailFn() {
	'use strict';

	return {
		restrict: 'A',
		scope: {
			alias 		: '=', 
			image 		: '=', 
			description : '='
		},
		template: '<div class="product-detail"><figure class="product-detail-figure"><img class="product-detail-largeimage" src="assets/images/products/{{image}}" alt="{{alias}}"item-prop="image"><figcaption class="product-detail-description">{{description}}</figcaption></figure></div>'
	};
}



angular.module('app').directive('productboxdetail', productDetailFn)