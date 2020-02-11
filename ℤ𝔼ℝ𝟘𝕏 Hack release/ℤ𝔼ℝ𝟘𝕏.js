//This is a test version. I'll start to make own base. I don't know how much time gonna take.

(function() {
    let shared_state = new Map(Object.entries({
        functions_to_hide: new WeakMap(),
        strings_to_hide: [],
        hidden_globals: [],
        init: false
    }));

    let invisible_define = function(obj, key, value) {
        shared_state.get('hidden_globals').push(key);
        Object.defineProperty(obj, key, {
            enumberable: false,
            configurable: false,
            writable: true,
            value: value
        });
    };

    let conceal_function = function(original_Function, hook_Function) {
        shared_state.get('functions_to_hide').set(hook_Function, original_Function);
    };
//diff
    let conceal_string = function(original_string, hook_string) {
        shared_state.get('strings_to_hide').push({
            from: new RegExp(hook_string.replace(/([\[|\]|\(|\)|\*|\\|\.|\+])/g, '\\$1'), 'g'),
            to: original_string
        });
    };
//diff
    const original_toString = Function.prototype.toString;
    let hook_toString = new Proxy(original_toString, {
        apply: function(target, _this, _arguments) {
            //diff
            try {
                var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
            } catch (e) {
                // modify stack trace to hide proxy
                e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
                throw e;
            }
