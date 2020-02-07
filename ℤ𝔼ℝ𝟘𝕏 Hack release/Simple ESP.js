// ==UserScript==
// @name         Krunker.io ESP
// @namespace    https://github.com/ZaresPlusX
// @version      1.9.9
// @description  Lmao
// @author       ZaresPlus X
// @match        *://krunker.io/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

// Layout just :D
(function(){
    var original_push = Array.prototype.push;
    function hook_push(...args) {
        original_push.apply(this, args);
        if (args[0] && args[0].armMeshes) {
            Object.defineProperty(args[0], "lhYWIWew", { get: function() { return true } });
        }
    }

    var string_map = {};
	var original_toString = Function.prototype.toString;
	function hook_toString(...args) {
		var return_string = original_toString.apply(this, args);
		if (string_map[return_string]) {
			return_string = string_map[return_string];
		}
		return return_string;
	}

	string_map[hook_push.toString()] = original_push.toString();
	string_map[hook_toString.toString()] = original_toString.toString();

    Array.prototype.push = hook_push;
	Function.prototype.toString = hook_toString;
})()
