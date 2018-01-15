/*global require*/
'use strict';

require.config({
	shim: {
		bootstrap: {
			deps: ['jquery'],
			exports: 'jquery'
		},
		backboneLocalstorage: {
			deps: ['backbone'],
			exports: 'Store'
		}
	},
	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		underscore: '../bower_components/underscore/underscore',
		backbone: '../bower_components/backbone/backbone',
		backboneLocalstorage: '../bower_components/backbone.localStorage/backbone.localStorage',
		bootstrap: '../bower_components/bootstrap-sass/assets/javascripts/bootstrap',
		text: '../bower_components/text/text'
	}
});


require([
	'backbone',
	'views/app',
	'routes/router'
], function (Backbone,AppView,WorkSpace) {
	new WorkSpace();
	Backbone.history.start();
	new AppView();
})