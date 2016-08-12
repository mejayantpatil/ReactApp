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
