var CommentList = React.createClass({
  render: function() {
	 this.props.data.sort(function(b,a){
		return new Date(a.date).getTime() - new Date(b.date).getTime();
	  }); 
    var commentNodes = this.props.data.map(function(comment) {
			
      return (	
        <Comment date={comment.date} author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});
