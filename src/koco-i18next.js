// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import ko from 'knockout';
import i18next from 'i18next';
import Mutex from 'mutex';
import $ from 'jquery';


function KocoI18next() {
    var self = this;

    self.i18next = i18next;

    var origFn = i18next.t;
    self.i18next.t = self.i18next.translate = function(key, opts) {
        if (!self.lng) {
            throw new Error('knockout-i18next - Not initialized yet.');
        }

        var y = ko.computed(function() {
            var previousValue;

            if (y) {
                previousValue = y.peek();
            }

            return self.mutex.tryLockAuto(previousValue, function() {
                self.lng();
                return origFn(key, opts && ko.toJS(opts));
            });
        });

        return y;
    };
}

KocoI18next.prototype.init = function(options) {
    var self = this;

    return new $.Deferred(function(dfd) {
        try {
            if (self.mutex) {
                throw new Error('knockout-i18next - Already initialized.');
            }

            var jsOptions = ko.toJS(options);

            if (!jsOptions.lng) {
                throw new Error('knockout-i18next - Init options is missing mandatory \'lng\' property.');
            }

            self.mutex = new Mutex();

            self.mutex.lock(function(unlock) {
                i18next.init(jsOptions, function() {
                    if (ko.isObservable(options.lng)) {
                        self.lng = options.lng;
                    } else {
                        self.lng = ko.observable(jsOptions.lng);
                    }

                    self.lng.subscribe(function(value) {
                        self.mutex.lock(function(u) {
                            i18next.setLng(value, u);
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

export default new KocoI18next();
