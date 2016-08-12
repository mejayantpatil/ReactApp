var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: '',date:''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
	this.props.onCommentSubmit({author: author, text: text});
    // TODO: send request to the server
    this.setState({author: '', text: ''});
  },  
  render: function() {
    return (
	<div className="row">
	<div className="col-md-6">
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <div className="form-group">
		<input
          type="text" className="form-control"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
		</div>
		<div className="form-group">
        <input	
          type="text" className="form-control"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
		</div>
		
        <input type="submit" value="Post"  className="btn btn-md pull-right"/>
      </form>
	  </div>
	  </div>
	  
    );
  }
});