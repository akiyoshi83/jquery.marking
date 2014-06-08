/*
 * marking
 * https://github.com/akiyoshi83/jquery.marking
 *
 * Copyright (c) 2014 akiyoshi
 * Licensed under the MIT license.
 */

(function($) {

  //------------------------------
  // private method
  //------------------------------

  function setBorderPos($border, $target) {
    var offset = $target.offset();
    $border.css({
      'position': "absolute",
      'top': offset.top,
      'left': offset.left,
      'width': $target.width(),
      'height': $target.height(),
    });
  }

  function setLabelPos($label) {
    var $border = $label.parent();
    var right = 0;
    if($border.width() * 0.7 < $label.width()) {
      right = (- $label.width());
    }
    $label.css({
      'position': 'absolute',
      'bottom': 0,
      'right': 0,
    });
    // FIXME
    setTimeout(function() {
      var $border = $label.parent();
      if($border.width() * 0.7 < $label.width()) {
        var w = - $label.get(0).clientWidth;
        $label.css({
          right: w,
        });
      }
      $label.show();
    }, 50);
  }

  //------------------------------
  // Collection method.
  //------------------------------

  $.fn.marking = function(options) {
    var opt = null;
    if(options) {
      opt = $.extend(true, {}, $.marking.defaults, options);
    } else {
      opt = $.extend(true, {}, $.marking.options);
    }

    var prefix      = opt.prefix;
    var borderClass = prefix + '-border';
    var labelClass  = prefix + '-label';

    return this.each(function() {
      var $self = $(this);

      // create border
      var $border = $('<div/>');
      $border.addClass(borderClass);

      // set border
      $('body').append($border);
      setBorderPos($border, $self);
      $border.css(opt.markStyle);

      if (!opt.label) {
        return this;
      }

      // create label
      var $label = $('<div/>');
      $label.addClass(labelClass);
      $label.text(opt.label);

      // set label
      $border.append($label);
      setLabelPos($label);
      $label.css(opt.labelStyle);
    });
  };

  //------------------------------
  // Static method.
  //------------------------------

  $.marking = function(options) {
    // Override default options with passed-in options.
    $.extend(true, $.marking.options, $.marking.defaults, options);
    return $.marking.options;
  };

  $.marking.reset = function(options) {
    var opt = null;
    if(options) {
      opt = $.extend(true, {}, $.marking.defaults, options);
    } else {
      opt = $.extend(true, {}, $.marking.options);
    }
    var marks = $('.' + opt.prefix + '-border');
    marks.remove();
  };

  //------------------------------
  // Options
  //------------------------------

  // Static method default options.
  $.marking.defaults = {
    prefix: 'jqmark',
    label: '',
    markStyle: {
      borderWidth: '2px',
      borderStyle: 'solid',
      borderColor: 'red',
    },
    labelStyle: {
      color: 'white',
      backgroundColor: 'red',
      fontSize: '12px',
      padding: '2px',
    }
  };

  // Deep copy from default options
  $.marking.options = $.extend(true, {}, $.marking.defaults);

}(jQuery));
