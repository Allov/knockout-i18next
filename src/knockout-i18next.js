define(['knockout', 'i18next', 'knockout-i18next-state','knockout-mutex'], 
    function (ko, i18next, state, Mutex) {
    'use strict';

    var mutex = new Mutex();

    mutex.lock(function (unlock) {
        i18next.init({
            lng: state.lng(),
            getAsync: true,
            fallbackLng: 'en',
            resGetPath: 'app/locale/__lng__/__ns__.json',
            ns: {
                namespaces: state.namespaces,
                defaultNs: state.namespaces && state.namespaces[0],
            },
        }, unlock);
    });

    state.lng.subscribe(function (value) {
        mutex.lock(function (unlock) {
            i18next.setLng(value, unlock);
        });
    });

    var origFn = i18next.t;
    i18next.t = i18next.translate = function (key, opts) {
        return ko.computed(function () {
            return mutex.tryLockAuto(function () {
                state.lng();
                return origFn(key, opts && ko.toJS(opts));
            });
        });
    };

    return i18next;
});