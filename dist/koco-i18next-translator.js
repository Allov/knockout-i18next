'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _kocoI18next = require('koco-i18next');

var _kocoI18next2 = _interopRequireDefault(_kocoI18next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Translator = function Translator() {
    var self = this;

    self.lng = _kocoI18next2.default.lng;
    self.translations = [];

    self.t = function (translationKey, translationOptions) {
        var result = _kocoI18next2.default.i18next.t(translationKey, translationOptions);

        self.translations.push(result);

        return result;
    };
}; // Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

Translator.prototype.dispose = function () {
    var self = this;

    for (var i = self.translations.length - 1; i >= 0; i--) {
        self.translations[i].dispose();
    }
};

exports.default = Translator;