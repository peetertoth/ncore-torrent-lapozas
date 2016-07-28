// ==UserScript==
// @name         ncore-torrent-lapozas
// @namespace    peetftp.ddns.net
// @version      1.0
// @description  torrent oldalon lehet billentyűkkel lapozni (,.-) leírás: https://github.com/peetertoth/ncore-torrent-lapozas/blob/master/README.md
// @author       kyle
// @match        https://ncore.cc/torrents.php*
// @grant        none
// @require      https://code.jquery.com/ui/1.11.4/jquery-ui.js
// @updateURL    https://raw.githubusercontent.com/peetertoth/ncore-torrent-lapozas/master/ncore-torrent-lapozas.user.js
// @downloadURL  https://raw.githubusercontent.com/peetertoth/ncore-torrent-lapozas/master/ncore-torrent-lapozas.user.js
// ==/UserScript==

var bgc;
var index = 0;
var len;
var isOpen = false;
var b_open = false;
var anim_len = 500;

$(document).ready(function() {
    var currentBox = $('.box_torrent').first();

    bgc = currentBox.css("background-color");
    len = $('.box_torrent').length;

    currentBox.css("background-color", "#ffd700");

    var key_esc = $.Event("keydown", { keyCode: 27 });
    var key_left = $.Event("keydown", { keyCode: 37 });
    var key_right = $.Event("keydown", { keyCode: 39 });

    var leptet = function(elore) {
        //var curr_open_0 = currentBox.next().next().css("display") == "block";
        //open = curr_open_0;

        if (open) {
            currentBox.children().find('a').eq(1).click();
        }
        if (b_open) {
            currentBox.children().find('.infobar > img').trigger('onmouseout');
        }

        //currentBox.css("background-color", bgc);
        currentBox.animate({backgroundColor: bgc}, anim_len );

        if (elore) {
            if (index == len - 1)
                index = 0;
            else
                index++;
        } else {
            if (index === 0)
                index = len - 1;
            else
                index--;
        }

        currentBox = $('.box_torrent').eq(index);

        var curr_open_1 = currentBox.next().next().css("display") == "block";
        //open = curr_open_1;

        if (open && !curr_open_1) {
            currentBox.children().find('a').eq(1).click();
        }
        if (b_open) {
            currentBox.children().find('.infobar > img').trigger('onmouseover');
        }

        //setTimeout(function() {currentBox.css("background-color", "gold");}, 200);
        currentBox.animate({backgroundColor: "#ffd700" }, anim_len );

        if (!checkVisible() || open) {
            $(document).scrollTop(currentBox.offset().top);
        }
    };

    var checkVisible = function() {
        var a0 = window.scrollY;
        var a1 = window.innerHeight + a0;
        var b0 = currentBox.offset().top;
        var b1 = currentBox.height() + b0;

        if (b0 >= a0 && b1 <= a1) {
            return true;
        } else {
            return false;
        }
    };

    $(document).keypress(function(e) {
        if (e.target.tagName == "INPUT")
            return;
        switch(e.which) {
            case 44:
                //vissza: ','
                //vissza();
                leptet(false);
                break;
            case 45:
                //előre: '-'
                //elore();
                leptet(true);
                break;
            case 46:
                //nyit-zár: '.'
                var foo = currentBox.children().find('a').eq(1);
                foo.click();
                $(document).scrollTop(currentBox.offset().top);

                isOpen = !isOpen;

                break;
            case 108:
                //borító megjelenítés/elrejtés: 'l'
                if (b_open) {
                    currentBox.children().find('.infobar > img').trigger('onmouseout');
                } else {
                    currentBox.children().find('.infobar > img').trigger('onmouseover');
                }
                b_open = !b_open;
                break;
            case 233:
                //kép megnyitás: 'é'
                var bar = currentBox.nextAll().find('.torrent_lenyilo_tartalom').first();
                bar.children().find('a').first().click();
                break;
            case 225:
                //ESC szimulálása: 'á'
                $('#fancybox-overlay').trigger(key_esc);
                //console.log('SAJT');
                break;
            case 337:
                //bal nyíl szim: 'ő'
                 $('#fancybox-overlay').trigger(key_left);
                break;
            case 250:
                //jobb nyíl szim: 'ú'
                 $('#fancybox-overlay').trigger(key_right);
                break;
            case 104:
                //h karakter = HOME
                window.location.href="https://ncore.cc/torrents.php";
                break;
            default:
                console.log(e.which);
                //console.log(checkVisible());
                break;
        }
    });

});