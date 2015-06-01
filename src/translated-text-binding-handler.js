define(['knockout', 'jquery', 'koco-i18next'],
    function(ko, $, kocoI18next) {
        'use strict';

        ko.bindingHandlers.translatedText = {
            init: function(element, valueAccessor, allBindings /*, viewModel, bindingContext*/ ) {
                var translationKey = ko.unwrap(valueAccessor());

                var translatedTextOptions = allBindings.get('translatedTextOptions');

                var output = kocoI18next.i18next.t(translationKey, translatedTextOptions);

                ko.applyBindingsToNode(element, {
                    text: output
                });

                ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
                    output.dispose();
                });
            }
        };
    });
