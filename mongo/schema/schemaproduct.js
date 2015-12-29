'use strict';
module.exports = {
	alias 			: {
		type 			: String,
		max 			: 50,
		required 		: true
	},

	img 			: {
		thumb 			: String,
		medium 			: String,
		large 			: String
	},
	description 	: {
			
		shortDesc 		: {
			type 			: String,
			max 			: 25,
			required 		: true,
			trim 			: true
		},
		longDesc 		: {
			type 			: String,
			max 			: 250,
			required 		: true,
			trim 			: true
		}
	},
	qtdy			: {
		type: Number
	},
	price 			: String,
	dateCreated 	: {
		type 			: Date,
		default 		: Date.now
	}

};