Router.map(function(){
	this.route('layout', {
		path: '/',
		data: function(){
			return Posts.find();
		}
	});

	this.route('postView', {
		path: 'posts/:_id',
		data: function(){
			return Posts.findOne(this.params._id);
		}
	})
})