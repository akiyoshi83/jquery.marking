(function($) {
  /*
    ======== A Handy Little QUnit Reference ========
    http://api.qunitjs.com/

    Test methods:
      module(name, {[setup][ ,teardown]})
      test(name, callback)
      expect(numberOfAssertions)
      stop(increment)
      start(decrement)
    Test assertions:
      ok(value, [message])
      equal(actual, expected, [message])
      notEqual(actual, expected, [message])
      deepEqual(actual, expected, [message])
      notDeepEqual(actual, expected, [message])
      strictEqual(actual, expected, [message])
      notStrictEqual(actual, expected, [message])
      throws(block, [expected], [message])
  */

  module('jQuery#marking', {
    // This will run before each test in this module.
    setup: function() {
      this.elems = $('#qunit-fixture').children();
    },
    teardown: function() {
      $.marking.reset();
    }
  });

  test('is chainable', function() {
    expect(1);
    // Not a bad test to run on collection methods.
    strictEqual(this.elems.marking(), this.elems, 'should be chainable');
  });

  test('is marked by default option', function() {
    expect(2);
    this.elems.marking();
    var marks = $('.jqmark-border');
    var labels = $('.jqmark-label');
    strictEqual(marks.size(), 3, 'should be marked');
    strictEqual(labels.size(), 0, 'should not be labeled');
  });

  test('is marked by label option', function() {
    expect(3);
    this.elems.marking({label: 'LABEL'});
    var marks = $('.jqmark-border');
    var labels = $('.jqmark-label');
    strictEqual(marks.size(), 3, 'should be marked');
    strictEqual(labels.size(), 3, 'should be labeled');
    strictEqual(labels.eq(0).text(), 'LABEL', 'should be labeled');
  });

  test('is marked by prefix option', function() {
    expect(4);
    this.elems.marking({prefix: 'ext', label: 'LABEL'});
    var marks = $('.ext-border');
    var labels = $('.ext-label');
    strictEqual(marks.size(), 3, 'should be marked');
    strictEqual(labels.size(), 3, 'should be labeled');

    strictEqual($('.jqmark-border').size(), 0, 'should be nothing');
    strictEqual($('.jqmark-label').size(), 0, 'should be nothing');
  });

  module('jQuery.marking');

  test('return default options', function() {
    expect(2);
    var defaults = $.marking.defaults;
    deepEqual($.marking(), defaults, 'should return default options');
    deepEqual($.marking({}), defaults, 'should return default options (empty object)');
  });

  test('return customized options', function() {
    expect(9);
    var custom = $.marking({
      prefix: 'ext',
      label: 'some label',
      markStyle: {
        borderWidth: '3px',
        borderStyle: 'dotted',
        borderColor: '#00ffff',
      },
      labelStyle: {
        color: '#ff0000',
        backgroundColor: '#00eeee',
        fontSize: '18px',
        padding: '4px',
      }
    });
    strictEqual(custom.prefix, 'ext', 'should be changed');
    strictEqual(custom.label, 'some label', 'should be changed');

    strictEqual(custom.markStyle.borderWidth, '3px', 'should be changed');
    strictEqual(custom.markStyle.borderStyle, 'dotted', 'should be changed');
    strictEqual(custom.markStyle.borderColor, '#00ffff', 'should be changed');

    strictEqual(custom.labelStyle.color, '#ff0000', 'should be changed');
    strictEqual(custom.labelStyle.backgroundColor, '#00eeee', 'should be changed');
    strictEqual(custom.labelStyle.fontSize, '18px', 'should be changed');
    strictEqual(custom.labelStyle.padding, '4px', 'should be changed');
  });

}(jQuery));
