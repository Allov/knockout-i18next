define(['knockout-i18next'],
    function(knockoutI18next) {
        'use strict';

        var Translator = function() {
            var self = this;

            self.translations = {};

            self.lng = knockoutI18next.lng;

            self.t = function(key, translationKey, translationOptions) {
                if (!key) {
                    throw new Error('i18next translator - No key specified.');
                }

                if (self.translations.hasOwnProperty(key)) {
                    return self.translations[key];
                }

                var result = self.translations[key] = knockoutI18next.i18next.t((translationKey || key), translationOptions);

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
