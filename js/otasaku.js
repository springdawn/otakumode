var otasaku = {
    onKeydown: function(e) {
        if(e.metaKey||e.altKey||e.shiftKey) return;
        switch (e.which) {
            case 73:
                otasaku.stage();
                break;
            case 74:
                if(j(".stage").length) break;
                otasaku.next(true);
                break;
            case 75:
                if(j(".stage").length) break;
                otasaku.next(false);
                break;
            case 76:
                if(j(".stage").length) otasaku.sukiToggle(j(".stage"));
                else otasaku.sukiToggle(otasaku.curSel);
                break;
            default:
                break;
        }
    },
    onClick: function(e) {
        if(j(this).hasClass("ArticleList")) {
            if(!j.isEmptyObject(otasaku.curSel)) {
                otasaku.prevSel = otasaku.curSel;
                otasaku.prevSelProc();
            }
            otasaku.prevSel = {};
            otasaku.curSel = j(this);
            otasaku.curSelProc();
        }
    },

    prevSel: {},
    curSel: {},
    timeout: null,
    next: function(f) {
        if(j.isEmptyObject(otasaku.curSel)) {
            otasaku.curSel = j(".ArticleList").first();
            otasaku.curSelProc();
        } else {
            otasaku.prevSel = otasaku.curSel;
            otasaku.prevSelProc();
            otasaku.curSel = f? otasaku.prevSel.next(".ArticleList"): otasaku.prevSel.prev(".ArticleList");
            if(!otasaku.curSel.length) otasaku.curSel = f? otasaku.prevSel.nextAll(".ArticleList").first(): otasaku.prevSel.prevAll(".ArticleList").first();
            if(!otasaku.curSel.length) {
                otasaku.curSel = otasaku.prevSel;
                otasaku.prevSelProc();
            }
            otasaku.curSelProc();
        }

        if((j(document).scrollTop()+j("#header").height()+80 < otasaku.curSel.offset().top && otasaku.curSel.offset().top < j(document).scrollTop()+j(window).height()) && 
            (j(document).scrollTop() < otasaku.curSel.offset().top+otasaku.curSel.height() && otasaku.curSel.offset().top+otasaku.curSel.height() < j(document).scrollTop()+j(window).height()))
            ;
        else {
            if(!otasaku.timeout) {
                otasaku.timeout = setTimeout(function() {
                    j(document.body).animate({scrollTop:otasaku.curSel.offset().top-j("#header").height()-80}, "fast");
                    otasaku.timeout = null;
                },200);
            }
        }
    },

    curSelProc: function() {
        otasaku.curSel.addClass("otasaku-selected");
        otasaku.curSel.find(".ArticleAction").addClass("otasaku-suki-display");
    },
    prevSelProc: function() {
        otasaku.prevSel.removeClass("otasaku-selected");
        otasaku.prevSel.find(".ArticleAction").removeClass("otasaku-suki-display");
    },

    sukiToggle: function(jObj) {
        jObj.find(".ArticleAction>a>i").click();
    },

    stage: function() {
        if(j(".stage").length) {
            j(".close")[0].click();
            return;
        }
        if(j.isEmptyObject(otasaku.curSel)) return;
        otasaku.curSel.find("img").click();
        setTimeout(function() {
            j(".stage").find(".ArticleAction").addClass("otasaku-suki-display");
        },500);
    }
};
