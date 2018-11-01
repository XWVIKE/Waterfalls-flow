(function () {

    var pow = Math.pow,
        sqrt = Math.sqrt,
        sin = Math.sin,
        cos = Math.cos,
        PI = Math.PI,
        c1 = 1.70158,
        c2 = c1 * 1.525,
        c3 = c1 + 1,
        c4 = (2 * PI) / 3,
        c5 = (2 * PI) / 4.5;


    easing = {
        easeInQuad: function (x) {
            return x * x;
        },
        easeOutQuad: function (x) {
            return 1 - (1 - x) * (1 - x);
        },
        easeInOutQuad: function (x) {
            return x < 0.5 ?
                2 * x * x :
                1 - pow(-2 * x + 2, 2) / 2;
        },
        easeInCubic: function (x) {
            return x * x * x;
        },
        easeOutCubic: function (x) {
            return 1 - pow(1 - x, 3);
        },
        easeInOutCubic: function (x) {
            return x < 0.5 ?
                4 * x * x * x :
                1 - pow(-2 * x + 2, 3) / 2;
        },
        easeInQuart: function (x) {
            return x * x * x * x;
        },
        easeOutQuart: function (x) {
            return 1 - pow(1 - x, 4);
        },
        easeInOutQuart: function (x) {
            return x < 0.5 ?
                8 * x * x * x * x :
                1 - pow(-2 * x + 2, 4) / 2;
        },
        easeInQuint: function (x) {
            return x * x * x * x * x;
        },
        easeOutQuint: function (x) {
            return 1 - pow(1 - x, 5);
        },
        easeInOutQuint: function (x) {
            return x < 0.5 ?
                16 * x * x * x * x * x :
                1 - pow(-2 * x + 2, 5) / 2;
        },
        easeInSine: function (x) {
            return 1 - cos(x * PI / 2);
        },
        easeOutSine: function (x) {
            return sin(x * PI / 2);
        },
        easeInOutSine: function (x) {
            return -(cos(PI * x) - 1) / 2;
        },
        easeInExpo: function (x) {
            return x === 0 ? 0 : pow(2, 10 * x - 10);
        },
        easeOutExpo: function (x) {
            return x === 1 ? 1 : 1 - pow(2, -10 * x);
        },
        easeInOutExpo: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
                pow(2, 20 * x - 10) / 2 :
                (2 - pow(2, -20 * x + 10)) / 2;
        },
        easeInCirc: function (x) {
            return 1 - sqrt(1 - pow(x, 2));
        },
        easeOutCirc: function (x) {
            return sqrt(1 - pow(x - 1, 2));
        },
        easeInOutCirc: function (x) {
            return x < 0.5 ?
                (1 - sqrt(1 - pow(2 * x, 2))) / 2 :
                (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
        },
        easeInElastic: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 :
                -pow(2, 10 * x - 10) * sin((x * 10 - 10.75) * c4);
        },
        easeOutElastic: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 :
                pow(2, -10 * x) * sin((x * 10 - 0.75) * c4) + 1;
        },
        easeInOutElastic: function (x) {
            return x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ?
                -(pow(2, 20 * x - 10) * sin((20 * x - 11.125) * c5)) / 2 :
                pow(2, -20 * x + 10) * sin((20 * x - 11.125) * c5) / 2 + 1;
        },
        easeInBack: function (x) {
            return c3 * x * x * x - c1 * x * x;
        },
        easeOutBack: function (x) {
            return 1 + c3 * pow(x - 1, 3) + c1 * pow(x - 1, 2);
        },
        easeInOutBack: function (x) {
            return x < 0.5 ?
                (pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2 :
                (pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
        },
        easeInBounce: function (x) {
            return 1 - bounceOut(1 - x);
        },
        easeOutBounce: bounceOut,
        easeInOutBounce: function (x) {
            return x < 0.5 ?
                (1 - bounceOut(1 - 2 * x)) / 2 :
                (1 + bounceOut(2 * x - 1)) / 2;
        }
    };
    var request = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (fn) {
            setTimeout(fn, updateTime)
        };

    function parameter(obj) {
        var a, b, c, d;
        for (var i = 0; i < obj.arguments.length; i++) {
            if (typeof obj.arguments[i] === "object") {
                a = obj.arguments[i]
            }
            else if (typeof obj.arguments[i] === "number") {
                b = obj.arguments[i]
            }
            else if (typeof obj.arguments[i] === "function") {
                c = obj.arguments[i]
            }
            else if (typeof obj.arguments[i] === "string") {
                d = obj.arguments[i]
            }
        }
        return {
            ease: d,
            distance: a,
            time: b,
            callback: c
        }
    }

    var updateTime = 16;


    var Customize = function () {
    };

    window.c = new Customize;
    _c = Customize.prototype;
    _c.c = function () {
        var g = parameter(this.c);
        ease = g.ease || 'easeInQuad';
        time = g.time || 500;
        distance = g.distance || [100, 200];
        var start = distance[0], end = distance[1];
        var fn = g.callback;
        var changeValue = end - start;
        var updateCount = Math.round(time / updateTime);
        var b = 1, c = b / updateCount, temp = 0;
        pixel = 0;

        function step() {
            temp = start + changeValue * easing[ease](pixel);
            pixel += c;
            if (pixel < b) {
                request(step)
            }
            fn(temp);
        }

        request(step);
    };

    var Animation = function (ele) {
        this.ele = ele;
        this.arr = [];
        if (this.ele.indexOf('#') === 0) {
            this.arr.push(document.getElementById(this.ele.slice(1)))
        } else if (this.ele.indexOf('.') === 0) {
            var classDom = document.getElementsByClassName(this.ele);
            for (var i = 0; i < classDom.length; i++) {
                this.arr.push(classDom[i])
            }
        } else {
            var dom = document.getElementsByTagName(this.ele);
            for (var j = 0; j < dom.length; j++) {
                this.arr.push(dom[j])
            }
        }
    };


    window.Animation = Animation;

    _fn = Animation.prototype;
    _fn.each = function (fn) {
        for (var i = 0; i < this.arr.length; i++) {
            fn.call(this, this.arr[i])
        }
        return this;
    };
    _fn.basicStyle = function () {
        this.each(function (el) {
            var g = parameter(this.basicStyle);
            ease = g.ease || 'easeInQuad';
            time = g.time || 300;
            distance = g.distance || ['width', 100, 300];
            var name = distance[0], start = distance[1], end = distance[2];
            var changeValue = end - start;
            var updateCount = Math.round(time / updateTime);
            var b = 1, c = b / updateCount, temp = 0;
            var pixel = 0;

            function step() {
                temp = start + changeValue * easing[ease](pixel);
                el.style[name] = temp + 'px';
                pixel += c;
                if (pixel < b) {
                    request(step)
                } else {
                    setTimeout(g.callback, 0)
                }
            }

            request(step);
        });
        return this;
    };
    _fn.event = function (ev, fn) {
        ev = ev || window.onload;
        this.each(function (el) {
            el.addEventListener(ev, function () {
                fn.call(this)
            })
        });
        return this;
    };


    _fn.move = function () {
        this.each(function (el) {
            var g = parameter(this.move);
            ease = g.ease || 'easeInQuad';
            distance = g.distance || [0, 500, 0];
            time = g.time || 500;
            var start = distance[0], end = distance[1], direction = distance[2] || 0;
            var changeValue = end - start;
            var updateCount = Math.round(time / updateTime);
            var b = 1, c = b / updateCount, temp = 0;
            var pixel = 0;

            function step() {
                if (direction === 0) {
                    temp = start + changeValue * easing[ease](pixel);
                    el.style.left = temp + 'px';
                    pixel += c;
                    if (pixel < b) {
                        request(step)
                    } else {
                        setTimeout(g.callback, 0)
                    }
                } else if (direction === 1) {
                    temp = Math.floor(start + changeValue * easing[ease](pixel));
                    el.style.top = temp + 'px';
                    pixel += c;
                    if (pixel < b) {
                        request(step)
                    } else {
                        setTimeout(g.callback, 0)
                    }
                }
            }

            request(step);
        });
        return this;
    };
    _fn.changeOpacity = function () {
        this.each(function (el) {
            var g = parameter(this.changeOpacity);
            ease = g.ease || 'easeInQuad';
            distance = g.distance || [0, 100, 'yes'];
            time = g.time || 500;
            var start = distance[0], end = distance[1], hide = distance[2] || 'no';
            var changeValue = end - start;
            var updateCount = Math.round(time / updateTime);
            var b = 1, c = b / updateCount, temp = 0;
            var pixel = 0;

            function step() {
                temp = start + changeValue * easing[ease](pixel);
                el.style.opacity = temp / 100;
                pixel += c;
                if (pixel >= c && hide === 'yes') {
                    el.style.display = 'none';
                }
                if (pixel < b) {
                    request(step)
                } else {
                    setTimeout(g.callback, 0)
                }
            }

            request(step)

        });
        return this
    };

    function bounceOut(x) {
        var n1 = 7.5625,
            d1 = 2.75;
        if (x < 1 / d1) {
            return n1 * x * x;
        } else if (x < 2 / d1) {
            return n1 * (x -= (1.5 / d1)) * x + .75;
        } else if (x < 2.5 / d1) {
            return n1 * (x -= (2.25 / d1)) * x + .9375;
        } else {
            return n1 * (x -= (2.625 / d1)) * x + .984375;
        }
    }

})();