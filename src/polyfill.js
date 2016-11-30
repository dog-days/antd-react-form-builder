'use strict';

//兼容IE10，这个看情况启用，启用后下面除了兼容构造器都可以删除。
//import es6 from "es6-shim"
//es6支持IE10
Object.assign = Object.assign || require('object.assign/polyfill')(); // returns native method if compliant
Object.keys = Object.keys.shim || Object.keys;
//兼容父类构造器不允许问题
(function () {
  var testObject = {};
  if (!(Object.setPrototypeOf || testObject.__proto__)) {
    var nativeGetPrototypeOf = Object.getPrototypeOf;

    Object.getPrototypeOf = function (object) {
      if (object.__proto__) {
        return object.__proto__;
      } else {
        return nativeGetPrototypeOf.call(Object, object);
      }
    };
  }
})();
