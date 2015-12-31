@BlogList = React.createClass

  getInitialState: ->
    #setting initiall values
      blogs: []
      page: 0
      loadingFlag: false

  getBlog: ->
    #method to fetch comments will concat result to state.blog
    nextPage = @state.page + 1
    #increase the page count
    $.get '/blogs' + '?page=' + @state.page, ((result) ->
      if @isMounted()
        @setState
          blogs: @state.blogs.concat(result.blogs)
          loadingFlag: false
          page: nextPage
      return
    ).bind(this)
    return

  componentDidMount: ->
    #attach the scroll event listener to our scroll handler function
    window.addEventListener 'scroll', @handleScroll
    #to load comments initially
    @getBlog()
    return

  componentWillUnmount: ->
    window.removeEventListener 'scroll', @handleScroll

  handleScroll: (e) ->
    #this function will be triggered if user scrolls
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100)
      #user reached at bottom
      if !@state.loadingFlag
        #to avoid multiple request 
        @setState loadingFlag: true
        @getBlog()
    return

  render: ->
    React.DOM.div
      className: 'Blogs'
      React.DOM.table
        className: 'table table-bordered'
        React.DOM.thead null,
          React.DOM.tr null,
            React.DOM.th null, 'Author'
            React.DOM.th null, 'Content'
        React.DOM.tbody null,
          for blog in @state.blogs
            React.DOM.tr {key: blog.id},
              React.DOM.td null, blog.author
              React.DOM.td null, blog.content
            #React.createElement Blog, key: blog.id, blog: blog
