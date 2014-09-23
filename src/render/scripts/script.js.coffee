$ ->
  $('pre').addClass('prettyprint')
  prettyPrint()

  $.ajax '/quotes.json',
    dataType:'json'
    cache:false
    success: (quotes) ->

      html=(for quote in quotes
        byline=if quote.byline?
          "<p class='byline'>#{quote.byline}</p>"
        else
          ""
        "<p class='quote'>" + (line for line in quote.lines).join("<br />") +
        "</p>#{byline}"
      )

      qi=(Math.random() * 1000).toFixed(0) % quotes.length
      $('#optimismquotes').html(html[qi])

      window.setInterval( () ->
        qi=(qi+1) % html.length
        $('#optimismquotes').fadeOut(2000, () ->
          $('#optimismquotes').html(html[qi])
          $('#optimismquotes').fadeIn(2000)
        )
      ,10000)
