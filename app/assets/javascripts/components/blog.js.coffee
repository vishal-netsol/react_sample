@Blog = React.createClass
  render: ->
    React.DOM.tr null,
      React.DOM.td null, @props.blog.author
      React.DOM.td null, @props.blog.content