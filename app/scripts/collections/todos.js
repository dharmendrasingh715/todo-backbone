/*global define*/

define([
	'underscore',
	'backbone',
	'backboneLocalstorage',
	'models/todo'
], function (_, Backbone,Store,Todo) {
	'use strict';
	var Todos = Backbone.Collection.extend({
		
		model: Todo,

		localStorage: new Store('todo-backbone'),

		completed: function () {
			return this.filter(function (todo) {
				return todo.get('completed');
			});
		},

		remaining: function () {
			return this.without.apply( this, this.completed() );
		},

		nextOrder: function () {
			if( !this.length ) {
				return 1
			}
			return this.last().get('order') + 1;
		},

		comparater: function (todo) {
			return this.get('order');
		}

	});

	return Todos;
});