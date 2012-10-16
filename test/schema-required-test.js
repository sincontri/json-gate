// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..'),
	createSchema = jsonly.createSchema,
	config = require('./config');

var schemaValid = {
	type: 'object',
	properties: {
		mandatory: {
			required: true
		}
	}
};

var schemaInvalid = {
	type: 'object',
	properties: {
		mandatory: {
			required: '123'
		}
	}
};

vows.describe('Schema Required').addBatch({
	'when required attribute is a boolean': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaValid));
			} catch(err) {
				this.callback(err);
			}
		},
		'we get no error': function (err, schema) {
			should.not.exist(err);
			should.exist(schema);
		}
	}
}).addBatch({
	'when required attribute is not a boolean': {
		topic: function () {
			try {
				this.callback(null, createSchema(schemaInvalid));
			} catch(err) {
				this.callback(err);
			}
		},
		'we get an error': function (err, schema) {
			should.exist(err);
			if (config.verbose) {
				console.log('Error:', err)
			}
		}
	}
}).export(module);
	