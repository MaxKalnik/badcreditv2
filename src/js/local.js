$(document).ready(function () {
    var body = $('body');

    function topMenu() {
        if ($(window).width() < 959) {

            body.on('click', '.top-menu__link.active', function () {
                $(this).parents('.top-menu__wrap').toggleClass('open');
                return false
            });
        }
    };

    topMenu();
    $(window).on('resize', function () {
        topMenu();
    });

    body.on('mouseover', '.loan__coins', function () {
        $(this).siblings('.loan__rate-tooltip').addClass('loan__rate-tooltip--visible');
    });

    body.on('mouseleave', '.loan__coins', function () {
        $(this).siblings('.loan__rate-tooltip').removeClass('loan__rate-tooltip--visible');
    });

    body.on('click', '.ranking-table__hint', function () {
        $(this).css('display', 'none');
    });


    body.on('click', '.table-sort', function () {
        var $rows = $('.ranking-table--data tr').splice(1);
        var $index = $(this).data('index');

        var descend = true;

        if ($(this).hasClass('table-sort--down')) {
            $('.table-sort').removeClass('table-sort--down table-sort--top');
            descend = false;
            $(this).addClass('table-sort--top')
        } else {
            $('.table-sort').removeClass('table-sort--down table-sort--top');
            $(this).addClass('table-sort--down');
        }

        var parseFloatText = function (item) {
            return parseFloat(item);
        };

        var sortFunc = function (a, b) {
            var left = $(a).find('td')[$index];
            left = $(left).text();
            if (parseFloatText(left)) {
                left = parseFloatText(left);
            } else if (left.includes('$')) {
                left = parseFloatText(left.split('$')[1]);
            }
            var right = $(b).find('td')[$index];
            right = $(right).text();
            if (parseFloatText(right)) {
                right = parseFloatText(right);
            } else if (right.includes('$')) {
                right = parseFloatText(right.split('$')[1]);
            }
            if (descend) {
                if (left > right) {
                    return 1
                } else {
                    return -1;
                }

            } else {
                if (left < right) {
                    return 1
                } else {
                    return -1;
                }
            }
        }

        $rows.sort(sortFunc);

        var $mobileRows = $('.ranking-table--fixed tr').splice(1);
        for (var i = 0; i < $mobileRows.length; i++) {
            $($mobileRows[i]).find('td').first().text($($rows[i]).find('td').first().text());
        }
        $('.ranking-table--data tbody').html($rows);
    });
    var loanRates = $('.loan__rates');
    var onScrollCoins = function () {
        var loanContent = $('.loan__content');
        if (loanRates && $(window).scrollTop() > loanContent.offset().top) {
            loanRates.css('opacity', '1');
            $(document).off('scroll', onScrollCoins);
        }
    };
    if (loanRates.length > 0) {
        $(document).on('scroll', onScrollCoins);
    }
});