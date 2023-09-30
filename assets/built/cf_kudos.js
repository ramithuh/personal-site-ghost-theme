// needs to be a string for jquery.cookie
var postId = '1'; 
const Url = window.location.href;
$.getJSON('https://kudos.ramith.workers.dev/?read=1&blog_post=' + Url , function(data) {
        $(".num").html(data.count);
});



// $.getJSON('https://web.ramith.workers.dev/?url=https%3A%2F%2Fscholar.google.com%2Fscholar%3Fhl%3Den%26as_sdt%3D0%252C5%26q%3DImageNet%2BLarge-Scale%2BVisual%2BRecognition%2BChallenge%26btnG%3D&selector=%23gs_res_ccl_mid+%3E+div%3Anth-child%281%29+%3E+div.gs_ri+%3E+div.gs_fl+%3E+a%3Anth-child%283%29&scrape=text&pretty=true' , function(data) {
//     $(".num").html(data['result']['#gs_res_ccl_mid > div:nth-child(1) > div.gs_ri > div.gs_fl > a:nth-child(3)'][0]);
// });



// console.log('https://kudos.ramith.workers.dev/?read=1&blog_post=' + Url);

$(function()
{
    // initialize kudos
    $("figure.kudoable").kudoable();

    // check to see if user has already kudod
    // fyi cookies do not work when you are viewing this as a file
    if($.cookie(postId) == 'true') {
        // make kudo already kudod
        $("figure.kudoable").removeClass("animate").addClass("complete");

        // your server would take care of the proper kudos count, but because this is a
        // static page, we need to set it here so it doesn't become -1 when you remove
        // the kudos after a reload
        $.getJSON('https://kudos.ramith.workers.dev/?read=1&blog_post=' + Url, function(data) {
            $(".num").html(data.count);
        });
        
    }	

    // when kudoing
    $("figure.kudo").bind("kudo:active", function(e)
    {
        //console.log("kudoing active");
    });

    // when not kudoing
    $("figure.kudo").bind("kudo:inactive", function(e)
    {
        //console.log("kudoing inactive");
    });

    // after kudo'd
    $("figure.kudo").bind("kudo:added", function(e)
    {
        var element = $(this);
        // ajax'y stuff or whatever you want
        $.getJSON('https://kudos.ramith.workers.dev/?read=0&blog_post=' + Url, function(data) {
            $(".num").html(data.count);
        });
        // console.log("Kodo'd:", element.data('id'), ":)");
        // set cookie so user cannot kudo again for 7 days
        $.cookie(postId, 'true', { expires: 7 });
    });

    // after removing a kudo
    $("figure.kudo").bind("kudo:removed", function(e)
    {
        var element = $(this);
        // ajax'y stuff or whatever you want
        // console.log("Un-Kudo'd:", element.data('id'), ":(");

        // remove cookie
        $.removeCookie(postId);
    });
});
