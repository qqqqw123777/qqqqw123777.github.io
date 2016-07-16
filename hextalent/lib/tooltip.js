(function ($) {
    $(document).ready(function () {

        //add css
        var link = $("<link>"), setTimeoutConst;
        link.attr({
            type: 'text/css',
            rel: 'stylesheet',
            href: 'http://hex.tcgbrowser.com/tools/tooltips/tooltip.css'
        });
        $("head").append(link);

        //bind hover on card-link
        $(document).on({
            mouseenter: function (e) {
                setTimeoutConst = setTimeout(function(){
                    tooltip.open(e)
                }, 200);
            },
            mouseleave: function (e) {
                clearTimeout(setTimeoutConst );
                tooltip.close(e)
            }
        }, 'a[href*="hex.tcgbrowser.com/card"]');
    });

    var tooltip = {
        open: function (e) {
            var name = e.target.href.match(/(http:\/\/hex.tcgbrowser.com\/card\/)(.+)/)[2],
                host = "http://storage.hex.tcgbrowser.com/big/";

            tooltip.show(336, e);
            $.getJSON('http://hex.tcgbrowser.com/tools/tooltips/cardbyname.php?name=' + name + '&callback=?',
                function (data) {
                    if (data.image) {
                        $('#hextcg-tooltip-content').html('<img src="' + host + data.guid + '.jpg">');
                    }
                    //we have equip
                    else if(data.cardimage){
                        var color = data.rarity == 'c' ? 'white' :
                            data.rarity == 'u' ? '#4FAC2C' :
                                data.rarity == 'r' ? 'rgb(54, 134, 236)' :
                                    data.rarity == 'l' ? '#D54033' :
                                        data.rarity == 'g' ? 'grey' :
                                            data.rarity == 'e' ? '#D18A3C' :
                                                data.rarity == 'p' ? 'orange' : '';
                        tooltip.show(600, e);
                        $('#hextcg-tooltip-content').html(
                            '<img src="' + host + data.cardguid + '.jpg">' +
                            '<div id="hextcg-tooltip-equip">' +
                                '<div class="name" style="color: ' +color +'">' + data.name + '</div>' +
                                '<div class="slot">' + data.slot + '</div>' +
                                '<div class="text">' + data.text + '</div>' +
                            '</div>').css({width: 600})
                    }
                });
        },
        show: function (size, e) {
            $('#hextcg-tooltip').remove();
            $('body').append('<div id="hextcg-tooltip" class="card-tooltip"><div id="hextcg-tooltip-content"></div></div>');

            var position = {
                left: function () {
                    if (e.pageX > ($('body').width()) / 2) {
                        return e.pageX - size - 50
                    } else {
                        return e.pageX + 30
                    }
                },
                top: e.pageY + 30
            };

            $('#hextcg-tooltip').css({left: position.left, top: position.top}).stop(true, true).fadeIn(400);
            var height = 450,
                offsetTop = $('#hextcg-tooltip').offset().top,
                scrolltop = $(window).scrollTop(),
                windowHeight = window.innerHeight,
                yPos = height + offsetTop - scrolltop - windowHeight;
            if (yPos > -30) {
                $('#hextcg-tooltip').css({top: e.pageY - Math.max(0, yPos) - 20})
            }
        },
        close: function () {
            $('.card-tooltip').remove();
        }
    };
}(jQuery));