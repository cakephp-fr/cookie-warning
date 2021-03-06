(function ($) {
    function _1(_2) {
        for (var i = 1; i < arguments.length; i++) {
            _2 = _2.replace("%" + (i - 1), arguments[i]);
        }
        return _2;
    };
    function _3(_4, _5) {
        var _6 = $("img", _4);
        var _7;
        var _8;
        var _9 = null;
        var _a = null;
        var _b = null;
        var _c = null;
        var _d = null;
        var _e = null;
        var _f;
        var _10 = 0;
        var cw, ch;
        var _11 = 0;
        var _12 = 0;
        var _13 = 0;
        var _14 = 0;
        var _15 = 0;
        var mx, my;
        var ctx = this, zw;
        setTimeout(function () {
            if (_a === null) {
                var w = _4.width();
                _4.parent().append(_1("<div style=\"width:%0px;position:absolute;top:75%;left:%1px;text-align:center\" class=\"cloud-zoom-loading\" >Loading...</div>", w / 3, (w / 2) - (w / 6))).find(":last").css("opacity", 0.5);
            }
        }, 200);
        var _16 = function () {
            if (_e !== null) {
                _e.remove();
                _e = null;
            }
        };
        this.removeBits = function () {
            if (_b) {
                _b.remove();
                _b = null;
            }
            if (_c) {
                _c.remove();
                _c = null;
            }
            if (_d) {
                _d.remove();
                _d = null;
            }
            _16();
            $(".cloud-zoom-loading", _4.parent()).remove();
        };
        this.destroy = function () {
            _4.data("zoom", null);
            if (_a) {
                _a.unbind();
                _a.remove();
                _a = null;
            }
            if (_9) {
                _9.remove();
                _9 = null;
            }
            this.removeBits();
        };
        this.fadedOut = function () {
            if (_9) {
                _9.remove();
                _9 = null;
            }
            this.removeBits();
        };
        this.controlLoop = function () {
            if (_b) {
                var x = (mx - _6.offset().left - (cw * 0.5)) >> 0;
                var y = (my - _6.offset().top - (ch * 0.5)) >> 0;
                if (x < 0) {
                    x = 0;
                } else {
                    if (x > (_6.outerWidth() - cw)) {
                        x = (_6.outerWidth() - cw);
                    }
                }
                if (y < 0) {
                    y = 0;
                } else {
                    if (y > (_6.outerHeight() - ch)) {
                        y = (_6.outerHeight() - ch);
                    }
                }
                _b.css({left: x, top: y});
                _b.css("background-position", (-x) + "px " + (-y) + "px");
                _11 = (((x) / _6.outerWidth()) * _f.width) >> 0;
                _12 = (((y) / _6.outerHeight()) * _f.height) >> 0;
                _14 += (_11 - _14) / _5.smoothMove;
                _13 += (_12 - _13) / _5.smoothMove;
                _9.css("background-position", (-(_14 >> 0) + "px ") + (-(_13 >> 0) + "px"));
            }
            _10 = setTimeout(function () {
                ctx.controlLoop();
            }, 30);
        };
        this.init2 = function (img, id) {
            _15++;
            if (id === 1) {
                _f = img;
            }
            if (_15 === 2) {
                this.init();
            }
        };
        this.init = function () {
            $(".cloud-zoom-loading", _4.parent()).remove();
            _a = _4.parent().append(_1("<div class='mousetrap' style='background-image:url(\".\");z-index:999;position:absolute;width:%0px;height:%1px;left:%2px;top:%3px;'></div>", _6.outerWidth(), _6.outerHeight(), 0, 0)).find(":last");
            _a.bind("mousemove", this, function (_17) {
                mx = _17.pageX;
                my = _17.pageY;
            });
            _a.bind("mouseleave", this, function (_18) {
                clearTimeout(_10);
                if (_b) {
                    _b.fadeOut(299);
                }
                if (_c) {
                    _c.fadeOut(299);
                }
                if (_d) {
                    _d.fadeOut(299);
                }
                _9.fadeOut(300, function () {
                    ctx.fadedOut();
                });
                _18.preventDefault();
            });
            _a.bind("mouseenter", this, function (_19) {
                mx = _19.pageX;
                my = _19.pageY;
                zw = _19.data;
                if (_9) {
                    _9.stop(true, false);
                    _9.remove();
                }
                var _1a = _5.adjustX, _1b = _5.adjustY;
                var siw = _6.outerWidth();
                var sih = _6.outerHeight();
                var w = _5.zoomWidth;
                var h = _5.zoomHeight;
                if (_5.zoomWidth == "auto") {
                    w = siw;
                }
                if (_5.zoomHeight == "auto") {
                    h = sih;
                }
                var _1c = _4.parent();
                switch (_5.position) {
                    case "top":
                        _1b -= h;
                        break;
                    case "right":
                        _1a += siw;
                        break;
                    case "bottom":
                        _1b += sih;
                        break;
                    case "left":
                        _1a -= w;
                        break;
                    case "inside":
                        w = siw;
                        h = sih;
                        break;
                    default:
                        _1c = $("#" + _5.position);
                        if (!_1c.length) {
                            _1c = _4;
                            _1a += siw;
                            _1b += sih;
                        } else {
                            w = _1c.innerWidth();
                            h = _1c.innerHeight();
                        }
                }
                var _1d = (_6.parent().width() - _6.width()) / 2;
                _9 = _1c.append(_1("<div id=\"cloud-zoom-big\" class=\"cloud-zoom-big\" style=\"display:none;position:absolute;left:%0px;top:%1px;width:%2px;height:%3px;background-image:url('%4');z-index:99;\"></div>", _1d, _1b, w, h, _f.src)).find(":last");
                if (_6.attr("title") && _5.showTitle) {
                    _9.append(_1("<div class=\"cloud-zoom-title\">%0</div>", _6.attr("title"))).find(":last").css("opacity", _5.titleOpacity);
                }
                if ($.browser.msie && $.browser.version < 7) {
                    _e = $("<iframe frameborder=\"0\" src=\"#\"></iframe>").css({
                        position: "absolute",
                        left: _1a,
                        top: _1b,
                        zIndex: 99,
                        width: w,
                        height: h
                    }).insertBefore(_9);
                }
                _9.fadeIn(500);
                if (_b) {
                    _b.remove();
                    _b = null;
                }
                cw = (_6.outerWidth() / _f.width) * _9.width();
                ch = (_6.outerHeight() / _f.height) * _9.height();
                _b = _4.append(_1("<div class = 'cloud-zoom-lens' style='display:none;z-index:98;position:absolute;width:%0px;height:%1px;'></div>", cw, ch)).find(":last");
                _a.css("cursor", _b.css("cursor"));
                var _1e = false;
                if (_5.tint) {
                    _b.css("background", "url(\"" + _6.attr("src") + "\")");
                    _c = _4.append(_1("<div style=\"display:none;position:absolute; left:0px; top:0px; width:%0px; height:%1px; background-color:%2;\" />", _6.outerWidth(), _6.outerHeight(), _5.tint)).find(":last");
                    _c.css("opacity", _5.tintOpacity);
                    _1e = true;
                    _c.fadeIn(500);
                }
                if (_5.softFocus) {
                    _b.css("background", "url(\"" + _6.attr("src") + "\")");
                    _d = _4.append(_1("<div style=\"position:absolute;display:none;top:2px; left:2px; width:%0px; height:%1px;\" />", _6.outerWidth() - 2, _6.outerHeight() - 2, _5.tint)).find(":last");
                    _d.css("background", "url(\"" + _6.attr("src") + "\")");
                    _d.css("opacity", 0.5);
                    _1e = true;
                    _d.fadeIn(500);
                }
                if (!_1e) {
                    _b.css("opacity", _5.lensOpacity);
                }
                if (_5.position !== "inside") {
                    _b.fadeIn(500);
                }
                zw.controlLoop();
                return;
            });
        };
        _7 = new Image();
        $(_7).load(function () {
            ctx.init2(this, 0);
        });
        _7.src = _6.attr("src");
        _8 = new Image();
        $(_8).load(function () {
            ctx.init2(this, 1);
        });
        _8.src = _4.attr("href");
    };
    $.fn.CloudZoom = function (_1f) {
        try {
            document.execCommand("BackgroundImageCache", false, true);
        } catch (e) {
        }
        this.each(function () {
            var _20, _21;
            eval("var\ta = {" + $(this).attr("data-zoom") + "}");
            _20 = a;
            if ($(this).is(".cloud-zoom")) {
                $(this).css({"position": "relative", "display": "block"});
                $("img", $(this)).css({"display": "block"});
                if ($(this).parent().attr("id") != "wrap") {
                    $(this).wrap("<div id=\"wrap\" style=\"top:0px;z-index:9999;position:relative;\"></div>");
                }
                _21 = $.extend({}, $.fn.CloudZoom.defaults, _1f);
                _21 = $.extend({}, _21, _20);
                $(this).data("zoom", new _3($(this), _21));
            } else {
                if ($(this).is(".cloud-zoom-gallery")) {
                    _21 = $.extend({}, _20, _1f);
                    $(this).data("relOpts", _21);
                    $(this).bind("click", $(this), function (_22) {
                        var _23 = _22.data.data("relOpts");
                        $("#" + _23.useZoom).data("zoom").destroy();
                        $("#" + _23.useZoom).attr("href", _22.data.attr("href"));
                        $("#" + _23.useZoom + " img").attr("src", _22.data.data("relOpts").smallImage);
                        $("#" + _22.data.data("relOpts").useZoom).CloudZoom();
                        _22.preventDefault();
                    });
                }
            }
        });
        return this;
    };
    $.fn.CloudZoom.defaults = {
        zoomWidth: "auto",
        zoomHeight: "auto",
        position: "right",
        tint: false,
        tintOpacity: 0.5,
        lensOpacity: 0.5,
        softFocus: false,
        smoothMove: 3,
        showTitle: true,
        titleOpacity: 0.5,
        adjustX: 0,
        adjustY: 0
    };
})(jQuery);