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
