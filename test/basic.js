var test = require('tap').test
var spinner = require('../spin.js')

test('does nothing when not a tty', function(t) {
  var int = spinner({
    stream: { write: function(c) {
      throw new Error('wrote something: ' + JSON.stringify(c))
    }, isTTY: false },
  })
  t.notOk(int)
  t.end()
})

test('write spinny stuff', function(t) {
  var output = ''
  var written = 0
  var expect = "b\u001b[0Gc\u001b[0Gd\u001b[0Ge\u001b[0Gf\u001b[0Gg\u001b[0Gh\u001b[0Gi\u001b[0Gj\u001b[0Gk\u001b[0Gl\u001b[0Gm\u001b[0Gn\u001b[0Go\u001b[0Gp\u001b[0Ga\u001b[0Gb\u001b[0Gc\u001b[0Gd\u001b[0Ge\u001b[0Gf\u001b[0Gg\u001b[0Gh\u001b[0Gi\u001b[0Gj\u001b[0Gk\u001b[0Gl\u001b[0Gm\u001b[0Gn\u001b[0Go\u001b[0Gp\u001b[0Ga\u001b[0Gb\u001b[0Gc\u001b[0Gd\u001b[0Ge\u001b[0Gf\u001b[0Gg\u001b[0Gh\u001b[0Gi\u001b[0Gj\u001b[0Gk\u001b[0Gl\u001b[0Gm\u001b[0Gn\u001b[0Go\u001b[0Gp\u001b[0Ga\u001b[0Gb\u001b[0Gc\u001b[0G"

  var int = spinner({
    interval: 0,
    string: 'abcdefghijklmnop',
    stream: {
      write: function(c) {
        output += c
        if (++written == 50) {
          t.equal(output, expect)
          clearInterval(int)
          t.end()
        }
      },
      isTTY: true
    },
    cleanup: false
  })
})

test('test prefix', function(t) {
  var written = 0;
  var expect = '\u0077\u0061\u0069\u0074\u0069\u006e\u0067\u002e\u002e\u002e\u0062\u001b[0G';

  var int = spinner({
      interval: 0,
      string: 'abcdef',
      prefix: 'waiting...',
      stream: {
        write: function(c) {
            if (++written == 1) {
              t.equal(c, expect);
              clearInterval(int);
              t.end();
            }
        },
        isTTY: true
      },
      cleanup: false
    });
})

test('test suffix', function(t) {
  var written = 0;
  var expect = '\u0062\u003d\u003e\u001b[0G';

  var int = spinner({
      interval: 0,
      string: 'abcdef',
      suffix: '=>',
      stream: {
        write: function(c) {
            if (++written == 1) {
              t.equal(c, expect);
              clearInterval(int);
              t.end();
            }
        },
        isTTY: true
      },
      cleanup: false
    });
})
