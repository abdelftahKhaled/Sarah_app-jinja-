(function() {
    'use strict';
    var commonUse = {
        addClass: function(el, cls) {
            var elClass = el.className;
            var blank = (elClass !== '') ? ' ' : '';
            var added = elClass + blank + cls;
            el.className = added;
        },
        removeClass: function(el, cls) {
            var elClass = ' ' + el.className + ' ';
            elClass = elClass.replace(/(\s+)/gi, ' ');
            var removed = elClass.replace(' ' + cls + ' ', ' ');
            removed = removed.replace(/(^\s+)|(\s+$)/g, '');
            el.className = removed;
        },
        hasClass: function(el, cls) {
            var elClass = el.className;
            var elClassList = elClass.split(/\s+/);
            var x = 0;
            for (x in elClassList) {
                if (elClassList[x] == cls) {
                    return true;
                }
            }
            return false;
        },
        addEvent: function(el, type, func) {
            if (el.addEventListener) {
                el.addEventListener(type, func, false);
            } else if (el.attachEvent) {
                el.attachEvent('on' + type, func);
            } else {
                el['on' + type] = func;
            }
        },
        removeEvent: function(el, type, func) {
            if (el.removeEventListener) {
                el.removeEventListener(type, func, false);
            } else if (el.detachEvent) {
                el.detachEvent('on' + type, func);
            } else {
                delete el['on' + type];
            }
        },
        removeElement: function(el) {
            (el && el.parentNode) && el.parentNode.removeChild(el);
        },
        setUid: function(prefix) {
            do prefix += Math.floor(Math.random() * 1000000); while (document.getElementById(prefix));
            return prefix;
        }
    };
    var Alerty = function() {
        var Dialog = {
            defaults: {
                okLabel: ' حسناً',
                cancelLabel: 'ألغاء',
                time: 2000
            },
            previousCallback: null,
            template: '<div id="alertclose"><div class="alerty-overlay" tabindex="-1"></div>' +
                '<div class="alerty">' +
                '<div class="alerty-title" style="text-align:right;"></div>' +
                '<div class="alerty-content" style="text-align:right;">' +
                '<p class="alerty-message rtl"></p>' +
                '<div class="alerty-prompt">' +
                '<input type="text" placeholder="" value="">' +
                '<div class="input-line"></div>' +
                '</div>' +
                '</div>' +
                '<div class="alerty-action">' +
                '<a class="btn-cancel"></a>' +
                '<a class="btn-ok"></a>' +
                '</div>' +
                '</div></div>',
            setup: function(type, content, opts, onOk, onCancel) {
                var detect = typeof opts === 'function';
                if (detect) {
                    onCancel = onOk;
                    onOk = opts;
                }
                var $oldModal = document.querySelector('.alerty');
                if ($oldModal) {
                    commonUse.removeElement($oldModal);
                    var _callback = this.previousCallback;
                    if (_callback) _callback();
                }
                var $wrapper = document.createElement('div');
                $wrapper.innerHTML = this.template;
                while ($wrapper.firstChild) {
                    document.body.appendChild($wrapper.firstChild);
                }
                var $modal = document.querySelector('.alerty');
                var $overlay = document.querySelector('.alerty-overlay');
                var $title = $modal.querySelector('.alerty-title');
                var $message = $modal.querySelector('.alerty-message');
                var $btnArea = $modal.querySelector('.alerty-action');
                var $btnOk = $modal.querySelector('.btn-ok');
                var $btnCancel = $modal.querySelector('.btn-cancel');
                var $prompt = $modal.querySelector('.alerty-prompt');
                var $input = $prompt.querySelector('input');
                $modal.id = commonUse.setUid('alerty');
                $overlay.id = 'overlay-' + $modal.id;
                commonUse.addClass($overlay, 'active');
                commonUse.addClass($modal, 'alerty-show');
                $message.innerHTML = content;
                if (opts && opts.time) this.defaults.time = opts.time;
                if (type !== 'prompt') {
                    commonUse.removeElement($prompt);
                } else {
                    $input.focus();
                    if (opts && opts.inputType) $input.setAttribute('type', opts.inputType);
                    if (opts && opts.inputPlaceholder) $input.setAttribute('placeholder', opts.inputPlaceholder);
                    if (opts && opts.inputValue) $input.setAttribute('value', opts.inputValue);
                    if (opts && opts.inputDir) $input.setAttribute('dir', opts.inputDir);
                }
                if (type === 'toasts') {
                    this.previousCallback = onOk;
                    commonUse.removeElement($title);
                    commonUse.removeElement($btnArea);
                    commonUse.removeElement($overlay);
                    commonUse.addClass($modal, 'toasts');
                    if (opts && opts.place === 'top') commonUse.addClass($modal, 'place-top');
                    if (opts && opts.bgColor) $modal.style.backgroundColor = opts.bgColor;
                    if (opts && opts.fontColor) $message.style.color = opts.fontColor;
                } else {
                    commonUse.addClass(document.body, 'no-scrolling');
                    (opts && opts.title) ? $title.innerHTML = opts.title: commonUse.removeElement($title);
                    (opts && opts.okLabel) ? $btnOk.innerHTML = opts.okLabel: $btnOk.innerHTML = this.defaults.okLabel;
                    $modal.style.marginTop = -$modal.offsetHeight / 2 + 'px';
                    if (type === 'confirm' || type === 'prompt') {
                        (opts && opts.cancelLabel) ? $btnCancel.innerHTML = opts.cancelLabel: $btnCancel.innerHTML = this.defaults.cancelLabel;
                    } else {
                        commonUse.removeElement($btnCancel);
                    }
                }
                this.bindEvent($modal, onOk, onCancel);
            },
            bindEvent: function($modal, onOk, onCancel) {
                var that = this;
                var $btnOk = $modal.querySelector('.btn-ok');
                var $btnCancel = $modal.querySelector('.btn-cancel');
                if (commonUse.hasClass($modal, 'toasts')) {
                    setTimeout(function() {
                        if (document.getElementById($modal.id) === null) return;
                        that.close($modal, onOk);
                    }, that.defaults.time);
                }
                if ($btnOk) {
                    commonUse.addEvent($btnOk, 'click', function() {
                        that.close($modal, onOk);
                    });
                }
                if ($btnCancel) {
                    commonUse.addEvent($btnCancel, 'click', function() {
                        that.close($modal, onCancel);
                    });
                }
            },
            close: function($modal, callback) {
                var $input = $modal.querySelector('input');
                var $overlay = document.getElementById('overlay-' + $modal.id);
                commonUse.removeClass($modal, 'alerty-show');
                commonUse.addClass($modal, 'alerty-hide');
                document.getElementById("alertclose").remove();
                setTimeout(function() {
                    $overlay && commonUse.removeClass($overlay, 'active'), commonUse.removeClass(document.body, 'no-scrolling');
                    document.body.className = '';
                    commonUse.removeElement($modal);
                    commonUse.removeElement($overlay);
                    if (callback) {
                        setTimeout(function() {
                            !$input ? callback() : callback($input.value);
                        }, 100);
                    }
                }, 100);
            }
        };
        return {
            toasts: function(content, opts, callback) {
                Dialog.setup('toasts', content, opts, callback);
            },
            alert: function(content, opts, onOk) {
                Dialog.setup('alert', content, opts, onOk);
            },
            confirm: function(content, opts, onOk, onCancel) {
                Dialog.setup('confirm', content, opts, onOk, onCancel);
            },
            prompt: function(content, opts, onOk, oncancel) {
                Dialog.setup('prompt', content, opts, onOk, oncancel);
            }
        };
    };
    if ('undefined' !== typeof module && !!module && !!module.exports) {
        module.exports = function() {
            return new Alerty();
        };
        var obj = new Alerty();
        for (var key in obj) {
            module.exports[key] = obj[key];
        }
    } else if (typeof define === 'function' && define.amd) {
        define(function() {
            return new Alerty();
        });
    } else {
        window.alerty = new Alerty();
    }
}());