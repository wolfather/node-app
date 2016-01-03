const exec = require('child_process').exec,
	fs = require('fs'),
	path = require('path')

module.exports = ()=> {
	fs.readdir(__dirname, (err, data)=> {
		if(!err) {
			exec('node -v', (error, stdout, stderr)=> {
				
				if(stdout[1] < 4) {
					console.log(`stdout: ${stdout[1]}`)
					console.log('Use uma versão do Node 4.X ou superior')
					return 0
				}
			})

			data.map((e)=> {
				//console.log(`total ${e.length}`)
				//console.log( e.indexOf('node_modules') )
				
				if(-1 !== e.indexOf('node_modules')) {
					console.log(`Has dir: ${e}`)
				}

				else{
					console.log(`Let me install all dependecies now`)
					exec('sudo npm i && bower install && gulp build && supervisor app.js', (error, stdout, stderr)=> {
			
						if(stdout[1] < 4) {
							console.log(`stdout: ${stdout[1]}`)
							console.log('Use uma versão do Node 4.X ou superior')
							return 0
						}
					})
				}
			})
		}

	})
}
