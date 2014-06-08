/*
 * marking
 * https://github.com/akiyoshi83/jquery.marking
 *
 * Copyright (c) 2014 akiyoshi
 * Licensed under the MIT license.
 */

(function($) {

  // Collection method.
  $.fn.marking = function() {
    return this.each(function(i) {
      // Do something awesome to each selected element.
      $(this).html('awesome' + i);
    });
  };

  // Static method.
  $.marking = function(options) {
    // Override default options with passed-in options.
    options = $.extend({}, $.marking.options, options);
    // Return something awesome.
    return 'awesome' + options.punctuation;
  };

  // Static method default options.
  $.marking.options = {
    punctuation: '.'
  };

  // Custom selector.
  $.expr[':'].marking = function(elem) {
    // Is this element awesome?
    return $(elem).text().indexOf('awesome') !== -1;
  };

}(jQuery));
