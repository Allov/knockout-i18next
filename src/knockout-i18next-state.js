define(['knockout'],
    function(ko) {
        'use strict';

        function KnockoutI18nextState() {
            var self = this;

            self.lng = ko.observable('fr');
            self.namespaces = ['default', 'another'];
        }

        return new KnockoutI18nextState();
    });
