/*global require*/
'use strict';

require.config({
	shim: {
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		},
	},
	paths: {
		jquery: '../../bower_components/jquery/dist/jquery',
		backbone: '../../bower_components/backbone/backbone',
		backbone.localstorage: '../../bower_components/backbone.localStorage/src/localstorage.js',
		underscore: '../../bower_components/underscore/underscore',
		bootstrap: '../../bower_components/bootstrap-sass/assets/javascripts/bootstrap'
	}
});


require([
	'backbone'
], function (Backbone) {
	debugger;
	Backbone.history.start();
})