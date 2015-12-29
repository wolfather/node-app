
function TheStorage() {
	if('undefined' !== typeof Storage) {

		var productItem = {},
			products = [];

		if(!localStorage.productCart) {
			localStorage.setItem('productCart', []);
		}

		function setItem(products) {
			localStorage.setItem('productCart', JSON.stringify(products));
		}

		var delItemToCart = function(id) {
			var products = [];

			products = JSON.parse(localStorage.productCart);

			products.forEach(function(product, index) {
				if(product[index].id === id) {
					products.splice(product[index], 1);
					
					setItem(products);
				}
			});
		};

		var retriveItem = function(id) {
			var products = [];

			products = JSON.parse(localStorage.productCart);

			products.map(function(product) {
				return product.id === id ? product : 0;
			});
		};

		var addItemToCart = function(p) {

			var products = [];
			var prod = p;

			if(localStorage.productCart.length) {
				products = JSON.parse(localStorage.productCart);
				console.log(products.length);


				products.map(function(product, index) {
					if(p.id === product.id) {
						console.log('element',product, index, p);
						
						product.qtdy = p.qtdy;
						console.log('splice item: ', index, products);

						return 0;
					}

				});

			}
			else {
				console.log(p, 'aqui');
				products.push(p);
			}
			setItem(products);
		};

		return {
			retrieveItem : retriveItem,
			addItemToCart: addItemToCart
		};

	}
}
