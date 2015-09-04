springCurve = "spring(500, 28, 2000)"
Mask.opacity = 0.7;
WhiteCircle.opacity = 1;
ShortcutDot2.opacity = 1;
Ad1.opacity = 1;
IconUnlockOn.opacity = 1;

Ad1.style = {
    borderRadius: "24px",
    backgroundColor:"#ddd",
    width: "540px",
    height: "922.5px",
    x : "50",
    y : "175"
}
Ad1.x = 50
Ad1.y = 175
WhiteCircle.style = {
    borderRadius: "100%",
    backgroundColor: "#fff",
    width: "108px",
    height: "108px"
}
ShortcutDot2.style = {
    borderRadius: "100%",
    backgroundColor: "#fff",
    width: "108px",
    height: "108px"
}
WhiteCircle.x = 266
WhiteCircle.y = 514

ShortcutDot2.x = 266
ShortcutDot2.y = 514


IconUnlockOn.draggable.enabled = true;

function springBack(view) {
    view.animate({
        properties: {
            x: view.originalFrame.x,
            y: view.originalFrame.y
        },
        curve: springCurve
    });
}

function endState(){
    WhiteCircle.scale = 1;
    ShortcutDot2.scale = 1;
    ShortcutDot2.opacity = 0;
}

function init(){
    WhiteCircle.scale = 1;
    IconUnlockOn.opacity = 1;
    springBack(IconUnlockOn);
    springBack(BgProgressbar)
    springBack(IconJoin)
}

IconUnlockOn.on(Events.DragStart, function()
{


});

IconUnlockOn.on(Events.DragMove, function()
{
    //console.log("IconUnlock.midY:"+IconUnlock.midY);
    //console.log("height from bottom:"+(1038-Number(IconUnlock.midY)));
    ShortcutDot2.opacity = 0.2;
    var IconUnlockPositionY = 1038-Number(IconUnlockOn.midY);
    BgProgressbar.y = BgProgressbar.originalFrame.y - IconUnlockPositionY*1.5;
    IconJoin.y = IconJoin.originalFrame.y - IconUnlockPositionY;
    var CircleScale = ((901-IconUnlockOn.midY)/100)
    ShortcutDot2.scale = 0.01*IconUnlockPositionY

    if(IconUnlockOn.midY <900 && IconUnlockOn.midY > 800){
        WhiteCircle.opacity = 1;
        WhiteCircle.scale = CircleScale * 1.5

    }else if (IconUnlockOn.midY < 800) {
        WhiteCircle.scale = 1.5
    }else{
    }

});

IconUnlockOn.on(Events.DragEnd, function()
{

    if (IconUnlockOn.midY < 800) {
        // Dragged up

        WhiteCircle.scale = 1.5
        BgProgressbar.animateTo({ y: -500 }, 200)
        IconJoin.animateTo({ y: -500 }, 200)
        IconUnlockOn.opacity = 0;
        ShortcutDot2.animate({
            properties: {
                scale: 14,
                opacity:0
            },
            time: 120
        });
    } else {
        // Not dragged enough, spring back
        springBack(IconUnlockOn)
        springBack(BgProgressbar)
        springBack(IconJoin)
        endState()
    }
});

IconUnlockOn.on(Events.TouchEnd, function() {
    if (IconUnlockOn.midY > 800) {

    }
});

WhiteCircle.on(Events.TouchStart, function(){
    init()
});