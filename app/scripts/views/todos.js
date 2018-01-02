/*global define*/

define([
	'jquery',
	'underscore',
	'backbone',
	'text!templates/todos.html',
	'common'
], function ($,_,Backbone, todosTemplate, Common) {
	'use strict';

	var TodoView = Backbone.View.extend({

		tagName: 'li',

		template: _.template(todosTemplate),

		events: {
			'dblClick label': 'edit',
			'keypress .edit': 'updateOnEnter',
			'blur .edit': 'close'
		},

		initialize: function () {
			this.listenTo(this.model, 'change', this.render);	
		},

		render: function () {
			this.$el.html( this.template( this.model.attributes ));
			this.$input = this.$('.edit');
			return this;
		},

		edit: function () {
			this.$el.addClass('editing');
			this.$input.focus();
		},

		close: function () {
			var value = this.$input.val().trim();

			if( value ) {
				this.model.save( {
					title: value
				})
			}

			this.$el.removeClass('editing');
		},

		updateOnEnter: function (event) {
			if( event.which === Common.ENTER_KEY ) {
				this.close();
			}
		}
	});

	return TodoView;
});