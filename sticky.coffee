define ["jquery"], ($) ->
  class Sticky
    constructor: (@elem, @offset) ->
      that = this
      @offset = +@offset
      @elem.parent().css position: "relative"
      @offsetTop = $(".top-dark-header").outerHeight() + 20
      @footer = $(".main-footer")
      @position = {}
      @state = ''
      @topPossible = on
      @getPosition()
      
      scroll = =>
        @getPosition()
        do @checkHeight

      scroll()
      $(window).scroll scroll
      $(window).resize scroll
       
    getPosition: ->
      @position.top = @elem.offset().top - $(document).scrollTop()
      @position.bottom = $(window).innerHeight() - ( @elem.offset().top - $(document).scrollTop() + @elem.outerHeight() )
      @position.offsetBottom = @elem.parent().innerHeight() - ( @elem.position().top + @elem.outerHeight() )
      @position.reachedBottom = (@elem.offset().top - @elem.parent().offset().top) + @elem.outerHeight() >= @elem.parent().innerHeight() - @offset
      @topPossible = !($(window).innerHeight() < @elem.outerHeight() + @offset + @offsetTop)


    stickTop: ->
      @state = "top"
      #console.log "stickTop"
      @elem.css {
        position: "fixed"
        top: @offsetTop
        bottom: "auto"
      }

    stick: ->
      @state = "bottom"
      #console.log "stick"
      @elem.css {
        position: "fixed"
        bottom: "#{@offset}px"
        marginBottom: 0
        top: "auto"
      }

    checkHeight: ->
      if @position.bottom <= @offset and @state != "bottom" 
        do @stick
      else if @position.reachedBottom and @state != "finish"
        do @finish
      else if @position.top <= @offsetTop and @state != "top" and @state != "finish" and @topPossible
        do @stickTop
      else if !@topPossible and @position.bottom >= @offset and @state != "bottom" and @state != "finish"
        do @stick
      if @elem.parent().offset().top - @elem.offset().top > 0 and @state != "none"
        do @unstick
      


      

    unstick: ->
      @state = "none"
      #console.log "unstick"
      @elem.removeAttr("style")

    finish: ->
      @state = "finish"
      #console.log "finish"
      @elem.css {
        position: "absolute"
        bottom: "#{@offset}px"
        marginBottom: 0
        top: "auto"
      }