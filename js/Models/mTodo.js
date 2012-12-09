define(['backbone'],function(Backbone){
	var MTodo = Backbone.Model.extend({
		urlRoot:"api/",
		defaults:{
			title:"",
			project:"",
			duedate:"",
			description:"",
			priority:"",
			color:"",
			status:"",
			createddate:"",
			starred:""
		}
	});
	return MTodo;
});
