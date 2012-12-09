define(['backbone'],function(Backbone){
	var ModelComment	=	Backbone.Model.extend({
		urlRoot:"api/",
		defaults:{
			"commentdate":"",
			"comment":"",
			"todoid":""
		}
	});
	return ModelComment;
});
