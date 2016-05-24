'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _knockout = require('knockout');

var _knockout2 = _interopRequireDefault(_knockout);

var _i18next = require('i18next');

var _i18next2 = _interopRequireDefault(_i18next);

var _mutex = require('mutex');

var _mutex2 = _interopRequireDefault(_mutex);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

function KocoI18next() {
    var self = this;

    self.i18next = _i18next2.default;

    var origFn = _i18next2.default.t;
    self.i18next.t = self.i18next.translate = function (key, opts) {
        if (!self.lng) {
            throw new Error('knockout-i18next - Not initialized yet.');
        }

        var y = _knockout2.default.computed(function () {
            var previousValue;

            if (y) {
                previousValue = y.peek();
            }

            return self.mutex.tryLockAuto(previousValue, function () {
                self.lng();
                return origFn(key, opts && _knockout2.default.toJS(opts));
            });
        });

        return y;
    };
}

KocoI18next.prototype.init = function (options) {
    var self = this;

    return new _jquery2.default.Deferred(function (dfd) {
        try {
            if (self.mutex) {
                throw new Error('knockout-i18next - Already initialized.');
            }

            var jsOptions = _knockout2.default.toJS(options);

            if (!jsOptions.lng) {
                throw new Error('knockout-i18next - Init options is missing mandatory \'lng\' property.');
            }

            self.mutex = new _mutex2.default();

            self.mutex.lock(function (unlock) {
                _i18next2.default.init(jsOptions, function () {
                    if (_knockout2.default.isObservable(options.lng)) {
                        self.lng = options.lng;
                    } else {
                        self.lng = _knockout2.default.observable(jsOptions.lng);
                    }

                    self.lng.subscribe(function (value) {
                        self.mutex.lock(function (u) {
                            _i18next2.default.setLng(value, u);
                        });
                    });

                    unlock();
                    dfd.resolve();
                });
            });
        } catch (err) {
            dfd.reject(err);
        }
    }).promise();
};

exports.default = new KocoI18next();