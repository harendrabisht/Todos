define(['backbone','Models/mTodo'],function(Backbone,MTodo){
	var CTodo	=	Backbone.Collection.extend({
		model:MTodo,
		parse:function(response){
			return response.todo;
		}
	});
	return CTodo;
});

