// ==UserScript==
// @name            iconfont图标颜色编辑
// @author          辣条要甜点
// @namespace       https://github.com/327100395/iconfont/raw/master/iconfont.js
// @description     阿里iconfont多色图标颜色编辑
// @license         WTFPl
// @version         1
// @include         *iconfont.cn*
// @run-at          document-end
// @updateURL       https://github.com/327100395/iconfont/raw/master/iconfont.js
// @grant           none
// ==/UserScript==

(function () {
    'use strict';
    var colorData;

    $('body').on('click', '.icon-xiazai', function (event) {
        var t = window.setInterval(function () {
            if ($('#dlg_106').length < 0) return;
            window.clearInterval(t);
            colorData = {};
            $('.J_stage > svg').attr('data-init-out', '1');
            //添加颜色input
            var colorInput = '<div class="manage-mid-wrap new-manage" style="width:900px;position: absolute;left:0;top:72px;margin: 0;display: block;padding-left: 0px;padding-top: 4px;" >';
            $('.J_stage > svg').find('[fill]').each(function (i, item) {
                var color = $(item).attr('fill');
                var p_id = $(item).attr('p-id');
                var opacity = $(item).attr('opacity');
                opacity = opacity ? opacity : '';
                var key = color + 'a' + opacity.replace(/\./g, 'b');
                if (colorData.hasOwnProperty(key)) {
                    colorData[key].push(p_id);
                    return;
                }
                colorData[key] = [p_id];
                colorInput += '<span class="color-picker-wrap new-picker" data-color-key="' + key + '">'
                    + '<input class="input pick-input new-pick-input" value="' + color.substr(1, color.length - 1) + '" type="text"/>'
                    + '<span class="color-picker-item new-picker-item" style="background:' + color + ';border:1px solid #000;"></span>'
                    + '</span>';
            });
            colorInput += '</div>';
            $('.statge-manage').append($(colorInput));
            $('#J_color_pick_icon').parent().append('<span id="J_color_pick_icon1" class="color-picker-item" style="opacity: 0;-webkit-opacity: 0;-moz-opacity: 0;-khtml-opacity:0;filter:alpha(opacity=0);-ms-filter:\'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\';filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=0);" data-spm-anchor-id="a313x.7781069.0.i4"></span>');
        }, 400);
    });

    $('body').on('click', '.container-reload', function () {
        var t = window.setInterval(function () {
            if ($('.J_stage > svg').attr('data-init-out') == '1') return;
            window.clearInterval(t);
            colorData = {};
            $('.new-manage').html('');
            $('.J_stage > svg').attr('data-init-out', '1');
            $('.J_stage > svg').find('[fill]').each(function (i, item) {
                var color = $(item).attr('fill');
                var p_id = $(item).attr('p-id');
                var opacity = $(item).attr('opacity');
                opacity = opacity ? opacity : '';
                var key = color + 'a' + opacity.replace(/\./g, 'b');
                if (colorData.hasOwnProperty(key)) {
                    colorData[key].push(p_id);
                    return;
                }
                colorData[key] = [p_id];
                $('.new-manage').append($('<span class="color-picker-wrap new-picker" data-color-key="' + key + '">'
                    + '<input class="input pick-input new-pick-input" value="' + color.substr(1, color.length - 1) + '" type="text"/>'
                    + '<span class="color-picker-item new-picker-item" style="background:' + color + ';border:1px solid #000;"></span>'
                    + '</span>'));
            });

        });
    });

    var button = null;
    $('body').on('click', '.new-picker-item', function (event) {
        button = $(this);
        $('#J_color_pick_icon').click();
        $('#cp_J_color_pick_icon').css('top', $(this).offset().top - 336).css('left', $(this).offset().left - 5);
        $('.mp-13c-foot-btn').attr('mx-click', '');
    });

    $('body').on('click', '#J_color_pick_icon1', function () {
        $('.mp-13c-foot-btn').attr('mx-click', 'enter();');
        $('#J_color_pick_icon').click();
    });

    var setSvgColor = function (pids, color) {
        $.each(pids, function (i, pid) {
            $('.J_stage > svg').find('[p-id=' + pid + ']').attr('fill', color);
        });
    }

    $('body').on('click', '.mp-13c-foot-btn', function () {
        if ($(this).attr('mx-click') == '' && button.length >= 0) {
            var color = $(this).parent().find('#val_cp_J_color_pick_icon').val();
            button.parent().find('.new-picker-item').css('background', color);
            button.parent().find('.new-pick-input').val(color.substr(1, color.length - 1));
            var data = colorData[button.parent().attr('data-color-key')];
            setSvgColor(data, color);
            $('#cp_J_color_pick_icon').css('display', 'none');
        }
    });

    var changeColor = function () {
        var parent = $(this).parent();
        var color = '#' + $(this).val();
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            parent.find('.new-picker-item').css('background', color);
            var data = colorData[parent.attr('data-color-key')];
            setSvgColor(data, color);
        }
    }

    $('body').on('focusout', '.new-pick-input', changeColor);
    $('body').on('keydown', '.new-pick-input', changeColor);

})();
