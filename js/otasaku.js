var otasaku = {
    baseUrl: "http://otakumode.com/",
    onKeydown: function(e) {
        if(e.metaKey||e.altKey||e.shiftKey) return;
        switch (e.which) {
            case 72:
                otasaku.moveTo("home");
                break;
            case 73:
                j(".stage").length? otasaku.stage(true): otasaku.stage(false);
                break;
            case 74:
                j(".stage").length? otasaku.nextOnStage(true): otasaku.next(true);
                break;
            case 75:
                j(".stage").length? otasaku.nextOnStage(false): otasaku.next(false);
                break;
            case 76:
                j(".stage").length? otasaku.sukiToggle(j(".stage")): otasaku.sukiToggle(otasaku.curSel);
                break;
            case 85:
                otasaku.moveTo("user");
                break;
            default:
                break;
        }
    },
    onClick: function(e) {
        if(!j.isEmptyObject(otasaku.curSel)) {
            otasaku.prevSel = otasaku.curSel;
            otasaku.prevSelProc();
        }
        otasaku.prevSel = {};
        otasaku.curSel = j(this);
        otasaku.curSelProc();
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

    stage: function(close) {
        if(close) {
            j(".close")[0].click();
            return;
        }
        if(j.isEmptyObject(otasaku.curSel)) return;
        otasaku.curSel.find("img").click();
        setTimeout(function() {
            j(".stage").find(".ArticleAction").addClass("otasaku-suki-display");
        },500);
    },

    nextOnStage: function(f) {
        otasaku.next(f);
        otasaku.stage(false);
    },

    moveTo: function(type) {
        if(type==="user") {
            var userName = j("#navUserName").attr("href").replace("/","");
            if(userName&&window.location.href!==otasaku.baseUrl+userName) window.location = otasaku.baseUrl+userName;
        } else if(type==="home") {
            if(window.location.href!==otasaku.baseUrl) window.location = otasaku.baseUrl;
        }
    }
};
