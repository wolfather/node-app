'use strict';
const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	server = 'http://127.0.0.1',
	port = process.env.PORT || 3100,
	mongo = require('./mongo/db/mongo-query'),
	ext = require('./mods/ext-allowed'),
	querystring = require('querystring');

mongo.connection()
mongo.createMockup()


http.createServer((request, response)=> {

	let file = '.' + request.url,
		extension = ext(request.url)

	if(request.method === 'POST') {

		if( (/alterqtdy.json/gi).test('.'+request.url) ) {
			
			let urlParams = url.parse(request.url, true).query,
				subQtdy = (prodQtdy, userQtdy)=> prodQtdy - userQtdy

			mongo.byId(urlParams.id, (product)=> {
				console.log('byid', product.qtdy)

				mongo.updateProd(urlParams.id, subQtdy(product.qtdy, urlParams.qtdy), (data)=> {
					response.writeHead(200, {'Content-Type': extension.type})
					response.end(JSON.stringify({product: data}))
				})
			})
			
		}


	}

	else if(request.method === 'GET') {
		if((/home.json/gi).test('.'+request.url) ) {

			mongo.findall((data)=> {
				response.writeHead(200, {'Content-Type': extension.type})
				response.end(JSON.stringify({product: data}))
			})

		}
		else if( (/produto.json/gi).test('.'+request.url) ) {
			
			let queryId = url.parse(request.url, true).query.id

			mongo.byId(queryId, (data)=> {
				response.writeHead(200, {'Content-Type': extension.type})
				response.end(JSON.stringify({product: data}))
			})

		}
		
		else{

			if (file === './') {
				file = './build/html/index.html'
			}


			fs.readFile(file, extension.charset, (err, data)=> {
				if (err) {
					response.writeHead(500)
					response.end('<h1>This page doesn\'t exist.</h1>')
				}
				else {
					response.writeHead(200,
						'Content-Type', extension.type,
						'Content-Length', data.length,
						'Accept-Ranges', 'bytes',
						'Cache-Control', 'no-cache')

					response.end(data)
				}
			})

		}
	}


}).listen(port, ()=> {
	console.log(`Server listen ${port}`)
})
