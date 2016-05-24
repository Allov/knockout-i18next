// Copyright (c) CBC/Radio-Canada. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import kocoI18next from 'koco-i18next';


var Translator = function() {
    var self = this;

    self.lng = kocoI18next.lng;
    self.translations = [];

    self.t = function(translationKey, translationOptions) {
        var result = kocoI18next.i18next.t(translationKey, translationOptions);

        self.translations.push(result);

        return result;
    };
};

Translator.prototype.dispose = function() {
    var self = this;

    for (var i = self.translations.length - 1; i >= 0; i--) {
        self.translations[i].dispose();
    }
};

export default Translator;
