(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['knockout', 'jquery', 'koco-i18next'], factory);
    } else if (typeof exports !== "undefined") {
        factory(require('knockout'), require('jquery'), require('koco-i18next'));
    } else {
        var mod = {
            exports: {}
        };
        factory(global.knockout, global.jquery, global.kocoI18next);
        global.translatedTextBindingHandler = mod.exports;
    }
})(this, function (_knockout, _jquery, _kocoI18next) {
    'use strict';

    var _knockout2 = _interopRequireDefault(_knockout);

    var _jquery2 = _interopRequireDefault(_jquery);

    var _kocoI18next2 = _interopRequireDefault(_kocoI18next);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    _knockout2.default.bindingHandlers.translatedText = {
        init: function init(element, valueAccessor, allBindings /*, viewModel, bindingContext*/) {
            var translationKey = _knockout2.default.unwrap(valueAccessor());

            var translatedTextOptions = allBindings.get('translatedTextOptions');

            var output = _kocoI18next2.default.i18next.t(translationKey, translatedTextOptions);

            _knockout2.default.applyBindingsToNode(element, {
                text: output
            });

            _knockout2.default.utils.domNodeDisposal.addDisposeCallback(element, function () {
                output.dispose();
            });
        }
    };
});