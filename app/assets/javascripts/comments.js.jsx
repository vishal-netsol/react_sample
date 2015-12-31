var Comment = React.createClass({
  render: function () {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
          {this.props.comment}
          <a href={'posts/' + this.props.id + '/edit'}>Edit</a>
      </div>
      );
  }
});

var CommentList = React.createClass({
  render: function () {
    if(!(this.props.comments instanceof Array)){
      var commentNodes = this.props.comments.comments.map(function (comment, index) {
        return (
          <Comment author={comment.author} comment={comment.comment} id={comment.id} key={index} />
          );
      });
    }

    return (
      <div className="commentList">
        {commentNodes}
      </div>
      );
  }
});

var CommentBox = React.createClass({
  getInitialState: function () {
    return {comments: []};
  },
  componentDidMount: function () {
    this.loadCommentsFromServer();
  },
  loadCommentsFromServer: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function (comments) {
        this.setState({comments: comments});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.comments;
    var newComments = comments.length > 0 ? comments.concat([comment]) : comment;
    this.setState({comments: newComments});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: {"comment": comment},
      success: function(data) {
        this.loadCommentsFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function () {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList comments={this.state.comments} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
      </div>
      );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function() {
    var author = ReactDOM.findDOMNode(this.refs.author).value.trim();
    var comment = ReactDOM.findDOMNode(this.refs.comment).value.trim();
    this.props.onCommentSubmit({author: author, comment: comment});
    ReactDOM.findDOMNode(this.refs.author).value = '';
    ReactDOM.findDOMNode(this.refs.comment).value = '';
    return false;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Your name" ref="author" />
        <input type="text" placeholder="Say something..." ref="comment" />
        <input type="submit" value="Post" />
      </form>
      );
  }
});

var ready = function () {
  ReactDOM.render(
    <CommentBox url="/comments.json" />,
    document.getElementById('comments')
  );
};

$(document).ready(ready);