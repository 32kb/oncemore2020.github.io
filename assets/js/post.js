$(document).ready(function(){

    $('.entry-content a').each(function(index, element) {
        var href = $(this).attr('href');
        if (href) {
            if (href.indexOf('#') == 0) {
            } else if (href.indexOf('/') == 0 || href.toLowerCase().indexOf('oncemore2020.github.io') > -1) {
            } else if ($(element).has('img').length) {
            } else {
                $(this).attr('target', '_blank');
                $(this).addClass('external');
            }
        }
    });

    (function() {
        var ie6_8 = !$.support.leadingWhitespace;

        function initHeading() {
            var h2 = [];
            var h3 = [];
            var h2index = 0;

            $.each($('.entry-content h1, .entry-content h2'), function(index, item) {
                if (item.tagName.toLowerCase() == 'h1') {
                    var h2item = {};
                    h2item.name = $(item).text();
                    h2item.id = 'menuIndex' + index;
                    h2.push(h2item);
                    h2index++;
                } else {
                    if (h2index == 0) {
                        var h2item = {};
                        h2item.name = '目录';
                        h2item.id = '';
                        h2.push(h2item);
                        h2index++;
                    }
                    var h3item = {};
                    h3item.name = $(item).text();
                    h3item.id = 'menuIndex' + index;
                    if (!h3[h2index-1]) {
                        h3[h2index-1] = [];
                    }
                    h3[h2index-1].push(h3item);
                }
                item.id = 'menuIndex' + index;
            });

            // add back to top
            h2.push({name: '回到顶部', id: 'top'});

            return {h2:h2, h3:h3}
        }

        function genMenuIndexHTML() {
            var menuIndexHTML = '<ul>';

            var heading = initHeading();
            var h2 = heading.h2;
            var h3 = heading.h3;

            for (var i = 0; i < h2.length; i++) {
                menuIndexHTML += '<li class="h2"><a href="#" data-id="' + h2[i].id + '">' + h2[i].name + '</a></li>';

                if (h3[i]) {
                    for (var j = 0; j < h3[i].length; j++) {
                        menuIndexHTML += '<li class="h3"><a href="#" data-id="'+ h3[i][j].id + '">' + h3[i][j].name + '</a></li>';
                    }
                }
            }
            menuIndexHTML += '</ul>';

            return menuIndexHTML;
        }

        function genIndex() {
            var menuIndexHTML = genMenuIndexHTML();
            var indexCon = '<div id="menuIndex" class="side-nav"></div>';
            $('#art').append(indexCon);

            $('#menuIndex')
                .append($(menuIndexHTML))
                .delegate('a', 'click', function(e) {
                    e.preventDefault();

                    var selector = $(this).attr('data-id') ? '#' + $(this).attr('data-id') : 'h1';
                    var scrollNum = (selector == '#top') ? 0 : $(selector).offset().top - 30;

                    $('body, html').animate({scrollTop: scrollNum}, 400, 'swing');
                });
        }

        var waitForFinalEvent = (function () {
            var timers = {};
            return function (callback, ms, uniqueId) {
                if (!uniqueId) {
                    uniqueId = "Don't call this twice without a uniqueId";
                }
                if (timers[uniqueId]) {
                    clearTimeout (timers[uniqueId]);
                }
                timers[uniqueId] = setTimeout(callback, ms);
            };
        })();

        if(($('.entry-content h2').length > 1 || $('.entry-content h3').length > 2) && !ie6_8) {

            genIndex();

            $(window).load(function() {
                var scrollTop = [];
                $.each($('#menuIndex li a'), function(index, item) {
                    var selector = $(item).attr('data-id') ? '#' + $(item).attr('data-id') : 'h1';
                    if (selector != '#top') {
                        var top = $(selector).offset().top;
                        scrollTop.push(top);
                    }
                });

                var menuIndexTop = $('#menuIndex').offset().top;

                $(window).scroll(function() {
                    waitForFinalEvent(function() {
                        var nowTop = $(window).scrollTop();
                        var length = scrollTop.length;
                        var index;

                        if (nowTop + 20 > menuIndexTop) {
                            $('#menuIndex').css({
                                position:'fixed',
                                top:'25px',
                                right:'5px'
                            });
                        } else {
                            $('#menuIndex').css({
                                position:'static',
                                top:0,
                            });
                        }

                        if (nowTop + 60 > scrollTop[length-1]) {
                            index = length;
                        } else {
                            for (var i = 0; i < length; i++) {
                                if (nowTop + 60 <= scrollTop[i]) {
                                    index = i;
                                    break;
                                }
                            }
                        }

                        if (index > 0) {
                            $('#menuIndex li').removeClass('on');
                            $('#menuIndex li').eq(index-1).addClass('on');
                        }
                    });
                });

                $(window).resize(function() {
                    $('#menuIndex').css({
                        position:'static',
                        top:0,
                        left:0
                    });

                    menuIndexTop = $('#menuIndex').offset().top;

                    $(window).trigger('scroll');
                    $('#menuIndex').css('max-height', $(window).height() - 80);
                });
            })

            //用js计算屏幕的高度
            $('#menuIndex').css('max-height', $(window).height() - 80);
        }
    })();
});
