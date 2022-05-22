// This function is used for delay calling an api.
// It works as a debounce available in other JS libraries.
// the only difference is, you call execute() function with new parameters
// to call the pre configured function unlike debounce options.

/*
	
var operation = AjaxCallSynchronizer({
	0,
	function(param0, param1) {
	}
});

operation('1', '2');

*/

;function AjaxCallSynchronizer(options) {
  'use strict';

  this.execute = execute;

  var defaults = {
    apiRequestDelay: 0,
    apiRequest: undefined
  };

  var local = {
    settings: {},
    timer: undefined
  };

  local.settings = $.extend(true, {}, defaults, options);

  function execute() {

    if (local.timer) {
      clearTimeout(local.timer);
    }

    var executeArgs = Array.prototype.slice.call(arguments);

    var closure = (function (args) {
      return function () {
        local.timer = undefined;
        local.settings.apiRequest.apply(this, args);
      }
    })(executeArgs);
	
    local.timer = setTimeout(closure, local.settings.apiRequestDelay);
  }

}
