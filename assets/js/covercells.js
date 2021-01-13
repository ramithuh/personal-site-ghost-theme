"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function () {
    var b = function () {
        function b(t) {
            var e = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            _classCallCheck(this, b);

            if (!(t instanceof Node)) throw "Can't initialize  VanillaTilt because " + t + " is not a Node.";
            this.width = null, this.height = null, this.left = null, this.top = null, this.transitionTimeout = null, this.updateCall = null, this.updateBind = this.update.bind(this), this.resetBind = this.reset.bind(this), this.element = t, this.settings = this.extendSettings(e), this.reverse = this.settings.reverse ? -1 : 1, this.glare = this.isSettingTrue(this.settings.glare), this.glarePrerender = this.isSettingTrue(this.settings["glare-prerender"]), this.glare && this.prepareGlare(), this.addEventListeners();
        }

        _createClass(b, [{
            key: "isSettingTrue",
            value: function isSettingTrue(t) {
                return "" === t || !0 === t || 1 === t;
            }
        }, {
            key: "addEventListeners",
            value: function addEventListeners() {
                this.onMouseEnterBind = this.onMouseEnter.bind(this), this.onMouseMoveBind = this.onMouseMove.bind(this), this.onMouseLeaveBind = this.onMouseLeave.bind(this), this.onWindowResizeBind = this.onWindowResizeBind.bind(this), this.element.addEventListener("mouseenter", this.onMouseEnterBind), this.element.addEventListener("mousemove", this.onMouseMoveBind), this.element.addEventListener("mouseleave", this.onMouseLeaveBind), this.glare && window.addEventListener("resize", this.onWindowResizeBind);
            }
        }, {
            key: "onMouseEnter",
            value: function onMouseEnter(t) {
                this.updateElementPosition(), this.element.style.willChange = "transform", this.setTransition();
            }
        }, {
            key: "onMouseMove",
            value: function onMouseMove(t) {
                null !== this.updateCall && cancelAnimationFrame(this.updateCall), this.event = t, this.updateCall = requestAnimationFrame(this.updateBind);
            }
        }, {
            key: "onMouseLeave",
            value: function onMouseLeave(t) {
                this.setTransition(), this.settings.reset && requestAnimationFrame(this.resetBind);
            }
        }, {
            key: "reset",
            value: function reset() {
                this.event = {
                    pageX: this.left + this.width / 2,
                    pageY: this.top + this.height / 2
                }, this.element.style.transform = "perspective(" + this.settings.perspective + "px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)", this.glare && (this.glareElement.style.transform = "rotate(180deg) translate(-50%, -50%)", this.glareElement.style.opacity = "0");
            }
        }, {
            key: "getValues",
            value: function getValues() {
                var t = (this.event.clientX - this.left) / this.width,
                    e = (this.event.clientY - this.top) / this.height;
                return t = Math.min(Math.max(t, 0), 1), e = Math.min(Math.max(e, 0), 1), {
                    tiltX: (this.reverse * (this.settings.max / 2 - t * this.settings.max)).toFixed(2),
                    tiltY: (this.reverse * (e * this.settings.max - this.settings.max / 2)).toFixed(2),
                    percentageX: 100 * t,
                    percentageY: 100 * e,
                    angle: Math.atan2(this.event.clientX - (this.left + this.width / 2), -(this.event.clientY - (this.top + this.height / 2))) * (180 / Math.PI)
                };
            }
        }, {
            key: "updateElementPosition",
            value: function updateElementPosition() {
                var t = this.element.getBoundingClientRect();
                this.width = this.element.offsetWidth, this.height = this.element.offsetHeight, this.left = t.left, this.top = t.top;
            }
        }, {
            key: "update",
            value: function update() {
                var t = this.getValues();
                this.element.style.transform = ["perspective(" + this.settings.perspective + "px) ", "rotateX(" + ("x" === this.settings.axis ? 0 : t.tiltY) + "deg) ", "rotateY(" + ("y" === this.settings.axis ? 0 : t.tiltX) + "deg) ", "scale3d(" + this.settings.scale + ", " + this.settings.scale + ", " + this.settings.scale + ")"].join(" "), this.glare && (this.glareElement.style.transform = "rotate(" + t.angle + "deg) translate(-50%, -50%)", this.glareElement.style.opacity = "" + t.percentageY * this.settings["max-glare"] / 100), this.element.dispatchEvent(new CustomEvent("tiltChange", {
                    detail: t
                })), this.updateCall = null;
            }
        }, {
            key: "prepareGlare",
            value: function prepareGlare() {
                if (!this.glarePrerender) {
                    var t = document.createElement("div");
                    t.classList.add("js-tilt-glare");
                    var e = document.createElement("div");
                    e.classList.add("js-tilt-glare-inner"), t.appendChild(e), this.element.appendChild(t);
                }
                this.glareElementWrapper = this.element.querySelector(".js-tilt-glare"), this.glareElement = this.element.querySelector(".js-tilt-glare-inner"), this.glarePrerender || (Object.assign(this.glareElementWrapper.style, {
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    "pointer-events": "none"
                }), Object.assign(this.glareElement.style, {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    "pointer-events": "none",
                    "background-image": "linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)",
                    width: 2 * this.element.offsetWidth + "px",
                    height: 2 * this.element.offsetWidth + "px",
                    transform: "rotate(180deg) translate(-50%, -50%)",
                    "transform-origin": "0% 0%",
                    opacity: "0"
                }));
            }
        }, {
            key: "updateGlareSize",
            value: function updateGlareSize() {
                Object.assign(this.glareElement.style, {
                    width: "" + 2 * this.element.offsetWidth,
                    height: "" + 2 * this.element.offsetWidth
                });
            }
        }, {
            key: "onWindowResizeBind",
            value: function onWindowResizeBind() {
                this.updateGlareSize();
            }
        }, {
            key: "setTransition",
            value: function setTransition() {
                var _this = this;

                this.transitionTimeout && clearTimeout(this.transitionTimeout), this.element.style.transition = "transform .4s cubic-bezier(0,0,.2,1)", this.glare && (this.glareElement.style.transition = "opacity " + this.settings.speed + "ms " + this.settings.easing), this.transitionTimeout = setTimeout(function () {
                    _this.element.style.transition = "", _this.glare && (_this.glareElement.style.transition = "");
                }, this.settings.speed);
            }
        }, {
            key: "extendSettings",
            value: function extendSettings(t) {
                var e = {
                    reverse: !1,
                    max: 35,
                    perspective: 1e3,
                    easing: "cubic-bezier(.03,.98,.52,.99)",
                    scale: "1",
                    speed: "300",
                    transition: !0,
                    axis: null,
                    glare: !1,
                    "max-glare": 1,
                    "glare-prerender": !1,
                    reset: !0
                },
                    n = {};
                for (var s in e) {
                    if (s in t) n[s] = t[s];else if (this.element.hasAttribute("data-tilt-" + s)) {
                        var _t = this.element.getAttribute("data-tilt-" + s);
                        try {
                            n[s] = JSON.parse(_t);
                        } catch (e) {
                            n[s] = _t;
                        }
                    } else n[s] = e[s];
                }return n;
            }
        }], [{
            key: "init",
            value: function init(t) {
                var e = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

                t instanceof Node && (t = [t]), t instanceof NodeList && (t = [].slice.call(t)), t instanceof Array && t.forEach(function (t) {
                    "vanillaTilt" in t || (t.vanillaTilt = new b(t, e));
                });
            }
        }]);

        return b;
    }();

    var Se;
    !function (t) {
        t[t.home = 8] = "home";
    }(Se || (Se = {}));
    var Le = {
        page: document.body.classList.contains("home") ? Se.home : void 0,
        onLoad: function onLoad(t, e) {
            (t === Le.page || Le.page && Array.isArray(t) && t.includes(Le.page)) && document.addEventListener("DOMContentLoaded", function () {
                e();
            });
        }
    };
    document.addEventListener("DOMContentLoaded", function () {
        (function () {
            var t = Array.from(document.querySelectorAll(".js-copy-clipboard"));
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                var _loop = function _loop() {
                    var e = _step.value;

                    var t = e.querySelector(".copy-trigger");
                    t && t.addEventListener("click", function () {
                        h(e.innerText.trim());
                    });
                };

                for (var _iterator = t[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    _loop();
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        })();
    }), Le.onLoad(Se.home, function () {
        var e = document.querySelector("div.background-inner[data-pattern]");
        e && new v(e).setup(), b.init(document.querySelectorAll("[data-tilt]"), {
            glare: !0,
            scale: 1.06,
            "max-glare": .3,
            speed: 400
        });
    });
}();