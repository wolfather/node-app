'use strict';

const mongoose = require('mongoose'),
	serverUrl = 'mongodb://localhost/',
	dbName = 'db'


var schemaproduct = require('../schema/schemaproduct'),
	mongo = mongo || {}

//console.log(`${serverUrl}${dbName}`)


mongo.connection = ()=> {
	mongoose.connect(serverUrl + dbName, (err)=> err ? 0 : 1)
}

mongo.db = mongoose.connection


mongo.db.on('error', console.error.bind(console, 'connection error:'))
mongo.db.once('open', ()=> {
	console.log('is opened')
})

mongo.productModel = mongoose.model('product', schemaproduct)

mongo.findall = (callback)=> {
	mongo.productModel
	.find({$where: 'this.qtdy !== 0'})
	.exec((err, data)=> {
		console.log('fetching data')
		if(err) {
			console.log(err, 'erro')
			return 0
		}

		if('function' === typeof callback) {
			callback(data)
		}

	})
}

mongo.createMockup = ()=> {
	
	let simpleMock = (num)=> {
		return {
			alias: 'produto '+ num,
			pictureProduct : "image"+num+".jpg",
			img: {
				thumb 			: 'thumb-' + num + '.jpg',
				medium 			: 'medium-' + num +'.jpg',
				large 			: 'large-' + num + '.jpg'
			},
			description: {
				shortDesc : 'Descrição curta do produto '+num+' de mock',
				longDesc : 'Esta é uma longa descrição do produto '+num+' de mock para exibição na página de detalhes do produto',
			},
			qtdy: Math.round(Math.random() * (100 - 10)) + 10,
			price: (Math.round(Math.random() * (100 - 10)) + 10) +',99'
		}
	}

	
	mongo.productModel.find((err, data)=> {
		if(err) {
			console.error(err)
			return 0
		}

		else{
			
			if(!data.length) {

				console.warn('No data was found. Filling the database with some mocks')

				let i = 1
				for(i; i < 6; i++) {
					mongo.insertProd(simpleMock(i))
				}

			}
		}
	})

}

mongo.updateProd = (id, qtdy)=> {
	
	mongo.productModel.update(
		{ _id : id},
		{
			$set: { 
				qtdy: qtdy
			}
		},
		{
			upsert: true
		},
		(err, success)=> {
			if(err){
				console.warn(err)
				throw err
				return 0
			}
			console.log(success)
		}
	)

}

mongo.byId = (id, callback)=> {

	mongo.productModel.findById(id)
	//.where('qtdy').gt(0)
	.exec((err, data)=> {

		if(err) {
			console.log('err=>', err)
			throw err
			return 0
		}
		
		if('function' === typeof callback) {
			//console.log('RECUPERANDO DADOS DE ID UNICA result: ', data)
			let product = {
				img 		: data.img.large,
				description : data.description.longDesc,
				price 		: data.price,
				qtdy 		: data.qtdy,
				alias 		: data.alias,
				_id 		: data._id
			}

			callback(product)
		}
		
	})

}

mongo.insertProd = (arg)=> {

	let p = new mongo.productModel({
		alias 		: arg.alias,
		description : arg.description,
		qtdy 		: arg.qtdy,
		price 		: arg.price,
		img 		: arg.img
	})

	p.save((err)=> {
		/*if(err) {
			console.log(err)
			return 0
		}

		else{
			console.log('SUCCESS')
			return 1
		}*/

		return err ? 0 : 1
	})

}

mongo.deleteProd = (id, callback)=> {
	
	mongo.productModel.remove({_id: id}, (err, data)=> {
		return err ? 0 : 1
		/*if('function' === typeof callback) {
			console.log('DELETANDO DADOS DE ID UNICA result: ', data)
			callback(data);
		}*/
	})

}


module.exports = mongo;