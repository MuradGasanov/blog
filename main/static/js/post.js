var App, DEBUG, log, hlog, isMobile;
isMobile = navigator.userAgent.match(/iPod|iPhone|iPad|Android/i);
$(function () {
    if (window.isMobile) {
        $('body').addClass('mobile')
    }
});
log = function () {
    if (DEBUG) {
        console.log.apply(null, arguments)
    }
};
hlog = function () {
    var hlogEL = $('#hlog');
    if (!hlogEL.length) {
        hlogEL = $('<div id="hlog"></div>');
        hlogEL.css({'position': 'absolute', 'left': 0, 'top': 0, 'background': '#fff', 'font-size': 18, 'padding': 15, 'z-index': 1000});
        $('body').append(hlogEL);
    }
    hlogEL.text(Array.prototype.join.call(arguments, ', '));
};
App = {};
App.objects = {};
App.init = function (fn) {
    if (App.objects.Loading) {
        App.loading = new App.objects.Loading();
        App.loading.init(fn);
    } else {
        $(fn);
    }
};
function resizeBackground(container, image, imgWidth, imgHeight) {
    var win = container, winWidth = win.width(), winHeight = win.height(), aspectRatio = winWidth / winHeight;
    imgAspectRatio = imgWidth / imgHeight;
    if (aspectRatio < imgAspectRatio) {
        image.removeClass('full-width').addClass('full-height');
    } else if (aspectRatio > imgAspectRatio) {
        image.removeClass('full-height').addClass('full-width');
    }
}
App.preloadImage = function (url, complete) {
    if (App.preloadImage.cache[url]) {
        complete.call(null);
        return;
    }
    var img = new Image();
    img.onload = function () {
        complete.call(null);
        App.preloadImage.cache[url] = true;
    };
    img.onerror = function () {
        complete.call(null);
    }
    img.src = url;
};
App.preloadImage.cache = {};
App.preloadImages = function (urls, complete, i) {
    if (!urls || urls.length === 0) {
        complete.call(this, i);
        return;
    }
    i = i || 0;
    var url = urls[i];
    if (!url) {
        complete.call(this, i);
        return;
    }
    App.preloadImage(urls[i], function () {
        App.preloadImages(urls, complete, i + 1);
    });
};
App.preloadImagesFromSelector = function (el, complete) {
    var images = $.map(el.find('img'), function (item, index) {
        return $(item).attr('src');
    });
    App.preloadImages(images, complete);
};
App.pageTitle = function (title) {
    if (title) {
        $('title').text(title);
    } else {
        return $('title').text();
    }
}
App.objects.MediaQuery = nova.Class({implement: [EventListener], initialize: function (sizes) {
    this.win = $(window);
    this.body = $('body');
    this.sizes = arguments;
    this.resize();
    this.events(['resize', 'win', 'resize']);
}, resize: function () {
    var i = 0, l = this.sizes.length, size;
    for (; i < l; i++) {
        size = this.sizes[i];
        if (this.win.width() <= size && !this.body.hasClass('lt-' + size)) {
            this.body.addClass('lt-' + size);
        } else if (this.win.width() > size && this.body.hasClass('lt-' + size)) {
            this.body.removeClass('lt-' + size);
        }
    }
    ;
}});
function scrollTo(value, complete, duration) {
    $.when($('html, body').stop().animate({'scrollTop': value}, duration ? duration : 500)).done(complete);
}
function renderPlusone() {
    var buttons = $('.plusone');
    buttons.each(function () {
        gapi.plusone.render(this, {lang: 'pt-BR', size: 'medium', annotation: 'none'});
    });
}
function renderFacebookLike() {
    FB.XFBML.parse();
}
function renderTwitterButton() {
    $.getScript('//platform.twitter.com/widgets.js');
}
function trackUrl(url) {
    if (window._gaq) {
        _gaq.push(['_trackPageview', url]);
    }
}
//function trackEvents() {
//    if (window._gaq) {
//        $('body').on('click', '.ga-track', function () {
//            var cat = $(this).data('ga-cat'), ev = $(this).data('ga-event');
//            _gaq.push(['_trackEvent', cat, ev, window.__ARTIST_NAME__]);
//        });
//    }
//}
(function ($) {
    var scrollbarWidth = 0;
    $.getScrollbarWidth = function () {
        if (!scrollbarWidth) {
            if ($.browser.msie) {
                var $textarea1 = $('<textarea cols="10" rows="2"></textarea>').css({position: 'absolute', top: -1000, left: -1000}).appendTo('body'), $textarea2 = $('<textarea cols="10" rows="2" style="overflow: hidden;"></textarea>').css({position: 'absolute', top: -1000, left: -1000}).appendTo('body');
                scrollbarWidth = $textarea1.width() - $textarea2.width();
                $textarea1.add($textarea2).remove();
            } else {
                var $div = $('<div />').css({width: 100, height: 100, overflow: 'auto', position: 'absolute', top: -1000, left: -1000}).prependTo('body').append('<div />').find('div').css({width: '100%', height: 200});
                scrollbarWidth = 100 - $div.width();
                $div.parent().remove();
            }
        }
        return scrollbarWidth;
    };
})(jQuery);
App.objects.MouseWheelScroll = nova.Class({initialize: function () {
    this.win = $(window);
    this.pages = $('.section-page');
    this.delayTimer = null;
    this.enable();
}, onMouseWheel: function (event, delta) {
    var target = $(event.target), isArtistas, heightDiff, top, top2, scrollTop;
    if (!target.hasClass('section-page')) {
        target = target.parents('.section-page');
    }
    isArtistas = target.is('#page-artistas');
    heightDiff = $('#page-artistas').innerHeight() - this.win.height();
    top = $('#page-artistas').offset().top + heightDiff + 100;
    top2 = $('#page-artistas').offset().top - 100;
    scrollTop = this.win.scrollTop();
    if (delta < 0 && target.is('#page-contato')) {
        return;
    }
    if (!isArtistas) {
        event.preventDefault();
        if (delta < 0) {
            this.next(target);
        } else {
            this.prev(target);
        }
    } else if (isArtistas) {
        if (heightDiff < 0 || (delta < 0 && scrollTop >= top) || (delta > 0 && scrollTop <= top2)) {
            event.preventDefault();
            if (delta < 0) {
                this.next(target);
            } else {
                this.prev(target);
            }
        }
    }
}, delay: function (callback, time) {
    clearInterval(this.delayTimer);
    this.delayTimer = setTimeout(callback, time || 200);
}, next: function (el) {
    this.delay(function () {
        var target, top;
        target = el.nextAll('.section-page').eq(0);
        if (target.length) {
            top = target.offset().top - 64;
            scrollTo(top);
        }
    });
}, prev: function (el) {
    this.delay(function () {
        var target, top;
        target = el.prevAll('.section-page').eq(0);
        if (target.length) {
            top = target.offset().top - 64;
            scrollTo(top);
        }
    });
}, enable: function () {
    this.win.on('mousewheel', $.proxy(this.onMouseWheel, this));
}, disable: function () {
    this.win.off('mousewheel', $.proxy(this.onMouseWheel, this));
}});
(function ($) {
    $.fn.offsetRelative = function (top) {
        var $this = $(this);
        var $parent = $this.offsetParent();
        var offset = $this.position();
        if (!top)return offset; else if ($parent.get(0).tagName == "BODY")return offset; else if ($(top, $parent).length)return offset; else if ($parent[0] == $(top)[0])return offset; else {
            var parent_offset = $parent.offsetRelative(top);
            offset.top += parent_offset.top;
            offset.left += parent_offset.left;
            return offset;
        }
    };
    $.fn.positionRelative = function (top) {
        return $(this).offsetRelative(top);
    };
}(jQuery));
App.objects.Posts = nova.Class({initialize: function () {
    this.el = $('.posts');
    this.loading = $('.load-more');
    this.loadMoreButton = $('.load-more a');
    this.searchForm = $('.search-form');
    this.categorySelect = $('.category-filter');
    this.categorySelect.prop('selectedIndex', 0).SelectSkin('update');
    this.firstLoaled = false;
    this.initIsotope();
    this.initLoadMore();
    this.initScrollBottom();
    this.loadMoreButton.on('click', $.proxy(this.loadHandler, this));
    this.categorySelect.on('change', $.proxy(this.filterCategoryHandler, this));
    this.searchForm.on('submit', $.proxy(this.searchPostsHanlder, this));
    $('.blog-container').on('click', '.tag-link', $.proxy(this.searchTagHandler, this));
    if (!$('body').hasClass('post-detail-page') && !this.firstLoaled) {
        this.firstLoaled = true;
        this.load();
    }
}, initIsotope: function () {
    var that = this;
    that.el.isotope({itemSelector: '.post', visibleStyle: {opacity: 1, scale: 1}, masonry: {columnWidth: 310}, onLayout: function ($elems, instance) {
    }, onBeforeRelayout: function (values) {
    }});
}, initLoadMore: function () {
    var that = this;
    that.el.loadmore({url: window.__URL_LIST__, pageNumber: 1, autoAppend: false, onBeforeAppend: function (fragment) {
        var ul = fragment.find('ul'), html = $(ul.html()), maxPages = ul.attr('data-max-pages');
        that.el.loadmore('setOptions', {maxPages: maxPages});
        html.imagesLoaded(function () {
            that.el.isotope('insert', html);
        });
    }, onBeforeLoad: function () {
        that.showLoading();
    }, onAfterPageIncrement: function () {
        that.hideLoading();
    }, onError: function (jqXHR) {
        alert('Error - ' + jqXHR.statusText + ': ' + jqXHR.status);
    }, onEndPages: function () {
        that.hideLoading();
    }});
}, initScrollBottom: function () {
    var that = this;
    $(window).scrollBottom({offsetY: -330, callback: function (event, obj) {
        if (obj.direction == 'bottom' && that.el.is(':visible')) {
            that.load();
        }
    }});
}, fadePosts: function (complete) {
    $.when(this.el.fadeTo(600, 0)).done(complete);
}, hidePosts: function () {
    this.el.hide();
    this.loading.hide();
}, showPosts: function (complete) {
    $.when(this.el.fadeTo(600, 1)).done(complete);
    if (!this.firstLoaled) {
        this.load();
        this.firstLoaled = true;
    }
}, showLoading: function () {
    this.loading.show();
}, hideLoading: function () {
    this.loading.hide();
}, filterCategoryHandler: function (event) {
    var that = this, el = $(event.currentTarget), cat = el.val();
    if (this.el.is(':visible')) {
        this.filterCategory(cat);
    } else {
        App.blogUrls.navigate('/');
        App.postDetail.close(function () {
            that.filterCategory(cat);
        });
    }
}, filterCategory: function (cat) {
    this.el.loadmore("setOptions", {extraVars: {'category': cat}, pageNumber: 1});
    this.empty();
    this.load();
}, searchPostsHanlder: function (event) {
    event.preventDefault();
    var that = this, q = $('#query').val(), cat = this.categorySelect.val();
    if (q && cat) {
        if (this.el.is(':visible')) {
            this.searchPosts(cat, q);
        } else {
            App.blogUrls.navigate('/');
            App.postDetail.close(function () {
                that.searchPosts(cat, q);
            });
        }
    }
}, searchPosts: function (cat, query) {
    this.el.loadmore("setOptions", {extraVars: {'q': query, 'category': cat}, pageNumber: 1});
    this.empty();
    this.load();
}, loadHandler: function (event) {
    event.preventDefault();
    this.load();
}, searchTagHandler: function (event) {
    event.preventDefault();
    var that = this, el = $(event.currentTarget), tag = el.data('tag');
    if (tag) {
        if (this.el.is(':visible')) {
            this.searchTag(tag);
        } else {
            App.blogUrls.navigate('/');
            App.postDetail.close(function () {
                that.searchTag(tag);
            });
        }
    }
}, searchTag: function (tag) {
    this.el.loadmore("setOptions", {extraVars: {'tag': tag, }, pageNumber: 1});
    this.empty();
    this.load();
}, load: function () {
    this.el.loadmore("load");
}, empty: function () {
    this.el.isotope('remove', this.el.find('.post'));
}});
App.objects.PostDetail = nova.Class({initialize: function () {
    this.el = $('.post-detail');
    this.renderSocialButtons();
    this.initPlugins();
}, setPrevNextPosts: function (prev, next) {
    if (prev) {
        $('.blog-nav .prev').removeClass('disabled');
        $('.blog-nav .prev a').attr('href', prev);
    } else {
        $('.blog-nav .prev').addClass('disabled');
    }
    if (next) {
        $('.blog-nav .next').removeClass('disabled');
        $('.blog-nav .next a').attr('href', next);
    } else {
        $('.blog-nav .next').addClass('disabled');
    }
}, scrollToTop: function (complete) {
    scrollTo(0, complete);
}, renderSocialButtons: function () {
//    renderPlusone();
//    renderFacebookLike();
//    renderTwitterButton();
}, showNav: function () {
    $('.blog-nav').fadeIn();
}, hideNav: function () {
    $('.blog-nav').fadeOut();
}, showBackButton: function () {
    $('.back-button').fadeIn();
}, hideBackButton: function () {
    $('.back-button').fadeOut();
}, showLoading: function () {
    $('.post-loading').stop().fadeIn();
}, hideLoading: function () {
    $('.post-loading').stop().fadeOut();
}, showPost: function (complete) {
    this.el.animate({'left': '50%', 'opacity': 1}, 600, complete);
}, hidePost: function (complete) {
    var that = this;
    that.hideNav();
    that.hideBackButton();
    that.el.addClass('pre-show');
    that.el.fadeOut(function () {
        that.el.remove();
        if (complete) {
            complete();
        }
    });
}, getURL: function (slug) {
    return window.__BLOG_POST_URL__ + slug + '/';
}, loadContent: function (url, complete) {
    var that = this;
    trackUrl(url);
    $.ajax({url: url, success: function (data) {
        var html = $(data), postContent = $('.post-detail', html);
        App.preloadImagesFromSelector(postContent, function () {
            if (complete) {
                complete(postContent)
            }
        });
    }})
}, whenContentLoad: function (postContent) {
    var that = this, prev = postContent.attr('data-prev-post'), next = postContent.attr('data-next-post');
    that.el = postContent;
    that.el.addClass('pre-show');
    $('.blog-title').after(that.el);
    that.el.height(that.el.innerHeight());
    that.scrollToTop(function () {
        App.posts.fadePosts();
        that.showPost(function () {
            that.showNav();
            that.showBackButton();
            that.renderSocialButtons();
            $('.post-detail').not(that.el).remove();
            that.el.removeClass('pre-show').css('height', 'auto');
            App.posts.hidePosts();
            that.initPlugins();
        });
    }, 1000);
    that.setPrevNextPosts(prev, next);
}, initPlugins: function () {
    $('.image-list a').fancybox();
}, open: function (slug) {
    var that = this, url = that.getURL(slug);
    that.showLoading();
    that.loadContent(url, function (postContent) {
        that.hideLoading();
        that.whenContentLoad(postContent);
    });
}, close: function (complete) {
    var that = this;
    App.pageTitle(window.__PAGE_TITLE__);
    that.hidePost();
    App.posts.showPosts(complete);
}});
App.objects.BlogUrls = Backbone.Router.extend({initialize: function () {
    var that = this;
    $('body').on('click', '.bb-url', function (event) {
        event.preventDefault();
        var url = $(event.currentTarget).attr('href');
        url = url.replace('/blog', '');
        that.navigate(url, {trigger: true});
    });
    this.route(/^[\/]?$/, 'index', this.home);
}, routes: {"post/:slug/": "post"}, home: function () {
    App.postDetail.close();
}, post: function (slug) {
    if (slug) {
        App.postDetail.open(slug);
    }
}});

App.init(function () {
    window.__PAGE_TITLE__ = 'Blog';
    App.posts = new App.objects.Posts();
    App.postDetail = new App.objects.PostDetail();
    App.blogUrls = new App.objects.BlogUrls();
    var validHashURL = location.hash && location.hash.match(/post/), startSilent = !($.browser.msie & $.browser.version < 10 && validHashURL);
    Backbone.history.start({root: window.__BLOG_URL__, pushState: true, silent: startSilent});
});
