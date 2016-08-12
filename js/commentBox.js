
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