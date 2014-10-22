Template.createPost.events({
	'submit form': function(e){
		e.preventDefault();

		var postTitle = $('.post-title').val();
		var postContent = $('.post-content').val();
		var postOwner = Meteor.userId();

		if (postTitle && postContent){
			Posts.insert({postTitle: postTitle, postContent: postContent, postOwner: postOwner})
		}
	}
})

Template.postsList.helpers({
	'posts': function(){
		return Posts.find();
	}
})

Template.postListSingle.helpers({
	'ownsPost':function(){
		if (Meteor.userId() == this.postOwner)
			return true;
	}
})

Template.postView.helpers({
	'comments': function(){
		return Comments.find({postId: this._id});
	},
	'ownsPost': function(){
		if (Meteor.userId() == this.postOwner)
			return true
	}
})

Template.postView.events({
	'click .edit-post-btn': function(e){
		$(e.target).toggleClass('save-btn');

		if ($(e.target).hasClass('save-btn')){
			$('.post-title').attr('contentEditable', 'true');
			$('.post-content').attr('contentEditable', 'true');

			$(e.target).html('Save Edits');
		} else {
			$('.post-title').attr('contentEditable', 'false');
			$('.post-content').attr('contentEditable', 'false');
			$(e.target).html('Edit Post');
		}
	},
	'click .save-btn': function(e){
		var postTitle = $('.post-title').text();
		var postContent = $('.post-content').text();

		Posts.update({_id: this._id}, {$set: {postTitle: postTitle, postContent: postContent}});

	}
})

Template.postListSingle.events({
	'click .delete-post-btn': function(){
		Posts.remove({_id: this._id});
	}
})

Template.createComment.events({
	'submit form': function(e){
		e.preventDefault();

		var comment = $('.post-comment').val();
		var postId = this._id;
		var commentOwner = Meteor.userId();


		if (comment){
			Comments.insert({comment: comment, postId: postId, commentOwner: commentOwner});
		}
	}
})

Template.commentSingle.helpers({
	'deleteable': function(){
		console.log('hi');
		var postOwner = Posts.findOne({_id: this.postId}).postOwner;
		console.log(postOwner);

		if (Meteor.userId() == this.commentOwner || Meteor.userId() == postOwner){
			return true
		}
	},
	'ownsComment': function(){
		if (Meteor.userId() == this.commentOwner)
			return true
	}
})

Template.commentSingle.events({
	'click .delete-comment-btn': function(){
		Comments.remove({_id: this._id});
	},
	'click .edit-comment-btn': function(e){
		$(e.target).toggleClass('save-btn');

		if ($(e.target).hasClass('save-btn')){
			$('#comment-' + this._id).attr('contentEditable', 'true');
			$(e.target).html('Save Comment');
		} else {
			$('#comment-' + this._id).attr('contentEditable', 'false');
			$(e.target).html('Edit Comment');
		}
	},
	'click .save-btn': function(e){
		var comment = $('#comment-' + this._id).text();

		Comments.update({_id: this._id}, {$set: {comment: comment}});
	}
})

