var j = jQuery.noConflict();
j(function() {
    j(document.body).keydown(otasaku.onKeydown);
    j(".ArticleList").click(otasaku.onClick);
});
