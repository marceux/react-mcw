'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Elements we can focus on?
var FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), ' + 'button:not([disabled]), iframe, object, embed, [tabindex], [contenteditable]';

exports.FOCUSABLE_ELEMENTS = FOCUSABLE_ELEMENTS;