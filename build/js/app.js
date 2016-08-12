var Comment = React.createClass({
  render: function() {
    return (
	  <div className="row">
	  <div className="col-md-6">	  
      <div className="comment panel panel-default">
        <div className="commentAuthor panel-heading">
          {this.props.author}
		  <span className="pull-right">created on {this.props.date}</span>
        </div>
		<div className="panel-body">
			<p >{this.props.children}</p>
		</div>
      </div>
	  </div>
	  </div>
    );
  }
});

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


var CommentBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
 
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
	  comment.id=this.state.data.length+1;
	  var date = new Date();
	  comment.date = new Date().toJSON();//date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
	  this.state.data.push(comment);
	  this.state.data.sort(function(b,a){
		return new Date(a.date).getTime() - new Date(b.date).getTime();
	  });
	  console.log(this.state.data);
	  this.setState({data: this.state.data});
	  
    // TODO: submit to the server and refresh the list
	/*
	$.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
	*/
  },
  render: function() {
    return (
	  <div className="commentBox">
        <h3>Comments</h3>
		<hr></hr>
		<CommentForm onCommentSubmit={this.handleCommentSubmit} />
		<hr></hr>
		<CommentList data={this.state.data} />        
      </div>
    );
  }
});


ReactDOM.render(
<CommentBox url="/api/comments.json" />, document.getElementById('content')
)