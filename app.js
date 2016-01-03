'use strict'
const http = require('http'),
	fs = require('fs'),
	path = require('path'),
	url = require('url'),
	mongo = require('./mongo/db/mongo-query'),
	querystring = require('querystring'),
	config = require('./mods/config'),
	ext = require('./mods/ext-allowed')

mongo.connection()
mongo.createMockup()

http.createServer((request, response)=> {

	let file = '.' + request.url,
		extension = ext(request.url)

	if('POST' === request.method) {

		if( (/alterqtdy.json/gi).test(file) ) {
			
			let urlParams = url.parse(request.url, true).query,
				subQtdy = (prodQtdy, userQtdy)=> prodQtdy - userQtdy

			mongo.byId(urlParams.id, (product)=> {
				console.log('byid', product.qtdy)

				mongo.updateProd(urlParams.id, subQtdy(product.qtdy, urlParams.qtdy), (data)=> {
					response.writeHead(200,
						'Content-Type', extension.type,
						'Cache-Control', 'no-cache'
					)
					response.end(JSON.stringify({product: data}))
				})
			})
			
		}

	}

	else if('GET' === request.method) {
		if((/home.json/gi).test(file) ) {

			mongo.findall((data)=> {
				response.writeHead(200,
					'Content-Type', extension.type,
					'Cache-Control', 'no-cache')

				response.end(JSON.stringify({product: data}))
			})

		}
		else if((/produto.json/gi).test(file)) {
			
			let queryId = url.parse(request.url, true).query.id

			mongo.byId(queryId, (data)=> {
				response.writeHead(200,
					'Content-Type', extension.type,
					'Cache-Control', 'no-cache')
				
				response.end(JSON.stringify({product: data}))
			})

		}
		
		else {

			if(file === './') {
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


}).listen(config.port, ()=> {
	console.log(`Server is running at ${config.server} and listen ${config.port} port`)
})
