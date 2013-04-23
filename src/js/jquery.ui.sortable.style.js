/*jslint browser:true, nomen:true, devel:true */
/*global document, jQuery */
/*
 * jQuery UI Sortable Style Changer v0.1
 * Copyright (c) 2013 Bart Conrad
 *
 * http://www.hippomanager.com/
 *
 * Depends:
 *   - jQuery 1.7.2+
 *   - jQuery UI 1.9.1 widget factory
 *
 * Licensed under the GPL licenses:
 *   http://www.gnu.org/licenses/gpl.html
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
(function ($) {
    "use strict";

    /**
     * ui.sortable
     *
     * Extends the jQuery UI Sortable plugin adding the ability to change
     * the style of the items when they get moved from one sortable to another.
     */
    $.widget('ui.sortable', $.ui.sortable, {
        options: {
            styleClass:             null,
            styleChangeDuration:    500,
            styleChangeEasing:      'swing'
        },
        _create: function () {
            var self = this,
                el = self.element,
                o = self.options;

            //Global Vars
            self.userReceive = o.receive || $.noop;

            o.receive = function (e, ui) {
                self._receive(
                    e,
                    ui,
                    function (e, ui) {
                        self.userReceive(e, ui);
                    }
                );
            };

            self._super();
        },
        /**
         * Changes the class of the item to the class from the
         * that is set in the "style" option
         *
         * @param {event} e
         * @param {object} ui
         * @param {callback} onStyleChanged
         */
        _receive: function (e, ui, onStyleChanged) {
            var self = this,
                el = self.element,
                o = self.options;

            if (o.styleClass !== null && o.styleClass !== undefined) {
                $(ui.item).switchClass(
                    $(ui.item).attr('class'),
                    o.styleClass,
                    o.styleChangeDuration,
                    o.styleChangeEasing,
                    function () {
                        self._trigger('stylechange', e, ui);
                        onStyleChanged();
                    }
                );
            }
        },
        _setOption: function (key, value) {
            var self = this,
                el = self.element,
                o = self.options;

            switch (key) {
            case 'styleClass':
                //Changes the the class of the li when the "styleClass" option
                //is changed
                el.find('li').removeClass(o.styleClass);
                el.find('li').addClass(value);
                break;
            }

            self._superApply(arguments);
        },
        _destroy: function () {
            var self = this,
                el = self.element,
                o = self.options;

            //removes the class if there is one
            el.find('li').removeClass(o.styleClass);

            self._super();
        }
    });
}(jQuery));