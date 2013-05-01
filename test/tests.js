/* jshint -W097, -W024, -W098 */
/* global chn, test, ok */
"use strict";

test("Prop setter", function () {
  var point = {
    x: 5,
    y: 10
  };

  ok(point.x === 5, "point.x === 5");
  ok(point.y === 10, "point.y === 10");

  chn(point).y(5);

  ok(point.y === 5, "point.y === 5 after chn invocation");
});

test("Prop setter on undefined prop", function () {
  var point = {
    x: 5,
    y: 10
  };

  chn(point).z(-75);

  ok(point.x === 5, "point.x === 5");
  ok(point.y === 10, "point.y === 10");
  ok(point.z === -75, "point.z === -75");
});

test("Method chaining", function () {
  var point = {
      x: 0,
      y: 0
    },
    pointSetter = {
      setX: function (p, v) {
        p.x = v;
      },
      setY: function (p, v) {
        p.y = v;
      }
    };

  pointSetter.setX(point, 5);
  pointSetter.setY(point, 10);

  ok(point.x === 5, "point.x === 5");
  ok(point.y === 10, "point.y === 10");

  throws(function () {
    pointSetter.setX(67).setY(68);
  }, TypeError, "Chaining bare object throws");

  ok(point.x === 5, "point.x === 5 after throw");
  ok(point.y === 10, "point.y === 10 after throw");

  chn(pointSetter).setX(point, 77).setY(point, 78);

  ok(point.x === 77, "point.x === 77");
  ok(point.y === 78, "point.y === 78");
  ok(point.z === undefined, "point.z === undefined");
});

test("Method and property chaining", function () {
  var point = {
      x: 0,
      y: 0
    },
    pointSetter = {
      setX: function (p, v) {
        p.x = v;
      },
      setY: function (p, v) {
        p.y = v;
      }
    };

  chn(pointSetter).setX(point, 77).setY(point, 78).setZ(function (p, v) {
    p.z = v;
  }).setZ(point, 79);

  ok(typeof pointSetter.setZ === 'function', "pointSetter.setZ is a function");
  ok(point.x === 77, "point.x === 77");
  ok(point.y === 78, "point.y === 78");
  ok(point.z === 79, "point.z === 79");

  pointSetter.setZ(point, 80);

  ok(point.z === 80, "point.z === 80");
});
