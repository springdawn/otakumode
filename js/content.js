var j = jQuery.noConflict();
j(function() {
    j(document.body).keydown(otasaku.onKeydown);
    j(document).on("click", ".lcBox", otasaku.onClick);
});
