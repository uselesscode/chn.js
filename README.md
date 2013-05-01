Introduction
============
chn.js is a JavaScript library that allows you to [method chain](https://en.wikipedia.org/wiki/Method_chaining) on any object.
In addition to allowing you to chain any methods on an object, chn.js allows you to
use property names as setters for any property. At this time it is mostly a proof-of-concept since
it uses [Proxy objects](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Proxy),
which are currently only well-supported in FireFox.

Building chn.js
===============
You can [download a pre-built copy](http://www.uselesscode.org/javascript/chnjs/) of chn.js or build your own:

### Installing prerequisites
* Install [node.js](http://nodejs.org/), this will also install [npm](https://npmjs.org/)
* [Install grunt](http://gruntjs.com/getting-started)

### Installing/building chn.js
* Clone the Git repository `git clone https://github.com/uselesscode/chn.js.git`
* In the cloned directory, run `npm install`, this will read `package.json` and install all of the dependencies needed to build chn.js.
* Run `grunt` to build chn.js

Usage
=====
chn.js provides a `chn` object which will allow you to chain methods whether or not they were designed to allow it:

    var obj = {
      foo: function () {
        console.log('foo');
        return this;
      },
      bar: function () {
        console.log('bar');
      },
      baz: function () {
        console.log('baz');
      }
    };

    obj.foo().bar(); // works, prints foo and bar to the console

    obj.foo().bar().baz; // fails; bar returns undefined,
                         // undefined does not have a .baz method
    
    // If you wrap the object with chn,
    // all methods become chainable
    chn(obj).foo().bar().baz().foo();
    // foo
    // bar
    // baz
    // foo

If a property is not a method, using it as a method of `chn` will set that property to the provided argument:

    var point = {
        x: 0,
        y: 0
      };

    chn(point).x(5).y(7);
    console.log(point.x); // 5
    console.log(point.y); // 7
    console.log(point.z); // undefined

If a property doesn't exist, invoking it as a method of `chn` will create that property:

    var point = {
        x: 0,
        y: 0
      }
    
    chn(point).x(5).z(10);
    console.log(point.x); // 5
    console.log(point.y); // 0
    console.log(point.z); // 10

`chn` is quite handy inside of a constructor:

    var Point = function (x, y, z) {
      chn(this).x(x).y(y).z(z);

      Object.defineProperty(this, 'printPositon', {
        enumerable: false,
        get: function () {
          return  function () {
          	console.log('x: ' + this.x + ', y: ' + this.y + ', z: ' + this.z);
          }
        }
      });

      return this;
    };
    
    var point = new Point(5, 5, 10);
    point.printPositon(); // x: 5, y: 5, z: 10

Limitations
===========
You can't chain any method you expect to get a result back from, nor can you retrieve the value of properties,
since the proxy object that runs `chn` always returns a function.

    console.log(chn({x: 5}).x); // returns a function, not the value of x
