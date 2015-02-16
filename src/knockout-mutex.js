//TODO: Déplacer vers un bower component stand-alone
define(['knockout'],
    function(ko) {
        'use strict';

        function Mutex() {
            var self = this;

            self.locked = ko.obervable();
        }

        Mutex.prototype.lock = function(action) {
            var self = this;

            if (self.locked()) {
                var subscription = self.locked.subscribe(function() {
                    subscription.dispose();
                    lock(self, action);
                });
            } else {
                lock(self, action);
            }
        };

        Mutex.prototype.tryLockAuto = function(action) {
            var self = this;

            if (self.locked()) {
                var subscription = self.locked.subscribe(function() {
                    subscription.dispose();
                    action();
                });
            } else {
                action();
            }
        };

        Mutex.prototype.unlock = function() {
            var self = this;

            self.locked(false);
        };

        function lock(self, action) {
            self.locked(true);
            action(self.unlock.bind(self));
        }

        return Mutex;
    });
