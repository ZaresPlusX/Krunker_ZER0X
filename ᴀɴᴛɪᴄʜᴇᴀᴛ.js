const e = {};
e.get = function() {
    return () => {};
};
e.set = function(f) {
    return true;
};
e.enumerable = false;
Object.defineProperty(Object.prototype, 'fapply', e);
Object.odp = Object.defineProperty;
Object.defineProperty = function() {
    let g = arguments[1];
    if (g.startsWith && g.startsWith('VM')) {
        arguments[2].value = function() {};
    }
    this.odp(...arguments);
};
// LemonsNibba
