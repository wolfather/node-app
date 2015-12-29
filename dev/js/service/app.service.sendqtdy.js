function sendQtdyFn(product) {
	this.prodLen = 1;

	this.alterQtdy = function(productId) {
		console.log('cliquei');
		product.alterLengthProduct(productId, this.prodLen);
	};

	this.sumLength = function(length) {

		if(this.prodLen < length) {
			this.prodLen += 1;
		}

		console.log('sum self', this.prodLen);
	};

	this.subLength = function() {
		if(this.prodLen > 1) {
			this.prodLen += -1;
		}

		console.log('sub self', this.prodLen);
	};
}


angular.module('app').service('sendqtdy', ['product', sendQtdyFn])