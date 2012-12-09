define(['backbone','Models/mComment'],function(Backbone,ModelComment){
	var CComments	=	Backbone.Collection.extend({
		model:ModelComment,
		parse:function(response){
			return response.comment
		}	
	});
	return CComment;
});
