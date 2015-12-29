'use strict';

const path = require('path')

let img = 'image/',
	txt = 'text/',

	extAllowed = [
	{key: '.json',	type : 'application/json', 	charset: 'utf-8'},
	{key: '.js',	type : txt+'javascript', 	charset: 'utf-8'},
	//{key: '.css',	type : txt+'plain', 		charset: 'utf-8'},
	{key: '.css',	type : txt+'html', 			charset: 'utf-8'},
	{key: '.txt',	type : txt+'plain', 		charset: 'utf-8'},
	{key: '.html',	type : txt+'html', 			charset: 'utf-8'},
	{key: '.ico',	type : img+'x-icon', 		charset: 'binary'},
	{key: '.jpg',	type : img+'jpg', 			charset: 'binary'},
	//{key: '.jpeg',	type : img+'jpg', 			charset: 'binary'},
	{key: '.gif',	type : img+'gif', 			charset: 'binary'},
	{key: '.png',	type : img+'png', 			charset: 'binary'}
]


module.exports = (urlRequested)=> {

	let file = ('.' + urlRequested.toLowerCase()),
		extname = path.extname(file)

	//console.log('====>', extname)

	
	return extAllowed.map((e)=> {
		switch(extname) {
			case(e.key !== file) :
				//console.log(`${file} isn\`t allowed`);
				return 0
				break

			case(e.key === file) :
				//console.log(`is allowed ${e.type} ${urlRequested}`)
				return e
				break
			
			default: break
		}
	})
	
}




