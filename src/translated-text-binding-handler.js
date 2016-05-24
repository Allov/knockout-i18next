import ko from 'knockout';
import $ from 'jquery';
import kocoI18next from 'koco-i18next';


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
