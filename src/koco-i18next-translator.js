// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

define(['koco-i18next'],
    function(kocoI18next) {
        'use strict';

        var Translator = function() {
            var self = this;

            self.translations = [];

            self.lng = kocoI18next.lng;

            self.t = function(key, translationKey, translationOptions) {
                if (!key) {
                    throw new Error('i18next translator - No key specified.');
                }

                var result = kocoI18next.i18next.t((translationKey || key), translationOptions);

                if (result) {
                    self.translations.push(result);
                }
                
                return result;
            };
        };

        Translator.prototype.dispose = function() {
            var self = this;

            for (var i = 0; i < self.translations.length; i++) {
                self.translations[i].dispose();
            }

        };

        return Translator;
    });
