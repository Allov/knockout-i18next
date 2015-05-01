// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['koco-i18next'],
    function(kocoI18next) {
        'use strict';

        var Translator = function() {
            var self = this;

            self.translations = {};

            self.lng = kocoI18next.lng;

            self.t = function(key, translationKey, translationOptions) {
                if (!key) {
                    throw new Error('i18next translator - No key specified.');
                }

                if (self.translations.hasOwnProperty(key)) {
                    return self.translations[key];
                }

                var result = self.translations[key] = kocoI18next.i18next.t((translationKey || key), translationOptions);

                return result;
            };
        };

        Translator.prototype.dispose = function() {
            var self = this;

            for (var prop in self.translations) {
                if (self.translations.hasOwnProperty(prop)) {
                    self.translations[prop].dispose();
                }
            }
        };

        return Translator;
    });
