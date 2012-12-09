define(['jquery', 'calender', 'underscore', 'backbone', 'text!Tpl/main.html', 'text!Tpl/header.html', 'text!Tpl/leftpanel.html', 'text!Tpl/myview.html', 'Models/mTodo', 'Collections/cTodo', 'text!Tpl/detail.html'], function($, Calendar, _, Backbone, main, headerTmpl, leftpanelTpl, myviewTpl, MTodo, CTodo, detail) {
	var Task = Backbone.View.extend({
		el : "#task",
		headerEl : "#header",
		leftEl : "#left",
		rightEl : "#starred",
		detailEl : "#detail",
		template : _.template(main),
		headerTmp : _.template(headerTmpl),
		leftTmp : _.template(leftpanelTpl),
		rightTmp : _.template(myviewTpl),
		detailTmp : _.template(detail),
		events : {
			'click #todo-row' : 'todoDetails'
		},

		initialize : function() {
			this.lib = new window.localStorageDB("Task", localStorage);
			if (!this.lib.tableExists("tTodo")) {
				// create the "tTodo" table
				this.lib.createTable("tTodo", ["title", "dueDate", "project", "priority", "color", "description"]);
				this.lib.commit();
			}
			var todo = this.lib.query("tTodo");
			this.modelTodo = new MTodo();
			this.modelTodo.set(todo);
			this.todoCollection = new CTodo();
			this.render();
		},
		render : function() {
			var elem = this.el;
			$(elem).append(this.template);
			this.renderHeader();
		},
		renderHeader : function() {
			var header = this.headerEl;
			var left = this.leftEl;

			var self = this;
			// var model	=	this.modelTodo;
			$(header).append(this.headerTmp);
			$(left).append(this.leftTmp);
			//var calContainer = $("#calender");
			window.Calendar.setup({
				cont : "calender",
				showTime : 24
				// onSelect     : updateFields,
				// onTimeChange : updateFields

			});
			this.myView();
		},
		myView : function() {
			var self = this;
			var right = this.rightEl;
			this.todoCollection.url = "api/"
			this.todoCollection.fetch({
				data : {
					start : 0,
					end : 100
				},
				success : function(collection, response) {
					self.todoCollection.each(function(model) {
						$(right).append(self.rightTmp({
							model : model
						}));
					});
					self.completeMark();
				}
			});

		},
		completeMark : function() {
			$("#checked").die('change').live("change", function() {
				var self = this;
				if ($(this).attr('checked') == "checked") {
					$(this).parent('.check').siblings('.title').css('text-decoration', 'line-through');
				} else {
					$(this).parent('.check').siblings('.title').css('text-decoration', 'none');
				}

			})
		},
		todoDetails : function(events, callback, context) {
			var self = this;
			var detail = $(events.target).parent().siblings('#detail');
			// console.log(this.todoCollection.get(5));
			var todoId = $(events.target).siblings('#todoId').val();
			var todoModels = this.todoCollection.get(todoId).toJSON();

			if ($(events.target).parent().siblings('#detail').children().length == 0) {

				//todoModels.each(function(model){
				/*
				 self.detailTmp({
				 model : todoModels

				 });*/

				$(events.target).parent().siblings('#detail').append(self.detailTmp({
					model : todoModels	
				}));
				//});

				$(detail).children().show(500);
			} else {
				if (!$(detail).children().is(":visible")) {
					$(detail).children().show(500);
				} else {
					$(detail).children().hide(500);
				}
			}

		}
	});
	return Task;
});

