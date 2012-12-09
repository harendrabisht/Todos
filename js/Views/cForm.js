define(['jquery', 'localStorageDB', 'fancybox', 'underscore', 'backbone', 'Models/mTodo', 'text!Tpl/myview.html'], function($, localStorageDB, fancybox, _, Backbone, MTodo, myviewTpl) {
	var ControllerForm = Backbone.View.extend({
		initialize : function() {
			$("#add-todo").fancybox({
				"modal" : true
			});
			this.render();
		},
		el : "#todo",
		subBtnEl : "#submit",
		titleEl : "#title",
		duedateEl : "#duedate",
		projectEl : "#project",
		priorityEl : "#priority",
		colorEl : "#color",
		descriptionEl : "#description",
		
		rightEl : "#starred",
		rightTmp : _.template(myviewTpl),
		render : function() {
			// Initialise. If the database doesn't exist, it is created
			//var localStorage = window.localStorage;
			this.lib = new window.localStorageDB("Task", localStorage);
			if (!this.lib.tableExists("tTodo")) {
				// create the "tTodo" table
				this.lib.createTable("tTodo", ["title", "dueDate", "project", "priority", "color", "description", "createddate", "starred", "status"]);
				this.lib.commit();
			}
			this.localDBInsert();
		},
		localDBInsert : function() {
			var self = this;
			var dueDateCal = new Calendar({
				inputField : "duedate",
				dateFormat : "%m %d, %Y %I:%M %p",
				trigger : "duedate",
				bottomBar : false,
				showTime : 24,
				disabled : function(date) {
					var today = new Date();
					return date < today;
				},
				onSelect : function() {
					/*
					 var today = new Date();
					 //var date = Calendar.intToDate(this.selection.get());
					 this.args.max = 	today;
					 this.redraw();
					 */

					this.hide();
				}
			});
			$(this.subBtnEl).click(function() {
				var priority = $(self.priorityEl).attr('name');
				var priorityVal = $('input:radio[name=' + priority + ']:checked').val();
				var color = $(self.colorEl).attr('name');
				var colorVal = $('input:radio[name=' + color + ']:checked').val();

				var currentDate = new Date();
				var todoValue = {
					title : $(self.titleEl).val(),
					project : $(self.projectEl).val(),
					duedate : dueDateCal.args.date,
					description : $(self.descriptionEl).val(),
					priority : parseInt(priorityVal),
					color : parseInt(colorVal),
					status : 0,
					createddate : currentDate,
					starred : 1
				};
				//self.lib.insert("tTodo", todoValue);
				self.lib.commit();

				self.serverDBSubmit(todoValue);
			});
		},
		serverDBSubmit : function(todoValue) {
			this.todoModel = new MTodo();			this.todoModel.toJSON();
			var elem = this.rightEl;
			var tpl=this.rightTmp;
			this.todoModel.save(todoValue, {
				wait : true,
				success : function(model, response) {
					model.set({
						id : response
					});
					$(elem).prepend(tpl({
						model : model
					}));
					$.fancybox.close();
				},
				error : function(model, error) {
					console.log(model.toJSON());
					console.log('error.responseText');
				}
			});

		}
		
	});
	return ControllerForm;
});

