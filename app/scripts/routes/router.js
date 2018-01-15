/*global define*/

define([
	'jquery',
	'backbone',
	'collections/todos',
	'common'
], function ($,Backbone,Todos,Common) {
	'use strict';

	var WorkSpace = Backbone.Router.extend({

		routes: {
			'*filter': 'setFilter'
		},

		setFilter: function (param) {
			if(param) {
				param.trim();
			}

			Common.TodoFilter = param || '';

			Todos.trigger('filter');
		}

	});
	return WorkSpace;
});