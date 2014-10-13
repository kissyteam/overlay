/**
 * @ignore
 * control for overlay
 * @author yiminghe@gmail.com
 */

var Container = require('component/container');
var Shim = require('component/extension/shim');
var AlignExtension = require('component/extension/align');
var Loading = require('./extension/loading');
var Mask = require('./extension/mask');
var OverlayEffect = require('./extension/overlay-effect');
var ContentBox = require('component/extension/content-box');
var OverlayTpl = require('./xtpl/overlay-render');
var HIDE = 'hide',
    actions = {
        hide: HIDE,
        destroy: 'destroy'
    };
/**
 * KISSY Overlay Component.
 * xclass: 'overlay'.
 * @class KISSY.Overlay
 * @extends KISSY.Component.Container
 * @mixins KISSY.Component.Extension.Shim
 * @mixins KISSY.Overlay.Extension.Effect
 * @mixins KISSY.Overlay.Extension.Loading
 * @mixins KISSY.Component.Extension.Align
 * @mixins KISSY.Overlay.Extension.Mask
 */
module.exports = Container.extend([
    ContentBox,
    Shim,
    Loading,
    AlignExtension,
    Mask,
    OverlayEffect
], {
    bindUI: function () {
        var self = this,
            closeBtn = self.get('closeBtn');
        if (closeBtn) {
            closeBtn.on('click', function (ev) {
                self.close();
                ev.preventDefault();
            });
        }
    },
    /**
     * hide or destroy according to {@link KISSY.Overlay#closeAction}
     * @chainable
     */
    close: function () {
        var self = this;
        self[actions[self.get('closeAction')] || HIDE]();
        return self;
    }
}, {
    ATTRS: {
        handleGestureEvents: {
            value: false
        },

        focusable: {
            value: false
        },

        allowTextSelection: {
            value: true
        },

        contentTpl: {
            value: OverlayTpl
        },

        /**
         * Whether close button is visible.
         *
         * Defaults to: true.
         *
         * @cfg {Boolean} closable
         */
        /**
         * Whether close button is visible.
         * @type {Boolean}
         * @property closable
         */
        /**
         * @ignore
         */
        closable: {
            value: false,
            sync: 0,
            render: 1,
            parse: function () {
                return !!this.get('closeBtn');
            }
        },

        /**
         * close button element.
         * @type {KISSY.Node}
         * @property closeBtn
         * @readonly
         */
        /**
         * @ignore
         */
        closeBtn: {
            selector: function () {
                return '.' + this.getBaseCssClass('close');
            }
        },

        /**
         * Whether to destroy or hide current element when click close button.
         * Can set 'destroy' to destroy it when click close button.
         *
         * Defaults to: 'hide'.
         *
         * @cfg {String} closeAction
         */
        /**
         * @ignore
         */
        closeAction: {
            value: HIDE
        },

        closeText: {
            value: 'close',
            render: 1
        },

        visible: {
            value: false
        }
    },
    xclass: 'overlay'
});