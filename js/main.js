require.config({
	'paths' : {
		"jquery" : "lib/jquery.min",
		"underscore" : "lib/underscore-min",
		"backbone" : "lib/backbone-min",
		"calender":"cal/js/jscal2",
		"localStorageDB":"lib/localstoragedb.min",
		"fancybox":"fancybox/jquery.fancybox.pack"
	},
	'shim' : {
		backbone : {
			'deps' : ['jquery', 'underscore'],
			'exports' : 'Backbone'
		},
		underscore : {
			'exports' : '_'
		}
	}
});
require(['Views/app', 'Views/cForm'], function(Task, ControllerForm) {
	var task = new Task();
	var controllerForm = new ControllerForm();

});
