// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var objString = {
	nullable: 'I am'
};

var objNull = {
	nullable: null
};

var objInteger = {
	nullable: 42
};

var schemaUnionType = {
	type: 'object',
	properties: {
		nullable: { type: ['string', 'null'] }
	}
};

var objMan = {
	nullable: {
		name: 'John',
		age: 42
	}
};

var objWoman = {
	nullable: {
		name: 'Jane',
		age: 'confidential'
	}
};

var objAlien = {
	nullable: {
		name: 'Paul',
		age: true
	}
}

var schemaHuman = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			required: true
		},
		age: {
			type: ['integer', 'string'],
			required: true
		}
	}
};

var schemaUnionTypeWithSchema = {
	type: 'object',
	properties: {
		nullable: {
			type: ['string', 'null', schemaHuman],
			required: true
		}
	}
};

vows.describe('Object Type').addBatch({
	'when a string is passed for either a string or null': objectShouldBeValid(objString, schemaUnionType),
	'when null is passed for either a string or null': objectShouldBeValid(objNull, schemaUnionType),
	'when trying to pass an integer for either a string or null': objectShouldBeInvalid(objInteger, schemaUnionType, { errMsg: 'JSON object property \'nullable\' is an integer when it should be either a string or null' }),
	'when a string is passed for either a string or null or a human': objectShouldBeValid(objString, schemaUnionTypeWithSchema),
	'when null is passed for either a string or null or a human': objectShouldBeValid(objNull, schemaUnionTypeWithSchema),
	'when a man is passed for either a string or null or a human': objectShouldBeValid(objMan, schemaUnionTypeWithSchema),
	'when a woman is passed for either a string or null or a human': objectShouldBeValid(objWoman, schemaUnionTypeWithSchema),
	'when trying to pass an alien for either a string or null or a human': objectShouldBeInvalid(objAlien, schemaUnionTypeWithSchema, { errMsg: 'JSON object property \'nullable\' is an object when it should be either a string or null or a schema' })
}).export(module);
