// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidMinLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			minLength: 3
		}
	}
};

var schemaInvalidMinLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			minLength: 3.14
		}
	}
};

var schemaValidMaxLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			maxLength: 3
		}
	}
};

var schemaInvalidMaxLength = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			maxLength: 3.14
		}
	}
};

var schemaValidPattern = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			pattern: '^Hello, JSON$'
		}
	}
};

var schemaInvalidPattern = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			pattern: {hello: 'JSON'}
		}
	}
};

vows.describe('Schema String').addBatch({
	'when minLength attribute is an integer': schemaShouldBeValid(schemaValidMinLength),
	'when minLength attribute is not an integer': schemaShouldBeInvalid(schemaInvalidMinLength),
	'when maxLength attribute is an integer': schemaShouldBeValid(schemaValidMaxLength),
	'when maxLength attribute is not an integer': schemaShouldBeInvalid(schemaInvalidMaxLength),
	'when pattern attribute is a string': schemaShouldBeValid(schemaValidPattern),
	'when pattern attribute is not a string': schemaShouldBeInvalid(schemaInvalidPattern)
}).export(module);
