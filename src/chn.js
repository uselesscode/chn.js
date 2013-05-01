/* global Proxy */
window.chn = (function () {
  "use strict";
  var handler = {
      get: function (obj, propName, receiver) {

        var setProp = function (value) {
            obj[propName] = value;
            return receiver;
          };

        if (propName in obj) {
          if (typeof obj[propName] === 'function') {
            // if it is a method, run the method
            // and return the proxy to maintain chaining
            return function () {
              obj[propName].apply(obj, arguments);
              return receiver;
            };
          } else {
            // property, set it
            return setProp;
          }
        } else {
          // non-existent property, set it
          return setProp;
        }
      }
    };

  return function (obj) {
    return new Proxy(obj, handler);
  };
}());
