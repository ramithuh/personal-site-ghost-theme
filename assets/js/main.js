var html = $('html');
var body = $('body');
var timeout;
var st = 0;
var lastSt = 0;
var titleOffset = 0;
var contentOffset = 0;
var progress = $('.sticky-progress');

window.Widgets = {}

Widgets.mediumFeeds = {

    resultsLoader: '*[data-scope="medium-feed"]:first',

    checkURL: function(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    },

    mediumUrl: function() {
        return 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ramith'; //Your profile
    },

    fetch: function() {
        return $.ajax({
            url: Widgets.mediumFeeds.mediumUrl(),
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                Widgets.mediumFeeds.proccessResponse(data);
            },
            error: function(error) {
                var resultsLoader, ul;
                resultsLoader = $(Widgets.mediumFeeds.resultsLoader);
                resultsLoader.html('<ul class="list-posts" style="text-align: center;font-size: 0;"></ul>');
                ul = resultsLoader.find('ul:first');
                return ul.append(Widgets.mediumFeeds.failureMsg());
            },
            complete: function() {
                setTimeout(function(){
 $(Widgets.mediumFeeds.resultsLoader).removeClass('loading-content');
                }, 1000);
            }
        });
    },

    proccessResponse: function(data) {

        var results, resultsLoader, ul,
            listPosts = data.items;
      

        resultsLoader = $(Widgets.mediumFeeds.resultsLoader);
        resultsLoader.html("<ul class='list-posts' style='text-align: center;font-size: 0;'></ul>");
        ul = resultsLoader.find('ul:first');

        var post_count = 0;
        if (data.status = 'ok') {
            results = [];

            for (i in listPosts) {

                var post = listPosts[i];
                if((post.categories.length > 0)  && post_count < 4){
                    post_count+=1;
                    results.push(ul.append(Widgets.mediumFeeds.buildEntryHTML(post)));
                }
            }

            return results;
        } else {
            return ul.append(Widgets.mediumFeeds.failureMsg());
        }
    },

    failureMsg: function() {
        return '<li class="empty">Ocorreu um erro ao carregar o conteúdo.</li>';
    },

    buildEntryHTML: function(post) {
        var html;
       

        var x = "https://research.the-ai.team/" + post.link.slice(31,-1);
        var cover = post.thumbnail;

        if(!this.checkURL(cover)){
            cover = "/assets/images/cover.png";
        }else{
            cover = cover.replace("1024", "400");
        }

        return html = '<li><a href="'+ x +'" target="_blank">\
          <div class="post-image" style="background-image: url('+ cover  +');"></div>\
          <div class="post-content">\
            <h1>'+ post.title +'</h1>\
          </div>\
        </a></li>';
    }
};
Widgets.svbtleFeeds = {

    resultsLoader: '*[data-scope="svbtle-feed"]:first',

    checkURL: function(url) {
        return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
    },

    svbtleUrl: function() {
        return 'https://api.rss2json.com/v1/api.json?rss_url=https://ramith.svbtle.com/feed '; //Your profile
    },

    fetch: function() {
        return $.ajax({
            url: Widgets.svbtleFeeds.svbtleUrl(),
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                Widgets.svbtleFeeds.proccessResponse(data);
            },
            error: function(error) {
                var resultsLoader, ul;
                resultsLoader = $(Widgets.svbtleFeeds.resultsLoader);
                resultsLoader.html('<ul class="list-posts" style="text-align: center;font-size: 0;"></ul>');
                ul = resultsLoader.find('ul:first');
                return ul.append(Widgets.svbtleFeeds.failureMsg());
            },
            complete: function() {
                setTimeout(function(){
 $(Widgets.svbtleFeeds.resultsLoader).removeClass('loading-content');
                }, 1000);
            }
        });
    },

    proccessResponse: function(data) {

        var results, resultsLoader, ul,
            listPosts = data.items;
      

        resultsLoader = $(Widgets.svbtleFeeds.resultsLoader);
        resultsLoader.html("<ul class='list-posts' style='text-align: center;font-size: 0;'></ul>");
        ul = resultsLoader.find('ul:first');

        var post_count = 0;
        if (data.status = 'ok') {
            results = [];

            for (i in listPosts) {

                var post = listPosts[i];
                console.log(post);
                var today = new Date()
                var pubDate = new Date(post.pubDate.replace(/-/g, "/"));
                var latest = false;
                if(today.getFullYear() - pubDate.getFullYear() < 5){
                    latest = true
                }
                

                if((latest&& this.checkURL(post.thumbnail))  && post_count < 5){
                    post_count+=1;
                    results.push(ul.append(Widgets.svbtleFeeds.buildEntryHTML(post)));
                }
            }

            return results;
        } else {
            return ul.append(Widgets.svbtleFeeds.failureMsg());
        }
    },

    failureMsg: function() {
        return '<li class="empty">Ocorreu um erro ao carregar o conteúdo.</li>';
    },

    buildEntryHTML: function(post) {
        var html;
       

        var x = post.link;
        var cover = post.thumbnail;

        if(!this.checkURL(cover)){
            cover = "/assets/images/cover.png";
        }

        return html = '<li><a href="'+ x +'" target="_blank">\
          <div class="post-image" style="background-image: url('+ cover  +');"></div>\
          <div class="post-content">\
            <h1>'+ post.title +'</h1>\
          </div>\
        </a></li>';
    }
};

$(function () {
    'use strict';
    subMenu();
    whiteLogo();
    whiteIcon();
    featured();
    pagination();
    video();
    gallery();
    table();
    toc();
    modal();
    search();
    burger();
    theme();
});

$(window).on('scroll', function () {
    'use strict';
    if (body.hasClass('post-template')) {
        if (timeout) {
            window.cancelAnimationFrame(timeout);
        }
        timeout = window.requestAnimationFrame(sticky);
    }
    // var windowBottom = $(this).scrollTop() + $(this).innerHeight();
    // $(".sidenote").each(function() {
    //   /* Check the location of each desired element */
    //   var objectBottom = $(this).offset().top + $(this).outerHeight();
      
    //   /* If the element is completely within bounds of the window, fade it in */
    //   if (objectBottom + $(window).height() / 4 - $(this).outerHeight() < windowBottom && objectBottom + 3*$(window).height() / 4 - 3*$(this).outerHeight()/4> windowBottom ) { //object comes into view (scrolling down)
    //     if ($(this).css("opacity")==0) {
    //         $(this).fadeTo(300,1);
    //     }
    //   }else { //object goes out of view (scrolling up)
    //     if ($(this).css("opacity")==1) {
    //         $(this).fadeTo(300,0);
    //     }
    //   }
    // });
});

$(window).on('load', function () {
    'use strict';
    if (body.hasClass('post-template')) {
        titleOffset = $('.single-title').offset().top;

        var content = $('.single-content');
        var contentHeight = content.height();
        contentOffset =
            content.offset().top + contentHeight - $(window).height() / 2;
    }
});

function getViewport () {
    // https://stackoverflow.com/a/8876069
    var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    // if (width <= 576) return 'xs';
    // if (width <= 768) return 'sm';
    // if (width <= 992) return 'md';
    // if (width <= 1200) return 'lg';

    if(width > 1250){
        return 'xl';
    }else{
        return 'no';
    }
  }

var tocVisible = false;

function sticky() {
    'use strict';
    st = jQuery(window).scrollTop();

    if (titleOffset > 0 && contentOffset > 0) {
        if (st > lastSt) {
            if (st > titleOffset) {
                body.addClass('sticky-visible');
            }
        } else {
            if (st <= titleOffset) {
                body.removeClass('sticky-visible');
            }
        }

        if (st > titleOffset && st <  2600) {
            if(getViewport() == 'xl'){
                body.addClass('toc-opened');
                tocVisible = true;
            }
        }else if (lastSt - st > 50  && st > 2600) {
            // Show the table of contents when the user scrolls up from a point deeper than 2600px
            if(getViewport() == 'xl'){
                body.addClass('toc-opened');
                tocVisible = true;
            }
        }else if(lastSt - st >=0){

        
        }else if(lastSt - st < 20 && tocVisible){
            body.removeClass('toc-opened');
            tocVisible = false;
        }
    }

    progress.css(
        'transform',
        'translate3d(' +
            (-100 + Math.min((st * 100) / contentOffset, 100)) +
            '%,0,0)'
    );

    lastSt = st;
}


// function sticky() {
//     'use strict';
//     st = jQuery(window).scrollTop();

//     if (titleOffset > 0 && contentOffset > 0) {
//         if (st > lastSt) {
//             if (st > titleOffset) {
//                 body.addClass('sticky-visible');

//             }
//         } else {
//             if (st <= titleOffset) {
//                 body.removeClass('sticky-visible');
//             }

//         }

//         if (st > titleOffset && (st <  2600)) {
//             if(getViewport() == 'xl'){
//                 body.addClass('toc-opened');
//             }
//         }
//         else{
//             body.removeClass('toc-opened');
//         }
//     }

//     progress.css(
//         'transform',
//         'translate3d(' +
//             (-100 + Math.min((st * 100) / contentOffset, 100)) +
//             '%,0,0)'
//     );

//     lastSt = st;
// }

function subMenu() {
    'use strict';
    var mainNav = $('.main-nav');
    var separator = mainNav.find('.menu-item[href*="..."]');

    if (separator.length) {
        separator.nextAll('.menu-item').wrapAll('<div class="sub-menu" />');
        separator.replaceWith(
            '<button class="button-icon menu-item-button menu-item-more" aria-label="More"><svg class="icon"><use xlink:href="#dots-horizontal"></use></svg></button>'
        );

        var toggle = mainNav.find('.menu-item-more');
        var subMenu = $('.sub-menu');
        toggle.append(subMenu);

        toggle.on('click', function () {
            if (!subMenu.is(':visible')) {
                subMenu.show().addClass('animate__animated animate__bounceIn');
            } else {
                subMenu.addClass('animate__animated animate__zoomOut');
            }
        });

        subMenu.on('animationend', function (e) {
            subMenu.removeClass(
                'animate__animated animate__bounceIn animate__zoomOut'
            );
            if (e.originalEvent.animationName == 'zoomOut') {
                subMenu.hide();
            }
        });
    }
}

function whiteLogo() {
    'use strict';
    if (typeof gh_white_logo != 'undefined') {
        var whiteImage =
            '<img class="logo-image white" src="' + gh_white_logo + '">';
        $('.logo').prepend(whiteImage);
    }
}

function whiteIcon() {
    'use strict';
    if (typeof gh_white_icon != 'undefined') {
        var whiteImage =
            '<img class="cover-icon-image white" src="' + gh_white_icon + '">';
        $('.cover-icon').prepend(whiteImage);
    }
}

function featured() {
    'use strict';
    $('.featured-feed').owlCarousel({
        dots: false,
        margin: 30,
        nav: true,
        navText: [
            '<svg class="icon"><use xlink:href="#chevron-left"></use></svg>',
            '<svg class="icon"><use xlink:href="#chevron-right"></use></svg>',
        ],
        responsive: {
            0: {
                items: 1,
            },
            768: {
                items: 2,
            },
            992: {
                items: 3,
            },
        },
    });
}

function pagination() {
    'use strict';
    var wrapper = $('.post-feed');

    if (body.hasClass('paged-next')) {
        wrapper.infiniteScroll({
            append: '.feed',
            button: '.infinite-scroll-button',
            debug: false,
            hideNav: '.pagination',
            history: false,
            path: '.pagination .older-posts',
            scrollThreshold: false,
            status: '.infinite-scroll-status',
        });
    }

    wrapper.on('append.infiniteScroll', function (
        event,
        response,
        path,
        items
    ) {
        $(items[0]).addClass('feed-paged');
    });
}

function video() {
    'use strict';
    $('.single-content').fitVids();
}

function gallery() {
    'use strict';
    var images = document.querySelectorAll('.kg-gallery-image img');

    // console.log(images)
    images.forEach(function (image) {
        var container = image.closest('.kg-gallery-image');
        var width = image.attributes.width.value;
        var height = image.attributes.height.value;
        var ratio = width / height;
        container.style.flex = ratio + ' 1 0%';


        var id = container.id;


        if(id!==""){
            // console.log(id)
            pswp(
                '.kg-gallery-container-side',
                '.kg-gallery-image',
                '.kg-gallery-image',
                id,
                true
            );
        }

    });


    pswp(
        '.kg-gallery-container',
        '.kg-gallery-image',
        '.kg-gallery-image',
        false,
        true
    );
}

function table() {
    'use strict';
    if (body.hasClass('post-template') || body.hasClass('page-template')) {
        var tables = $('.single-content').find('.table');
        tables.each(function (_, table) {
            var labels = [];

            $(table)
                .find('thead th')
                .each(function (_, label) {
                    labels.push($(label).text());
                });

            $(table)
                .find('tr')
                .each(function (_, row) {
                    $(row)
                        .find('td')
                        .each(function (index, column) {
                            $(column).attr('data-label', labels[index]);
                        });
                });
        });
    }
}

function toc() {
    'use strict';
    if (body.hasClass('post-template')) {
        var output = '';
        var toggle = $('.sticky-toc-button');

        $('.single-content')
            .find('> h2, > h3')
            .each(function (index, value) {
                var linkClass =
                    $(this).prop('tagName') == 'H3'
                        ? 'sticky-toc-link sticky-toc-link-indented'
                        : 'sticky-toc-link sticky-toc-link-main';

                var rsc = "";
                if ($(value).text()=="Resources :"){
                    rsc = "✴︎ ";
                    linkClass = 'sticky-toc-link';
                }

                output +=
                    '<a class="' +
                    linkClass +
                    '" href="#' +
                    $(value).attr('id') +
                    '">' +
                    rsc + $(value).text() +
                    '</a>';
            });

        if (output == '') {
            toggle.remove();
        }

        $('.sticky-toc').html(output);

        toggle.on('click', function () {
            body.toggleClass('toc-opened');
        });

        $('.sticky-toc-link').on('click', function (e) {
            e.preventDefault();
            var link = $(this).attr('href');

            $('html, body').animate(
                {
                    scrollTop: $(link).offset().top - 68,
                },
                500
            );
        });
    }
}

function modal() {
    'use strict';
    var modalOverlay = $('.modal-overlay');
    var modal = $('.modal');
    var modalInput = $('.modal-input');

    $('.js-modal').on('click', function (e) {
        e.preventDefault();
        modalOverlay.show().outerWidth();
        body.addClass('modal-opened');
        modalInput.focus();
    });

    $('.modal-close, .modal-overlay').on('click', function () {
        body.removeClass('modal-opened');
    });

    modal.on('click', function (e) {
        e.stopPropagation();
    });

    $(document).keyup(function (e) {
        if (e.keyCode === 27 && body.hasClass('modal-opened')) {
            body.removeClass('modal-opened');
        }
    });

    modalOverlay.on('transitionend', function (e) {
        if (!body.hasClass('modal-opened')) {
            modalOverlay.hide();
        }
    });

    modal.on('transitionend', function (e) {
        e.stopPropagation();
    });
}

function search() {
    'use strict';
    if (
        typeof gh_search_key == 'undefined' ||
        gh_search_key == '' ||
        typeof gh_search_migration == 'undefined'
    )
        return;

    var searchInput = $('.search-input');
    var searchButton = $('.search-button');
    var searchResult = $('.search-result');
    var popular = $('.popular-wrapper');
    var includeContent = typeof gh_search_content == 'undefined' || gh_search_content == true ? true : false;

    var url =
        siteUrl +
        '/ghost/api/v3/content/posts/?key=' +
        gh_search_key +
        '&limit=all&fields=id,title,url,updated_at,visibility&order=updated_at%20desc';
    url += includeContent ? '&formats=plaintext' : '';
    var indexDump = JSON.parse(localStorage.getItem('dawn_search_index'));
    var index;

    elasticlunr.clearStopWords();

    localStorage.removeItem('dawn_index');
    localStorage.removeItem('dawn_last');

    function update(data) {
        data.posts.forEach(function (post) {
            index.addDoc(post);
        });

        try {
            localStorage.setItem('dawn_search_index', JSON.stringify(index));
            localStorage.setItem('dawn_search_last', data.posts[0].updated_at);
        } catch (e) {
            console.error('Your browser local storage is full. Update your search settings following the instruction at https://github.com/TryGhost/Dawn#disable-content-search');
        }
    }

    if (
        !indexDump ||
        gh_search_migration != localStorage.getItem('dawn_search_migration')
    ) {
        $.get(url, function (data) {
            if (data.posts.length > 0) {
                index = elasticlunr(function () {
                    this.addField('title');
                    if (includeContent) {
                        this.addField('plaintext');
                    }
                    this.setRef('id');
                });

                update(data);

                localStorage.setItem(
                    'dawn_search_migration',
                    gh_search_migration
                );
            }
        });
    } else {
        index = elasticlunr.Index.load(indexDump);

        $.get(
            url +
                "&filter=updated_at:>'" +
                localStorage
                    .getItem('dawn_search_last')
                    .replace(/\..*/, '')
                    .replace(/T/, ' ') +
                "'",
            function (data) {
                if (data.posts.length > 0) {
                    update(data);
                }
            }
        );
    }

    searchInput.on('keyup', function (e) {
        var result = index.search(e.target.value, { expand: true });
        var output = '';

        result.forEach(function (post) {
            output +=
                '<div class="search-result-row">' +
                '<a class="search-result-row-link" href="' +
                post.doc.url +
                '">' +
                post.doc.title +
                '</a>' +
                '</div>';
        });

        searchResult.html(output);

        if (e.target.value.length > 0) {
            searchButton.addClass('search-button-clear');
        } else {
            searchButton.removeClass('search-button-clear');
        }

        if (result.length > 0) {
            popular.hide();
        } else {
            popular.show();
        }
    });

    $('.search-form').on('submit', function (e) {
        e.preventDefault();
    });

    searchButton.on('click', function () {
        if ($(this).hasClass('search-button-clear')) {
            searchInput.val('').focus().keyup();
        }
    });
}

function burger() {
    'use strict';
    $('.burger').on('click', function () {
        body.toggleClass('menu-opened');
    });
}

function theme() {
    'use strict';
    var toggle = $('.js-theme');
    var toggleText = toggle.find('.theme-text');

    if (window.matchMedia) {
        // Check if the dark-mode Media-Query matches
        if(window.matchMedia('(prefers-color-scheme: dark)').matches){
          dark();
        } else {
          light();
        }
      } else {
        // Default (when Media-Queries are not supported)
        light();
    }

    function system() {
        html.removeClass(['theme-dark', 'theme-light']);
        localStorage.removeItem('dawn_theme');
        toggleText.text(toggle.attr('data-system'));
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // dark mode
            dark();
        }
    }

    function dark() {
        html.removeClass('theme-light').addClass('theme-dark');
        localStorage.setItem('dawn_theme', 'dark');
        toggleText.text(toggle.attr('data-dark'));
        $("#HARVARD").attr("src","/assets/images/orgs/harvard_light.png");
        $("#0xAIT").attr("src","/assets/images/orgs/0xAIT_light.png");
        $("#CSIRO").attr("src","/assets/images/orgs/csiro_light.png");
        $("#YAALA").attr("src","/assets/images/orgs/yaalalabs_light.png");
        $("#SPS").attr("src","/assets/images/orgs/sps_light.png");
    }

    function light() {
        html.removeClass('theme-dark').addClass('theme-light');
        localStorage.setItem('dawn_theme', 'light');
        toggleText.text(toggle.attr('data-light'));
        $("#HARVARD").attr("src","/assets/images/orgs/harvard.png");
        $("#0xAIT").attr("src","/assets/images/orgs/0xAIT.png");
        $("#CSIRO").attr("src","/assets/images/orgs/csiro.png");
        $("#YAALA").attr("src","/assets/images/orgs/yaalalabs.png");
        $("#SPS").attr("src","/assets/images/orgs/sps.png");
    }

    switch (localStorage.getItem('dawn_theme')) {
        case 'dark':
            dark();
            break;
        case 'light':           
            light();
            break;
        default:
            system();
            break;
    }

    toggle.on('click', function (e) {
        e.preventDefault();

        if (!html.hasClass('theme-dark') && !html.hasClass('theme-light')) {
            dark();
        } else if (html.hasClass('theme-dark')) {
            light();
        } else {
            system();
        }
    });
}

function pswp(container, element, trigger, caption, isGallery) {
    var parseThumbnailElements = function (el) {
        var items = [],
            gridEl,
            linkEl,
            item;

        $(el)
            .find(element)
            .each(function (i, v) {
                gridEl = $(v);
                linkEl = gridEl.find(trigger);

                item = {
                    src: isGallery
                        ? gridEl.find('img').attr('src')
                        : linkEl.attr('href'),
                    w: 0,
                    h: 0,
                };

                if (caption && gridEl.find(caption).length) {
                    item.title = gridEl.find(caption).html();
                }

                items.push(item);
            });

        return items;
    };

    var openPhotoSwipe = function (index, galleryElement) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;

        items = parseThumbnailElements(galleryElement);

        options = {
            closeOnScroll: false,
            history: false,
            index: index,
            shareEl: false,
            showAnimationDuration: 0,
            showHideOpacity: true,
        };

        gallery = new PhotoSwipe(
            pswpElement,
            PhotoSwipeUI_Default,
            items,
            options
        );
        gallery.listen('gettingData', function (index, item) {
            if (item.w < 1 || item.h < 1) {
                // unknown size
                var img = new Image();
                img.onload = function () {
                    // will get size after load
                    item.w = this.width; // set image width
                    item.h = this.height; // set image height
                    gallery.updateSize(true); // reinit Items
                };
                img.src = item.src; // let's download image
            }
        });
        gallery.init();
    };

    var onThumbnailsClick = function (e) {
        e.preventDefault();

        var index = $(e.target)
            .closest(container)
            .find(element)
            .index($(e.target).closest(element));
        var clickedGallery = $(e.target).closest(container);

        openPhotoSwipe(index, clickedGallery[0]);

        return false;
    };

    $(container).on('click', trigger, function (e) {
        onThumbnailsClick(e);
        console.log(caption);
    });

    if(caption!==false){
        console.log("binding function -> ", caption)

        $("#"+caption).on("click", function (e) {
            e.preventDefault();

            
            
            // openPhotoSwipe(index, clickedGallery[0]);
            
            
            var clickedGallery = $(container);


            var thumbIndex = -1;
            clickedGallery.find(".kg-gallery-image").each(function(index) {
                if ($(this).attr("id") === caption) {
                    thumbIndex = index;
                    return false;
                }
            });
            //var clickedGallery = $(container).find('#' + caption).parent();

            console.log(caption);
            console.log(thumbIndex);
            console.log(clickedGallery);
            //var index = 0; // replace 0 with the desired index for the thumbnail
            openPhotoSwipe(thumbIndex, clickedGallery[thumbIndex]);
        });
    }

}

$(document).ready(function(){
  var elements = $("[paper-citations]");
  elements.each(function() {
        var title = $(this).attr("paper-title");
        var show_citation = $(this).attr("paper-citations");
        var element = this;
        var new_count = "";

        $(this).attr("href", "https://scholar.google.com/scholar?q=" + title);


        if(show_citation=="false"){
            $.getJSON('https://gs-metrics.ramith.workers.dev/?paper_title=' + title, function(data) {

                if(parseInt(data.new_count) > 0){
                    new_count =  "<font color=\"#28a745\"> (+ "+ data.new_count +" new citations)</font>";
                }
                
                $(element).attr("paper-citations",data.count + new_count );
            });

        }else if (show_citation=="new"){
            $.getJSON('https://gs-metrics.ramith.workers.dev/?paper_title=' + title, function(data) {
                if(parseInt(data.new_count) > 0){
                    new_count =  " (+ "+ data.new_count +" new citations)";
                }
                $(element).text(new_count + " · " );
            });

        }else{
            $.getJSON('https://gs-metrics.ramith.workers.dev/?paper_title=' + title, function(data) {
                $(element).text( " · " + data.count + " · " );
            });
        }

  });

  var authors = $("[author-citations]");
  authors.each(function() {
        var author_name = $(this).attr("author-name");
        var show_citation = $(this).attr("author-citations");
        var element = this;

        $(this).attr("href", "https://scholar.google.com/scholar?q=" + author_name);

        if(show_citation=="false"){
            $.getJSON('https://gs-authors.ramith.workers.dev/?author=' + author_name, function(data) {
                $(element).attr("author-citations", data.citations);
                $(element).attr("author-affiliation", data.affiliation);
            });
        }else{
            $.getJSON('https://gs-authors.ramith.workers.dev/?author=' + author_name, function(data) {
                $(element).text( " · Cited By " + data.citations + " · " );
            });
        }
  });

});


$( "a" ).hover(
    
    function() {   

            var title = $(this).attr("paper-title");
            var authors = $(this).attr("paper-authors");
            var conf = $(this).attr("paper-conf");
            var citations = $(this).attr("paper-citations");
            var slides_pdf = $(this).attr("paper-slides-pdf");
            var video_url = $(this).attr("paper-video");

            var author_name = $(this).attr("author-name");
            var author_affiliation = $(this).attr("author-affiliation");
            var author_citations = $(this).attr("author-citations");
            
            var video="";

            if(video_url!==undefined){
                /// If the paper has a video for it (slideslive etc.)
                video = '<a class="social-item social-item-youtube" href="' + video_url  +'"><svg class="icon"><use xlink:href="#youtube-box"></use></svg></a>'
            }

            if(typeof author_name !== 'undefined' && author_name !== false){
                $(this).append('<div class="box">' + 
                        '<ul style="list-style-type: none; padding-left:1em;">'+
                        '<li><strong>'+ author_name +' </strong>'+ '<br>'+
                         author_affiliation + '<br>' +
                        'Cited by ' + author_citations +
                        '</ul></div>');
                
            }else{
                //not an author : checking if a paper

                if (typeof title !== 'undefined' && title !== false) {
                    // $('<div/>', {
                    //     text: title,
                    //     class: 'box'
                    // }).appendTo(this); 
                    if(title==="text"){
                        var description = $(this).attr("description");
        
                        $(this).append('<div class="box_cover">' + 
                        '<ul style="list-style-type: none; padding-left:1em;">'+
                        '<li>'+
                        description + '<br><i>'+
                        '</ul></div>');
                    }else if(title==="side_cover"){
                        /// we just want to display a description, nothing else :) 

                        var description = $(this).attr("description");
        
                        $(this).append('<div class="box_cover" style="max-width:340px !important;min-width:300px !important">' + 
                        '<ul style="list-style-type: none; padding-left:1em;">'+
                        '<li>'+
                        description + '<br><i>'+
                        '</ul></div>');
                    }else{ 
                        //paper style

                        $(this).append('<div class="box">' + 
                        '<ul style="list-style-type: none; padding-left:1em;">'+
                        '<li><strong>'+ title +' </strong>'+
                        ' <u>[PDF]</u><br>'+
                        authors + '<br><i>'+
                        conf + '</i><br>' + 
                        citations +'</li>'+ video +
                        '</ul></div>');
                    }
                }
            } 

        
    }, function() {
      $(document).find("div.box").remove();
      $(document).find("div.box_cover").remove();
    }
  );