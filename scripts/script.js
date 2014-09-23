(function() {
  $(function() {
    $('pre').addClass('prettyprint');
    prettyPrint();
    return $.ajax('/quotes.json', {
      dataType: 'json',
      cache: false,
      success: function(quotes) {
        var byline, html, line, qi, quote;
        html = (function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = quotes.length; _i < _len; _i++) {
            quote = quotes[_i];
            byline = quote.byline != null ? "<p class='byline'>" + quote.byline + "</p>" : "";
            _results.push("<p class='quote'>" + ((function() {
              var _j, _len1, _ref, _results1;
              _ref = quote.lines;
              _results1 = [];
              for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
                line = _ref[_j];
                _results1.push(line);
              }
              return _results1;
            })()).join("<br />") + ("</p>" + byline));
          }
          return _results;
        })();
        qi = (Math.random() * 1000).toFixed(0) % quotes.length;
        $('#optimismquotes').html(html[qi]);
        return window.setInterval(function() {
          qi = (qi + 1) % html.length;
          return $('#optimismquotes').fadeOut(2000, function() {
            $('#optimismquotes').html(html[qi]);
            return $('#optimismquotes').fadeIn(2000);
          });
        }, 10000);
      }
    });
  });

}).call(this);
