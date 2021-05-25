var isMobile = detectMobile();

var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
width = isMobile ? width : height / 1.7;
var moveTayChoose;
var canvas, stage, context, update = true;
var supportsPassive = false, pressMove = false;
var containerLine = new createjs.Container();
var indexClarity = [];
var outer1, outer2, install_now;
var queue, game = {
    indexBubbleInlocal: null,
    map: [],
    bubble: {
        width: 110,
        currentWidth: 0,
        currentHeight: 0,
        leftoverX: 0,
        leftoverY: 0,
        scale: 0,
        color: null
    },
    scores: 0,
    total_score: 38
};
var mapAm = [], mapDuong = [], rowDuong;
var player = {
    x: 0,
    y: 0,
    v: 1.5,
    angle: 0,
    bubble: null,
    color: [],
    currentColor: null,
    end: null
};
var destinations = [], bubbleRemove = [], iceBuble = [];
var textNew, containerPoint, text_scores, avatar, downtime = 0, tay;
var containerMain = new createjs.Container();
var spriteSheet;
var win = true, fail = false, life = 20, textLife;
const mapIndexD =
    [[100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
    [16, 6, 16, 6, 16, 6, 14, 4, 14, 4, 14],
    [6, 6, 6, 16, 6, 4, 14, 4, 4, 4],
    [6, 6, 6, 6, 6, 2, 4, 4, 4, 4, 4],
    [6, 6, 6, 6, 2, 2, 4, 4, 4, 4],
    [6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4],
    [6, 2, 2, 2, 12, 12, 2, 2, 2, 4],
    [6, 16, 6, 2, 12, 12, 12, 2, 4, 4, 14],
    [6, 6, 2, 2, 2, 2, 2, 2, 4, 4],
    [6, 16, 2, 2, 2, 8, 2, 2, 2, 14, 4],
    [6, 2, 2, 8, 8, 8, 8, 2, 2, 4],
    [8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8],
    [4, 3, 13, 3, 3, 3, 3, 13, 3, 4],
    [4, 3, 3, 7, 7, 13, 7, 7, 3, 3, 4],
    [13, 3, 7, 11, 7, 7, 11, 7, 3, 13],
    [4, 3, 13, 7, 11, 7, 11, 7, 3, 3, 4],
    [4, 3, 3, 7, 11, 11, 7, 13, 3, 4],
    [1, 4, 13, 3, 7, 11, 7, 3, 3, 4, 1],
    [1, 4, 3, 3, 7, 7, 3, 13, 4, 1],
    [1, 11, 1, 1, 3, 13, 3, 1, 1, 11, 1],
    [1, 1, 1, 11, 1, 1, 11, 1, 1, 1]];
async function gameinit() {
    createjs.RotationPlugin.install();
    createjs.MotionGuidePlugin.install();
    setStage();
    loadImage();
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", tick);
}
async function loadImage() {
    queue = new createjs.LoadQueue(false);
    var manifest = [
        { src: './images/bubble_full.png', id: 'bubble_full' },
    ];
    queue.on("complete", setAnimation);
    queue.loadManifest(manifest);
}
function setAnimation() {
    spriteSheet = new createjs.SpriteSheet({
        images: [queue.getResult("bubble_full")],
        framerate: 25,
        frames: [
            [1, 1, 280, 503, 0, 0, 0],
            [283, 1, 280, 490, 0, 0, 0],
            [565, 1, 295, 14, 0, -3, -3],
            [1, 506, 150, 150, 0, 0, 0],
            [565, 17, 124, 152, 0, 0, 0],
            [153, 506, 77, 106, 0, 0, -3],
            [1, 658, 88, 61, 0, -2, -18],
            [565, 171, 88, 61, 0, -2, -18],
            [691, 17, 87, 61, 0, -3, -18],
            [565, 234, 87, 61, 0, -3, -18],
            [691, 80, 87, 61, 0, -3, -18],
            [565, 297, 86, 61, 0, -1, -16],
            [565, 360, 86, 61, 0, -1, -16],
            [565, 423, 86, 61, 0, -1, -16],
            [780, 17, 85, 61, 0, -1, -16],
            [780, 80, 86, 61, 0, -1, -16],
            [868, 1, 109, 38, 0, -1, 0],
            [867, 41, 100, 33, 0, 0, 0],
            [868, 76, 77, 59, 0, -8, -21],
            [691, 143, 100, 33, 0, 0, 0],
            [91, 658, 66, 61, 0, -10, -14],
            [153, 614, 97, 35, 0, -1, 0],
            [159, 651, 80, 56, 0, -7, -23],
            [283, 493, 100, 33, 0, 0, 0],
            [385, 493, 79, 56, 0, -8, -23],
            [466, 493, 79, 56, 0, -8, -23],
            [793, 143, 77, 59, 0, -7, -21],
            [872, 137, 77, 59, 0, -8, -21],
            [232, 506, 45, 53, 0, -5, -1],
            [232, 561, 50, 51, 0, -3, -2],
            [284, 528, 77, 59, 0, -8, -21],
            [284, 589, 79, 56, 0, -8, -23],
            [252, 614, 30, 37, 0, -15, -9],
            [655, 178, 79, 56, 0, -8, -23],
            [736, 178, 55, 55, 0, 0, 0],
            [654, 236, 77, 59, 0, -8, -21],
            [653, 297, 71, 59, 0, -8, -16],
            [653, 358, 71, 59, 0, -9, -16],
            [653, 419, 71, 59, 0, -9, -16],
            [793, 204, 72, 55, 0, -10, -22],
            [241, 653, 55, 55, 0, 0, 0],
            [298, 647, 65, 60, 0, -10, -15],
            [159, 709, 36, 32, 0, -7, -10],
            [197, 709, 34, 32, 0, -10, -11],
            [736, 235, 55, 55, 0, 0, 0],
            [793, 261, 72, 55, 0, -10, -22],
            [726, 297, 65, 60, 0, -11, -15],
            [726, 359, 66, 60, 0, -10, -15],
            [726, 421, 70, 58, 0, -9, -16],
            [794, 318, 70, 59, 0, -9, -16],
            [794, 379, 45, 40, 0, -8, -6],
            [798, 421, 66, 60, 0, -10, -15],
            [841, 379, 44, 40, 0, -2, -6],
            [866, 318, 70, 59, 0, -9, -16],
            [887, 379, 53, 52, 0, 0, 0],
            [866, 433, 72, 55, 0, -10, -22],
            [940, 433, 37, 50, 0, 0, 0],
            [565, 486, 72, 55, 0, -10, -22],
            [872, 198, 72, 55, 0, -10, -22],
            [867, 255, 68, 56, 0, -9, -18],
            [937, 255, 40, 38, 0, -7, -8],
            [938, 295, 39, 38, 0, -8, -8],
            [938, 335, 39, 38, 0, -8, -8],
            [942, 375, 35, 35, 0, -10, -10],
            [233, 710, 55, 27, 0, 0, 0],
            [653, 480, 68, 56, 0, -10, -18],
            [723, 481, 68, 56, 0, -10, -18],
            [793, 483, 67, 56, 0, -10, -18],
            [862, 490, 60, 48, 0, 0, 0],
            [924, 490, 53, 53, 0, -1, -2],
            [298, 709, 34, 32, 0, -10, -11],
            [334, 709, 34, 32, 0, -10, -11],
            [363, 551, 40, 36, 0, -5, -8],
            [365, 589, 55, 55, 0, 0, 0],
            [365, 646, 55, 55, 0, 0, 0],
            [370, 703, 43, 38, 0, -7, -17],
            [405, 551, 40, 36, 0, -10, -16],
            [447, 551, 53, 53, 0, -1, -2],
            [502, 551, 51, 53, 0, -2, -2],
            [555, 543, 53, 53, 0, -1, -2],
            [415, 703, 41, 38, 0, -10, -7],
            [422, 606, 53, 53, 0, -1, -2],
            [477, 606, 51, 51, 0, -2, -2],
            [422, 661, 41, 38, 0, -10, -7],
            [610, 543, 50, 51, 0, -2, -2],
            [662, 538, 51, 50, 0, -2, -2],
            [715, 539, 51, 50, 0, -2, -2],
            [768, 541, 51, 50, 0, -2, -2],
            [821, 541, 51, 50, 0, -2, -2],
            [874, 540, 48, 44, 0, 0, -5],
            [924, 545, 51, 50, 0, -2, -2],
            [530, 606, 46, 47, 0, -4, -4],
            [578, 598, 36, 45, 0, -12, -5],
            [616, 596, 47, 42, 0, -7, -5],
            [665, 590, 48, 42, 0, -6, -5],
            [715, 591, 47, 42, 0, -7, -5],
            [764, 593, 47, 42, 0, -7, -5],
            [813, 593, 47, 42, 0, -7, -5],
            [947, 76, 27, 32, 0, -16, -11],
            [947, 110, 27, 25, 0, -13, -13],
            [951, 137, 25, 28, 0, -16, -13],
            [862, 593, 34, 41, 0, -13, -7],
            [898, 597, 41, 38, 0, -10, -7],
            [941, 597, 36, 36, 0, -9, -9],
            [941, 635, 36, 36, 0, -9, -10],
            [465, 661, 40, 38, 0, -7, -8],
            [458, 701, 41, 38, 0, -10, -7],
            [507, 659, 40, 38, 0, -7, -8],
            [549, 655, 39, 37, 0, -8, -8],
            [590, 645, 41, 37, 0, -8, -17],
            [633, 640, 36, 36, 0, -9, -9],
            [671, 634, 36, 36, 0, -9, -10],
            [709, 635, 36, 35, 0, -9, -11],
            [747, 637, 36, 36, 0, -9, -9],
            [785, 637, 36, 36, 0, -9, -10],
            [823, 637, 36, 36, 0, -9, -9],
            [951, 167, 22, 23, 0, -16, -15],
            [590, 684, 36, 35, 0, -9, -10],
            [633, 678, 36, 35, 0, -12, -9],
            [671, 672, 35, 35, 0, -10, -10],
            [671, 709, 34, 32, 0, -10, -11],
            [708, 672, 35, 35, 0, -10, -10],
            [707, 709, 34, 32, 0, -10, -11],
            [743, 709, 34, 32, 0, -10, -11],
            [745, 675, 34, 32, 0, -10, -11],
            [781, 675, 35, 34, 0, -13, -10],
            [779, 711, 32, 30, 0, -11, -12],
            [818, 675, 35, 34, 0, -13, -10],
            [813, 711, 32, 30, 0, -11, -12],
            [501, 701, 35, 35, 0, -10, -10],
            [538, 699, 35, 34, 0, -13, -10],
            [855, 675, 35, 34, 0, -13, -10],
            [847, 711, 33, 29, 0, -5, -19],
            [882, 711, 32, 29, 0, -10, -11],
            [916, 637, 23, 21, 0, -16, -15],
            [1, 721, 18, 18, 0, -19, -16],
            [862, 636, 34, 33, 0, -5, -16],
            [892, 671, 33, 32, 0, -11, -11]
        ],

        animations: {
            bg_sakura: { frames: [0] },
            bg_original: { frames: [1] },
            tut: { frames: [2] },
            icon: { frames: [3] },
            body_dino: { frames: [4] },
            owl: { frames: [5] },
            out_red: { frames: [20, 48, 49, 11, 6, 18, 22, 39] },
            out_cyan: { frames: [51, 66, 53, 15, 7, 35, 33, 58] },
            out_yellow: { frames: [41, 59, 36, 14, 8, 26, 24, 45] },
            out_green: { frames: [46, 65, 37, 12, 9, 27, 25, 55] },
            out_pink: { frames: [47, 67, 38, 13, 10, 30, 31, 57] },
            play_now: { frames: [16] },
            btn_black: { frames: [17] },
            btn_original: { frames: [19] },
            install_now: { frames: [21] },
            btn_sakura: { frames: [23] },
            tay: { frames: [28] },
            B_Clarity: { frames: [29] },
            explosive_ice: { frames: [116, 100, 98, 32, 101, 92, 76, 109, 75, 136] },
            explosive_red: { frames: [43, 103, 60, 70, 34, 112, 125, 80, 93, 63] },
            explosive_yellow: { frames: [126, 110, 105, 71, 40, 104, 127, 83, 95, 119] },
            explosive_clarity: { frames: [135, 134, 99, 133, 42, 72, 52, 89, 91, 84] },
            explosive_green: { frames: [120, 113, 61, 122, 44, 111, 130, 102, 96, 121] },
            explosive_cyan: { frames: [128, 108, 107, 137, 74, 117, 118, 50, 94, 132] },
            CircleLight: { frames: [54] },
            hand_dino: { frames: [56] },
            explosive_pink: { frames: [123, 115, 62, 124, 73, 114, 131, 106, 97, 129] },
            topbar: { frames: [64] },
            avatar: { frames: [68] },
            B_Green: { frames: [69] },
            B_Pink: { frames: [77] },
            B_Cyan: { frames: [78] },
            B_Red: { frames: [79] },
            B_Yellow: { frames: [81] },
            B_Ice: { frames: [82] },
            in_cyan: { frames: [85] },
            in_green: { frames: [86] },
            in_pink: { frames: [87] },
            in_red: { frames: [88] },
            in_yellow: { frames: [90] }
        }
    });
    setLevel()
}
function setLevel() {
    setBackground();
    var icon = new createjs.Sprite(spriteSheet, "icon");
    icon.scale = (stage.canvas.width * 2 / 3) / icon.getBounds().width;
    icon.x = (stage.canvas.width - icon.getBounds().width * icon.scale) / 2
    icon.y = (stage.canvas.height / 10)

    var btnEasy = new createjs.Sprite(spriteSheet, "btn_black");
    var btnHard = new createjs.Sprite(spriteSheet, "btn_sakura");
    var btnMedium = new createjs.Sprite(spriteSheet, "btn_original");

    btnEasy.scale = btnHard.scale = btnMedium.scale = (stage.canvas.width / 3.5) / btnEasy.getBounds().width;
    btnEasy.y = btnMedium.y = btnHard.y = icon.y + icon.getBounds().height * icon.scale + stage.canvas.height / 12
    btnMedium.x = (stage.canvas.width - btnMedium.getBounds().width * btnMedium.scale) / 2
    btnHard.x = btnMedium.x + (btnMedium.getBounds().width * btnMedium.scale * 1.1)
    btnEasy.x = btnMedium.x - (btnMedium.getBounds().width * btnMedium.scale * 1.1)
    btnEasy.addEventListener("click", () => { clickButton(btnEasy, 0) }, false);
    btnMedium.addEventListener("click", () => { clickButton(btnMedium, 1) }, false);
    btnHard.addEventListener("click", () => { clickButton(btnHard, 2) }, false);

    var txtChoose = new createjs.Text("Choose your favorite theme", "bold 30px Arial", "#f0e592");
    txtChoose.y = btnEasy.y + btnEasy.getBounds().height * btnEasy.scale + stage.canvas.height / 12
    txtChoose.scale = (stage.canvas.width * 2.5) / 3 / txtChoose.getMeasuredWidth();
    txtChoose.x = stage.canvas.width / 2;
    txtChoose.textAlign = "center";
    stage.addChild(icon, btnEasy, btnHard, btnMedium, txtChoose);
    var scaleTxt = txtChoose.scale;
    createjs.Tween.get(txtChoose, { loop: 2 })
        .to({ scale: scaleTxt - 0.2 }, 1000)
        .to({ scale: scaleTxt }, 1000);
    setTimeout(function () {
        createjs.Tween.get(txtChoose).to({ scale: scaleTxt - 0.2, alpha: 0 }, 400);
    }, 4500);
    var handChoose = new createjs.Sprite(spriteSheet, "tay");
    handChoose.scale = (stage.canvas.width / 10) / handChoose.getBounds().width
    handChoose.x = (stage.canvas.width - handChoose.getBounds().width * handChoose.scale) / 2
    handChoose.y = btnMedium.y + btnMedium.getBounds().height * btnMedium.scale / 2

    stage.addChild(handChoose)


    var arrX = [
        btnEasy.x + btnEasy.getBounds().width * btnEasy.scale / 2,
        (stage.canvas.width - handChoose.getBounds().width * handChoose.scale) / 2,
        btnHard.x + btnHard.getBounds().width * btnHard.scale / 2,
    ];
    var to = true;
    const yMove = btnEasy.y + btnEasy.getBounds().height * btnEasy.scale * 2;
    const defaultY = btnMedium.y + btnMedium.getBounds().height * btnMedium.scale / 2;
    var indexXTemp = 1;
    animation()
    moveTayChoose = setInterval(animation, 1300);
    function animation() {
        tayDefault()
        btnEasyDefault()
        btnMediumDefault()
        btnHardDefault()
        var indexX;
        if (to) {
            if (indexXTemp + 1 >= 2) {
                indexX = 2;
                to = false;
            } else indexX = indexXTemp + 1;
        } else {
            if (indexXTemp - 1 <= 0) {
                indexX = 0;
                to = true;
            } else indexX = indexXTemp - 1;
        }
        var tempX = indexXTemp < indexX ? arrX[indexX] - arrX[indexXTemp] : arrX[indexXTemp] - arrX[indexX];
        createjs.Tween.get(handChoose).to({
            guide:
            {
                path: [
                    arrX[indexXTemp], defaultY,
                    tempX, yMove,
                    arrX[indexX], defaultY,
                ]
            }
        }, 1000)
            .call(() => {
                switch (indexX) {
                    case 0:
                        var scale = btnEasy.scale;
                        createjs.Tween.get(btnEasy).to({
                            scale: scale - 0.1,
                            x: btnMedium.x - (btnMedium.getBounds().width * (scale - 0.1) * 1.1)
                        }, 200);
                        tayChoose()
                        break;
                    case 1:
                        var scale = btnMedium.scale;
                        createjs.Tween.get(btnMedium).to({
                            scale: scale - 0.1,
                        }, 200);
                        tayChoose()
                        break;
                    case 2:
                        var scale = btnHard.scale;
                        createjs.Tween.get(btnHard).to({
                            scale: scale - 0.1,
                        }, 200);
                        tayChoose()
                        break;
                    default:
                        return null;
                }
            })
        indexXTemp = indexX
    }
    function tayChoose() {
        var scale = handChoose.scale
        createjs.Tween.get(handChoose).to({
            scale: scale - 0.1,
        }, 200);
    }
    function tayDefault() {
        var scale = (stage.canvas.width / 10) / handChoose.getBounds().width;
        createjs.Tween.get(handChoose).to({
            scale: scale,
        }, 100)
    }
    function btnEasyDefault() {
        var scale = (stage.canvas.width / 3.5) / btnEasy.getBounds().width;
        var btnMediumX = (stage.canvas.width - btnMedium.getBounds().width * scale) / 2
        createjs.Tween.get(btnEasy).to({
            scale: scale,
            x: btnMediumX - (btnMedium.getBounds().width * scale * 1.1)
        }, 100)
    }
    function btnMediumDefault() {
        var scale = (stage.canvas.width / 3.5) / btnEasy.getBounds().width;
        createjs.Tween.get(btnMedium).to({
            scale: scale,
        }, 100)
    }
    function btnHardDefault() {
        var scale = (stage.canvas.width / 3.5) / btnEasy.getBounds().width;
        var btnMediumX = (stage.canvas.width - btnMedium.getBounds().width * scale) / 2
        createjs.Tween.get(btnHard).to({
            scale: scale,
            x: btnMediumX + (btnMedium.getBounds().width * scale * 1.1)
        }, 100)
    }
    function clickButton(target, level) {
        stage.removeChild(handChoose);
        clearInterval(moveTayChoose);
        createjs.Tween.removeTweens(btnEasy)
        createjs.Tween.removeTweens(btnMedium)
        createjs.Tween.removeTweens(btnHard)
        btnEasyDefault()
        btnMediumDefault()
        btnHardDefault()
        var scale = target.scale;
        createjs.Tween.get(target)
            .to({ scale: scale - 0.1 }, 200)
            .wait(100)
            .call(() => {
                startLevel(level)
            })
    }
}
function startLevel(level) {
    clearInterval(moveTayChoose);
    stage.removeAllChildren();

    game.bubble.currentWidth = Math.round((stage.canvas.width / 11) * 100) / 100;
    game.bubble.currentHeight = Math.round((stage.canvas.width / 11) * 100) / 100;
    game.bubble.scale = Math.round((stage.canvas.width / 11 / 50) * 100) / 100;

    game.indexBubbleInlocal = mapIndexD;
    game.map = setMap();

    switch (level) {
        case 1:
            var bg = new createjs.Sprite(spriteSheet, "bg_original");
            bg.scaleX = stage.canvas.width / bg.getBounds().width;
            bg.scaleY = stage.canvas.height / bg.getBounds().height;
            stage.addChild(bg);
            break;
        case 2:
            var bg = new createjs.Sprite(spriteSheet, "bg_sakura");
            bg.scaleX = stage.canvas.width / bg.getBounds().width;
            bg.scaleY = stage.canvas.height / bg.getBounds().height;
            stage.addChild(bg);
            break;
        default:
            break;
    }
    setDinosaursAndBird();
    renderBubble();
    setPlayer(1);
}
function addEvent() {
    if (isMobile) {
        canvas.addEventListener("touchstart", onMouseDown, supportsPassive ? { passive: true } : false);
        canvas.addEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
        canvas.addEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
    } else {
        canvas.addEventListener("mousedown", onMouseDown);
        canvas.addEventListener("mousemove", onPressMove);
        canvas.addEventListener("mouseup", onMouseUp);
    }
}
function removeEvent() {
    if (isMobile) {
        canvas.removeEventListener("touchstart", onMouseDown, supportsPassive ? { passive: true } : false);
        canvas.removeEventListener("touchmove", onPressMove, supportsPassive ? { passive: true } : false);
        canvas.removeEventListener("touchend", onMouseUp, supportsPassive ? { passive: true } : false);
    } else {
        canvas.removeEventListener("mousedown", onMouseDown);
        canvas.removeEventListener("mousemove", onPressMove);
        canvas.removeEventListener("mouseup", onMouseUp);
    }
}
function setStage() {
    canvas = document.getElementById("myCanvas");
    stage = new createjs.Stage(canvas);
    stage.mouseMoveOutside = true;
    canvas.height = height;
    canvas.width = width;
    addEvent();
    console.log('width ', width);
    console.log('height ', height);
}
function convertAnimations(color) {
    switch (color) {
        case 0:
            return "explosive_blue";
        case 1:
            return "explosive_red";
        case 2:
            return "explosive_yellow";
        case 3:
            return "explosive_green";
        case 4:
            return "explosive_pink";
        case 5:
            return "explosive_purple";
        case 6:
            return "explosive_cyan";
        case 7:
            return "explosive_clarity";
        case 8:
            return "explosive_ice";
        case 10:
            return "out_blue";
        case 11:
            return "out_red";
        case 12:
            return "out_yellow";
        case 13:
            return "out_green";
        case 14:
            return "out_pink";
        case 15:
            return "out_purple";
        case 16:
            return "out_cyan";
        default:
            return null;
    }
}
function setMap() {
    rowDuong = Math.floor((stage.canvas.height * 1.8) / 3 / (game.bubble.currentHeight * 0.87));
    var rowAm = game.indexBubbleInlocal.length - rowDuong;
    var locationArr = [];
    var maxRow = Math.floor(stage.canvas.height / (game.bubble.currentHeight * 0.87));

    for (let i = 0; i < (game.indexBubbleInlocal.length > maxRow ? game.indexBubbleInlocal.length : maxRow) + 7; i++) {
        var x = game.bubble.currentWidth,
            y = rowAm > 0 ? (i - rowAm) * game.bubble.currentHeight * 0.87 : i * game.bubble.currentHeight * 0.87;
        var arr = [];
        if ((i > 0 && i % 2 != 0) || i == 0) {
            for (let j = 0; j < 11; j++) {
                var xb = j * x;
                xb -= game.bubble.currentWidth / 20;
                arr.push({ x: xb, y: y, existing: false, bubble: null, color: null, checked: false, checkAlone: false, vibration: false });
            }
        } else {
            for (let j = 0; j < 10; j++) {
                var xb = j * x;
                xb += x / 2;
                xb -= game.bubble.currentWidth / 20;
                arr.push({ x: xb, y: y, existing: false, bubble: null, color: null, checked: false, checkAlone: false, vibration: false });
            }
        }
        locationArr.push(arr);
    }

    return locationArr;
}
function lToIndex(x, y) {
    var estimateY = Math.floor(y / (Math.round(game.bubble.currentHeight * 0.87 * 100) / 100));
    x += Math.round(((game.bubble.currentWidth / 20) * 100) / 100);

    if (mapDuong[0].length == 11 && mapDuong[1].length == 10) {
        if (estimateY % 2 != 0) x -= Math.round(((game.bubble.currentWidth / 2) * 100) / 100);
        if (estimateY > 25) estimateY = 25;
        var estimateX = Math.floor(x / game.bubble.currentWidth, 0);
        if (estimateX < 0) estimateX = 0;
        if (estimateX > 10) estimateX = 10;
        if (estimateY % 2 != 0 && estimateX > 9) estimateX = 9;
        return { x: estimateX, y: estimateY };
    } else if (mapDuong[0].length == 10 && mapDuong[1].length == 11) {
        if (estimateY % 2 == 0) x -= Math.round(((game.bubble.currentWidth / 2) * 100) / 100);
        if (estimateY > 25) estimateY = 25;
        var estimateX = Math.floor(x / game.bubble.currentWidth, 0);
        if (estimateX < 0) estimateX = 0;
        if (estimateX > 10) estimateX = 10;
        if (estimateY % 2 == 0 && estimateX > 9) estimateX = 9;
        return { x: estimateX, y: estimateY };
    } else {
        if (estimateY % 2 == 0 && estimateY > 1) x -= Math.round(((game.bubble.currentWidth / 2) * 100) / 100);
        if (estimateY > 25) estimateY = 25;
        var estimateX = Math.floor(x / game.bubble.currentWidth, 0);
        if (estimateX < 0) estimateX = 0;
        if (estimateX > 10) estimateX = 10;
        if (estimateY % 2 == 0 && estimateY > 1 && estimateX > 9) estimateX = 9;
        return { x: estimateX, y: estimateY };
    }


}
function convertIdtoBubble(id) {
    switch (id) {
        case 0:
            return "B_Blue";
        case 1:
            return "B_Red";
        case 2:
            return "B_Yellow";
        case 3:
            return "B_Green";
        case 4:
            return "B_Pink";
        case 5:
            return "B_Purple";
        case 6:
            return "B_Cyan";
        case 7:
            return "B_Clarity";
        case 8:
            return "B_Ice";
        case 10:
            return "in_blue";
        case 11:
            return "in_red";
        case 12:
            return "in_yellow";
        case 13:
            return "in_green";
        case 14:
            return "in_pink";
        case 15:
            return "in_purple";
        case 16:
            return "in_cyan";
        case 100:
            return "topbar";
        default:
            return null;
    }
}
function setBackground() {
    var ss = new createjs.SpriteSheet({
        images: [queue.getResult("bubble_full")],
        framerate: 25,
        frames: [
            [283, 1, 184, 322, 0, 0, 0],
        ],

        animations: {
            bg_choose: { frames: [0] },
        }
    });
    var bg = new createjs.Sprite(ss, "bg_choose");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;
    stage.addChild(bg);
}
function setDinosaursAndBird() {
    var dinosaur = new createjs.Container();
    var body_dinosaur = new createjs.Sprite(spriteSheet, "body_dino");
    body_dinosaur.scale = (stage.canvas.width / 3) / body_dinosaur.getBounds().width;
    body_dinosaur.x = stage.canvas.width / 2.9 - body_dinosaur.getBounds().width * body_dinosaur.scale;
    body_dinosaur.y = stage.canvas.height - body_dinosaur.getBounds().height * body_dinosaur.scale - stage.canvas.height / 11;

    var hand_dinosaur = new createjs.Sprite(spriteSheet, "hand_dino");
    hand_dinosaur.scaleX = body_dinosaur.scaleX;
    hand_dinosaur.scaleY = body_dinosaur.scaleX;
    hand_dinosaur.x = stage.canvas.width / 3 - (body_dinosaur.getBounds().width * body_dinosaur.scaleX) / 2;
    hand_dinosaur.y = stage.canvas.height - (body_dinosaur.getBounds().height * body_dinosaur.scaleX) / 2.1 - stage.canvas.height / 11;
    dinosaur.addChild(body_dinosaur, hand_dinosaur);

    install_now = new createjs.Sprite(spriteSheet, "install_now");
    install_now.scaleX = stage.canvas.width / 4.5 / install_now.getBounds().width;
    install_now.scaleY = stage.canvas.width / 4.5 / install_now.getBounds().width;
    install_now.x = (stage.canvas.width - install_now.getBounds().width * install_now.scaleX) / 2;
    install_now.y = stage.canvas.height - install_now.getBounds().height * install_now.scaleY * 1.7;

    createjs.Tween.get(hand_dinosaur, { loop: true }).to({ rotation: -25 }, 1000).to({ rotation: 0 }, 1000);

    var bird = new createjs.Sprite(spriteSheet, "owl");
    bird.scale = stage.canvas.width / 5 / bird.getBounds().width;
    bird.x = (stage.canvas.width * 2.8) / 5 + (bird.getBounds().width * bird.scaleX * 2) / 3;
    bird.y = stage.canvas.height - bird.getBounds().height * bird.scaleX - stage.canvas.height / 11;
    stage.addChild(dinosaur, bird, install_now);
    var x = install_now.x,
        y = install_now.y,
        scale = stage.canvas.width / 4.5 / install_now.getBounds().width;
    createjs.Tween.get(install_now, { loop: true })
        .to(
            {
                scaleX: stage.canvas.width / 7 / bird.getBounds().width,
                scaleY: stage.canvas.width / 7 / bird.getBounds().width,
                x: (stage.canvas.width - (stage.canvas.width / 7 / bird.getBounds().width) * install_now.getBounds().width) / 2,
                y: y - (stage.canvas.width / 7 - stage.canvas.width / 8) / 10,
            },
            500,
            createjs.Ease.linear
        )
        .to({ scaleX: scale, scaleY: scale, x: x, y: y }, 500, createjs.Ease.linear);
    install_now.addEventListener("click", () => { getLinkInstall() }, false);
    outer1 = new createjs.Sprite(spriteSheet, "CircleLight");
    outer1.scale = stage.canvas.width / 5.2 / outer1.getBounds().width;
    outer1.regX = outer1.regY = outer1.getBounds().width / 2;
    outer1.x = stage.canvas.width / 2 + outer1.getBounds().width / 32;
    outer1.y = body_dinosaur.y + body_dinosaur.getBounds().height * body_dinosaur.scale - outer1.getBounds().height * outer1.scale / 1.4;

    outer2 = outer1.clone();

    textLife = new createjs.Text(life, "bold 22px Arial", "#f0e592");
    textLife.scale = (stage.canvas.width / 20) / textLife.getMeasuredWidth();
    textLife.x = (stage.canvas.width - textLife.getMeasuredWidth() * textLife.scale) / 2

    player.y = outer1.y - game.bubble.currentHeight * 1.3;
    textLife.y = outer1.y - outer1.regX / 5

    stage.addChild(outer1, outer2, textLife);
}
function renderBubble() {
    var arr = game.indexBubbleInlocal;

    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            var id = arr[y][x];
            if (id == 100) {
                var bars = new createjs.Sprite(spriteSheet, convertIdtoBubble(id));
                var a = game.map[y][x];
                bars.scaleX = stage.canvas.width / 10.4 / bars.getBounds().width;
                bars.scaleY = game.bubble.currentHeight / bars.getBounds().height;
                bars.x = a.x;
                bars.y = a.y;
                containerMain.addChild(bars);
                game.map[y][x] = { x: a.x, y: a.y, existing: true, bubble: bars, color: id, checked: false, checkAlone: false, vibration: false };
            } else if (id >= 0 && id <= 8) {
                var bubble = new createjs.Sprite(spriteSheet, convertIdtoBubble(id));
                var a = game.map[y][x];
                bubble.scaleX = stage.canvas.width / 10.4 / bubble.getBounds().width;
                bubble.scaleY = stage.canvas.width / 10.4 / bubble.getBounds().width;
                bubble.x = a.x;
                bubble.y = a.y;
                containerMain.addChild(bubble);
                game.map[y][x] = { x: a.x, y: a.y, existing: true, bubble: bubble, color: id, checked: false, checkAlone: false, vibration: false };
            } else if (id >= 10 && id < 20) {
                var bubble = new createjs.Sprite(spriteSheet, convertIdtoBubble(id));
                var a = game.map[y][x];
                bubble.scaleX = stage.canvas.width / 11.7 / bubble.getBounds().width;
                bubble.scaleY = stage.canvas.width / 11.7 / bubble.getBounds().width;
                bubble.x = a.x;
                bubble.y = a.y;
                containerMain.addChild(bubble);
                game.map[y][x] = { x: a.x, y: a.y, existing: true, bubble: bubble, color: id, checked: false, checkAlone: false, vibration: false };
            }
        }
    }

    game.map.forEach((row) => {
        if (row[0].y >= 0) mapDuong.push(row);
        else if (row[0].y < 0) mapAm.push(row);
    });
    stage.addChild(containerMain);
    containerPoint = new createjs.Container();
    var circle = new createjs.Shape();
    circle.graphics
        .ss(stage.canvas.width / 100)
        .s("#4231c4")
        .f("#150c62")
        .dc(0, 0, stage.canvas.width / 26);
    circle.x = stage.canvas.width / 23;
    circle.y = stage.canvas.height * 0.025;
    var rect = new createjs.Shape();
    rect.graphics
        .ss(stage.canvas.width / 100)
        .s("#3e2ebb")
        .f("#ffffff")
        .rc(0, 0, stage.canvas.width / 5.6, stage.canvas.height / 26, 0, stage.canvas.width / 35, stage.canvas.width / 35, 0);
    rect.y = -stage.canvas.height / 52;
    rect.x = stage.canvas.width / 20;
    rect.y = stage.canvas.height * 0.025 - stage.canvas.height / 52;
    text_scores = new createjs.Text(game.scores + " / " + game.total_score, "bold 22px Impact", "#722b1b");
    text_scores.x = stage.canvas.width / 11;
    text_scores.y = stage.canvas.height * 0.035;
    text_scores.scale = stage.canvas.width / 555;
    text_scores.textBaseline = "alphabetic";
    avatar = new createjs.Sprite(spriteSheet, "avatar");
    avatar.scaleX = stage.canvas.width / 15 / avatar.getBounds().width;
    avatar.scaleY = stage.canvas.height / 26 / avatar.getBounds().height;
    avatar.regX = (avatar.getBounds().width * avatar.scaleX) / 2;
    avatar.regY = (avatar.getBounds().height * avatar.scaleY) / 2;
    avatar.x = stage.canvas.width / 35;
    avatar.y = stage.canvas.height * 0.015;
    if (window.orientation == 90 || window.orientation == -90) {
        avatar.x = stage.canvas.width / 40;
        avatar.y = stage.canvas.height * 0.01;
    }
    tay = new createjs.Container();
    var hand = new createjs.Sprite(spriteSheet, "tay");
    hand.scale = stage.canvas.width / 420;
    hand.x = stage.canvas.width / 2 - (hand.getBounds().width * hand.scale) / 2;
    hand.y = (stage.canvas.height * 1.9) / 3;
    var tut = new createjs.Sprite(spriteSheet, "tut");
    tut.scaleX = (stage.canvas.width * 2.5) / 3 / tut.getBounds().width;
    tut.scaleY = stage.canvas.height / 35 / tut.getBounds().height;
    tut.x = stage.canvas.width / 2 - (tut.getBounds().width * tut.scaleX) / 2;
    tut.y = (stage.canvas.height * 1.85) / 3;
    createjs.Tween.get(hand, { loop: true })
        .to({ x: (stage.canvas.width * 3.6) / 5 }, 800)
        .to({ x: stage.canvas.width / 2 - (hand.getBounds().width * hand.scale) / 2 }, 1000)
        .to({ x: (stage.canvas.width * 0.5) / 5 }, 800)
        .to({ x: stage.canvas.width / 2 - (hand.getBounds().width * hand.scale) / 2 }, 1000);
    tay.addChild(tut, hand);
    containerPoint.addChild(rect, circle, text_scores, avatar);
    stage.addChild(containerPoint);

}
function setPlayer(color) {
    var id;
    if (color) id = color;
    else {
        updateColor();
        id = player.color[Math.floor(Math.random() * player.color.length)];
    }
    var bubble = new createjs.Sprite(spriteSheet, convertIdtoBubble(id));
    bubble.scaleX = game.bubble.scale;
    bubble.scaleY = game.bubble.scale;
    bubble.x = stage.canvas.width / 2 - game.bubble.currentWidth / 2;
    bubble.y = player.y;
    player.x = stage.canvas.width / 2;
    player.y = player.y;
    player.currentColor = id;
    player.bubble = bubble;
    stage.addChild(bubble);
    var complete = checkComplete();
    if (complete == false) addEvent();
}
function updateColor() {
    var arColor = [];
    player.color = [];

    var itemEnd = getItemEnd();
    console.log(itemEnd);
    if (itemEnd.y != 0) {
        for (let i = 0; i <= 11; i++) {
            loop1:
            for (let row = itemEnd.y; row >= 0; row--) {
                var item = mapDuong[row][i]
                if (item) {
                    if (item.color != null && item.color < 20 && item.color != 7 && item.color != 8) {
                        if (item.color >= 10) {
                            arColor.push(item.color - 10);
                            break loop1;
                        } else {
                            arColor.push(item.color);
                            break loop1;
                        };
                    };
                }
            }
        }
    } else {
        for (let i = 0; i < mapDuong[0].length; i++) {
            const element = mapDuong[0][i];
            if (item.color != null && item.color < 20 && item.color != 7 && item.color != 8) {
                if (item.color >= 10) {
                    arColor.push(item.color - 10);
                } else {
                    arColor.push(item.color);
                };
            };
        }
    }
    player.color = arColor;
    if (player.color.length == 0) player.color.push(1);
}
function radToDeg(x, y) {
    return (Math.atan2(y, x) * 180) / Math.PI;
}
function degToRad(angle) {
    return angle * (Math.PI / 180);
}
function getTanAngle(angle) {
    return Math.tan((angle * Math.PI) / 180);
}
function renderDotLine() {
    indexClarity = [];
    if (containerLine) {
        stage.removeChild(containerLine);
        containerLine = new createjs.Container();
    }
    var dotLineArr = [];
    var turnCheck = [];
    var check = true;
    if (player.angle < 90) {
        drawDotLeft();
    } else {
        drawDotRight();
    }
    function setCheck() {
        if (check == true) turnCheck[turnCheck.length - 1] == 0 ? drawDotRight() : drawDotLeft();
    }
    function drawDotLeft() {
        var startX = player.x,
            startY = player.y,
            sideK = startX;
        if (dotLineArr.length != 0) {
            startX = dotLineArr[dotLineArr.length - 1].x;
            startY = dotLineArr[dotLineArr.length - 1].y;
            sideK = stage.canvas.width;
        }
        var cosAngle = Math.abs(Math.cos(degToRad(player.angle)));
        var sideHMax = sideK / cosAngle;
        var tanAngle = Math.abs(getTanAngle(player.angle));
        for (var sideH = 0; sideH < sideHMax + stage.canvas.width / 19.5; sideH += stage.canvas.width / 19.5) {
            if (sideH > sideHMax) sideH = sideHMax;
            var sideKNew = cosAngle * sideH;
            var sideD = sideKNew * tanAngle;
            checkEndLine(startX - sideKNew, startY - sideD);
            if (checkEndLine(startX - sideKNew, startY - sideD)) {
                check = false;
                return;
            }
            dotLineArr.push({ x: startX - sideKNew, y: startY - sideD });
        }
        if (dotLineArr[dotLineArr.length - 1].y <= 0) check = false;
        turnCheck.push(0);
        setCheck();
    }
    function drawDotRight() {
        var startX = player.x,
            startY = player.y,
            sideK = startX;
        if (dotLineArr.length != 0) {
            startX = dotLineArr[dotLineArr.length - 1].x;
            startY = dotLineArr[dotLineArr.length - 1].y;
            sideK = stage.canvas.width;
        }
        var cosAngle = Math.abs(Math.cos(degToRad(180 - player.angle)));
        var sideHMax = sideK / cosAngle;
        var tanAngle = Math.abs(getTanAngle(180 - player.angle));
        for (var sideH = 0; sideH < sideHMax + stage.canvas.width / 19.5; sideH += stage.canvas.width / 19.5) {
            if (sideH > sideHMax) sideH = sideHMax;
            var sideKNew = cosAngle * sideH;
            var sideD = sideKNew * tanAngle;
            if (checkEndLine(startX + sideKNew, startY - sideD)) {
                check = false;
                return;
            }
            dotLineArr.push({ x: startX + sideKNew, y: startY - sideD });
        }
        if (dotLineArr[dotLineArr.length - 1].y <= 0) check = false;
        turnCheck.push(1);
        setCheck();
    }
    function checkEndLine(x, y) {
        if (y >= 0) {
            var index = lToIndex(x, y);
            var item = mapDuong[index.y][index.x];
            if (item.existing) {
                if (item.color == 7) {
                    indexClarity.push({ x: index.x, y: index.y, item: item, remove: false });
                } else return item.existing;
            }
        }
    }
    var a0 = dotLineArr.filter((dot) => dot.y >= 0);
    a0.shift();
    a0.forEach((dot) => {
        drawDot(dot.x, dot.y);
    });
    var dotEnd = a0[a0.length - 1];
    var index = lToIndex(dotEnd.x, dotEnd.y);
    player.end = index;
    var a = a0.filter((dot) => dot.x == 0 || dot.x == stage.canvas.width);
    destinations = removeDuplicates(a);
    destinations.push({ x: mapDuong[index.y][index.x].x, y: mapDuong[index.y][index.x].y });
    for (let i = 0; i < destinations.length; i++) {
        if (destinations[i].x == stage.canvas.width) destinations[i] = { x: destinations[i].x - game.bubble.currentWidth, y: destinations[i].y };
    }
    stage.addChild(containerLine);
}
function drawDot(x, y) {
    var dot = new createjs.Sprite(spriteSheet, convertIdtoBubble(player.currentColor));
    dot.scaleX = game.bubble.scale;
    dot.scaleY = game.bubble.scale;
    dot.scaleX = stage.canvas.width / 30 / game.bubble.width;
    dot.scaleY = stage.canvas.width / 30 / game.bubble.width;
    dot.x = x;
    dot.y = y;
    containerLine.addChild(dot);
}
function removeDuplicates(arr) {
    var dataArr = arr.map((item) => {
        return [JSON.stringify(item), item];
    });
    var maparr = new Map(dataArr);
    return [...maparr.values()];
}
function moveBubbleEnd() {
    var bubble = player.bubble.clone();
    var aReality = player.end;
    var loacaton = mapDuong[aReality.y][aReality.x];
    containerMain.addChild(bubble);
    mapDuong[aReality.y][aReality.x] = { x: loacaton.x, y: loacaton.y, existing: true, bubble: bubble, color: player.currentColor, checked: false, checkAlone: false, vibration: false };
    refreshMap();
    stage.removeChild(player.bubble);
    player.end = null;
    player.bubble = null;
    destinations = [];
    vibration(aReality.x, aReality.y);

}
function updateAllCheck() {
    for (let i = 0; i < mapDuong.length; i++) {
        const row = mapDuong[i];
        for (let j = 0; j < row.length; j++) {
            const item = row[j];
            mapDuong[i][j] = { x: item.x, y: item.y, existing: item.existing, bubble: item.bubble, color: item.color, checked: false, checkAlone: false, vibration: false };
            refreshMap();
        }
    }
}
function refreshMap() {
    game.map = [];
    var newMap = [];
    mapDuong.forEach((row) => {
        if (row[0].y <= stage.canvas.height) newMap.push(row);
    });
    mapDuong = newMap;
    game.map = mapAm.concat(mapDuong);
}
async function vibration(x, y) {
    var arr = [];
    var a = x,
        b = y;
    await setVibration(x, y);
    var arr1 = await delaminations(x, y, 1);
    var arr2 = await delaminations(x, y, 2);
    var arr3 = await delaminations(x, y, 3);
    var index = mapDuong[y][x];
    mapDuong[y][x] = { x: index.x, y: index.y, existing: index.existing, bubble: index.bubble, color: index.color, checked: index.checked, checkAlone: index.checkAlone, vibration: false };
    refreshMap();
    await moveVibration(arr1, 7, 1);
    await moveVibration(arr2, 5, 2);
    moveVibration(arr3, 2, 3);
    async function moveVibration(arr, side, turn) {
        arr.forEach((element) => {
            var bubbles = mapDuong[element.y][element.x];
            var oldx = bubbles.x;
            var oldy = bubbles.y;
            var newIndex = setMove(index.x, index.y, oldx, oldy, side);
            mapDuong[element.y][element.x] = { x: bubbles.x, y: bubbles.y, existing: bubbles.existing, bubble: bubbles.bubble, color: bubbles.color, checked: bubbles.checked, checkAlone: bubbles.checkAlone, vibration: false };
            refreshMap();
            createjs.Tween.get(bubbles.bubble).to({ x: newIndex.x, y: newIndex.y }, 100).to({ x: oldx, y: oldy }, 100);
        });
        if (turn === 3) {
            await removeIce(x, y);
            removeBubble(x, y);
        }
    }
    function setVibration(x, y) {
        if (x < a + 3 && x > a - 3 && y < b + 3 && y > b - 3) boom(x, y, checkVibration);
    }
    function checkVibration(direction, x, y) {
        var index = renderXY(direction, x, y);
        var bubble = mapDuong[index.y][index.x];
        if (bubble.vibration == false) {
            mapDuong[index.y][index.x] = { x: bubble.x, y: bubble.y, existing: bubble.existing, bubble: bubble.bubble, color: bubble.color, checked: bubble.checked, checkAlone: bubble.checkAlone, vibration: true };
            refreshMap();
            if (mapDuong[index.y][index.x].existing == true && y != 0) {
                arr.push({ x: index.x, y: index.y });
                setVibration(index.x, index.y);
            }
        }
    }
    function delaminations(x, y, turn) {
        var array = [];
        var a = arr.filter((bubble) => (bubble.y == y - turn && bubble.x >= x - turn && bubble.x < x + turn) || (bubble.y == y + turn && bubble.x >= x - turn && bubble.x < x + turn));
        var b = arr.filter((bubble) => (bubble.x == x - turn && bubble.y >= y - turn && bubble.y < y + turn) || (bubble.x == x + turn && bubble.y >= y - turn && bubble.y < y + turn));
        var xNew = a.concat(b);
        xNew.forEach((element) => {
            if (array.indexOf(element) < 0) array.push(element);
        });
        return array;
    }
}
function boom(x, y, check) {
    if (mapDuong[0].length == 11 && mapDuong[1].length == 10) {
        if (y == 0) {
            if (x == 0) {
                check("Right", x, y);
                check("Bottom", x, y);
            } else if (x == 10) {
                check("Left", x, y);
                check("BottomLeft", x, y);
            } else {
                check("Left", x, y);
                check("Right", x, y);
                check("Bottom", x, y);
                check("BottomLeft", x, y);
            }
        } else if (y > 0 && y % 2 == 0) {
            if (x == 0) {
                check("Top", x, y);
                check("Right", x, y);
                check("Bottom", x, y);
            } else if (x == 10) {
                check("Left", x, y);
                check("TopLeft", x, y);
                check("BottomLeft", x, y);
            } else {
                check("Left", x, y);
                check("TopLeft", x, y);
                check("Top", x, y);
                check("Right", x, y);
                check("Bottom", x, y);
                check("BottomLeft", x, y);
            }
        } else {
            if (x == 0) {
                check("Top", x, y);
                check("TopRight", x, y);
                check("Right", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            } else if (x == 9) {
                check("Left", x, y);
                check("Top", x, y);
                check("TopRight", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            } else {
                check("Left", x, y);
                check("Top", x, y);
                check("TopRight", x, y);
                check("Right", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            }
        }
    } else if (mapDuong[0].length == 10 && mapDuong[1].length == 11) {
        if (y == 0) {
            if (x == 0) {
                check("Right", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            } else if (x == 9) {
                check("Left", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            } else {
                check("Left", x, y);
                check("Right", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            }
        } else if (y > 0 && y % 2 == 0) {
            if (x == 0) {
                check("Top", x, y);
                check("TopRight", x, y);
                check("Right", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            } else if (x == 9) {
                check("Left", x, y);
                check("Top", x, y);
                check("TopRight", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            } else {
                check("Left", x, y);
                check("Top", x, y);
                check("TopRight", x, y);
                check("Right", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            }
        } else {
            if (x == 0) {
                check("Top", x, y);
                check("Right", x, y);
                check("Bottom", x, y);
            } else if (x == 10) {
                check("Left", x, y);
                check("TopLeft", x, y);
                check("BottomLeft", x, y);
            } else {
                check("Left", x, y);
                check("TopLeft", x, y);
                check("Top", x, y);
                check("Right", x, y);
                check("Bottom", x, y);
                check("BottomLeft", x, y);
            }
        }
    } else {
        if (y == 0) {
            if (x == 0) {
                check("Right", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
            } else if (x == 10) {
                check("Left", x, y);
                check("BottomLeft", x, y);
                check("Bottom", x, y);
            } else {
                check("Left", x, y);
                check("Right", x, y);
                check("BottomRight", x, y);
                check("Bottom", x, y);
                check("BottomLeft", x, y);
            }
        } else if (y == 1) {
            if (x == 0) {
                check("Top", x, y);
                check("TopRight", x, y);
                check("Right", x, y);
                check("Bottom", x, y);
            } else if (x == 10) {
                check("Left", x, y);
                check("TopLeft", x, y);
                check("Top", x, y);
                check("BottomLeft", x, y);
            } else {
                check("Left", x, y);
                check("TopLeft", x, y);
                check("Top", x, y);
                check("TopRight", x, y);
                check("Right", x, y);
                check("Bottom", x, y);
                check("BottomLeft", x, y);
            }
        } else if (y > 0 && y % 2 == 0) {
            check("Top", x, y);
            check("TopRight", x, y);
            check("BottomRight", x, y);
            check("Bottom", x, y);
            if (x == 0) {
                check("Right", x, y);
            } else if (x == 9) {
                check("Left", x, y);
            } else {
                check("Left", x, y);
                check("Right", x, y);
            }
        } else {
            if (x == 0) {
                check("Top", x, y);
                check("Right", x, y);
                check("Bottom", x, y);
            } else if (x == 10) {
                check("Left", x, y);
                check("TopLeft", x, y);
                check("BottomLeft", x, y);
            } else {
                check("Left", x, y);
                check("TopLeft", x, y);
                check("Top", x, y);
                check("Right", x, y);
                check("Bottom", x, y);
                check("BottomLeft", x, y);
            }
        }

    }
}
function setMove(x1, y1, x2, y2, anpha) {
    x = x2 - x1;
    y = y2 - y1;
    if (x < 0) {
        var xNew = x2 - anpha;
        if (y < 0) {
            var yNew = y2 - (anpha * (y1 - y2)) / (x1 - x2);
            return { x: xNew, y: yNew };
        } else if (y == 0) {
            var yNew = y2;
            xNew = x2 - 2 * anpha;
            return { x: xNew, y: yNew };
        } else {
            var yNew = y2 + (anpha * (y2 - y1)) / (x1 - x2);
            return { x: xNew, y: yNew };
        }
    } else if (x == 0) {
        var xNew = x1;
        if (y < 0) {
            var yNew = y2 - 3 * anpha;
            return { x: xNew, y: yNew };
        } else if (y == 0) {
            var yNew = y2;
            return { x: xNew, y: yNew };
        } else {
            var yNew = y2 - anpha;
            return { x: xNew, y: yNew };
        }
    } else {
        var xNew = x2 + anpha;
        if (y < 0) {
            var yNew = y2 - (anpha * (y1 - y2)) / (x2 - x1);
            return { x: xNew, y: yNew };
        } else if (y == 0) {
            var yNew = y2;
            xNew = x2 + 2 * anpha;
            return { x: xNew, y: yNew };
        } else {
            var yNew = y2 + (anpha * (y2 - y1)) / (x2 - x1);
            return { x: xNew, y: yNew };
        }
    }
}
function checkDie(direction, x, y) {
    var index = renderXY(direction, x, y);
    var a = mapDuong[index.y][index.x];
    var color = a.color >= 10 && a.color < 20 ? a.color - 10 : a.color;
    var color1 = mapDuong[y][x].color >= 10 && mapDuong[y][x].color < 20 ? mapDuong[y][x].color - 10 : mapDuong[y][x].color;
    if (a.existing == true) {
        if (color1 == color && a.checked == false) {
            mapDuong[index.y][index.x] = { x: a.x, y: a.y, existing: a.existing, bubble: a.bubble, color: a.color, checked: true, checkAlone: a.checkAlone, vibration: a.vibration };
            boom(index.x, index.y, checkDie);
            bubbleRemove.push({ x: index.x, y: index.y, obj: mapDuong[index.y][index.x] });
            updateLocationEmpty(index.x, index.y);
        }
    }
}
function checkIce(direction, x, y) {
    var index = renderXY(direction, x, y);
    var a = mapDuong[index.y][index.x];
    var color = a.color >= 10 && a.color < 20 ? a.color - 10 : a.color;
    if (a.existing == true) {
        if (color == 8 && a.checked == false) {
            iceBuble.push({ x: a.x, y: a.y, color: player.currentColor, index: index });
            containerMain.removeChild(a.bubble);
            var bubbleNew = new createjs.Sprite(spriteSheet, convertIdtoBubble(player.currentColor));
            bubbleNew.scaleX = stage.canvas.width / 10.4 / bubbleNew.getBounds().width;
            bubbleNew.scaleY = stage.canvas.width / 10.4 / bubbleNew.getBounds().width;
            bubbleNew.x = a.x;
            bubbleNew.y = a.y;
            containerMain.addChild(bubbleNew);
            mapDuong[index.y][index.x] = { x: a.x, y: a.y, existing: true, bubble: bubbleNew, color: player.currentColor, checked: true, checkAlone: false, vibration: false };
        }
    }
}
async function removeBubble(x, y) {
    await boom(x, y, checkDie);
    if (bubbleRemove.length >= 3) {
        var arrL = [],
            arrS = [];
        bubbleRemove.forEach((index) => {
            index.y >= y ? arrL.push(index) : arrS.push(index);
        });
        arrL.sort((a, b) => Number(a.y) - Number(b.y));
        arrS.sort((a, b) => Number(b.y) - Number(a.y));
        var index = 0;
        var bubbleDie1 = setInterval(function () {
            if (index < arrL.length) {
                var a = arrL[index].obj;
                containerMain.removeChild(a.bubble);
                bubbleDie(a.color, a.x, a.y);
                removeIce(arrL[index].x, arrL[index].y)
                refreshMap();
                if (arrL.length > arrS.length && index == arrL.length - 1) {
                    clearInterval(bubbleDie1);
                    bubbleRemove = [];
                    removeBubbleAlone();
                }
            }
            if (index < arrS.length) {
                var a = arrS[index].obj;
                containerMain.removeChild(a.bubble);
                bubbleDie(a.color, a.x, a.y);
                removeIce(arrS[index].x, arrS[index].y)
                refreshMap();
                if (arrS.length >= arrL.length && index == arrS.length - 1) {
                    clearInterval(bubbleDie1);
                    bubbleRemove = [];
                    removeBubbleAlone();
                }
            }
            index++;
        }, 30);
    } else {
        if (bubbleRemove.length != 0) {
            bubbleRemove.forEach((i) => {
                mapDuong[i.y][i.x] = { x: i.obj.x, y: i.obj.y, existing: i.obj.existing, bubble: i.obj.bubble, color: i.obj.color, checked: false, checkAlone: i.obj.checkAlone, vibration: i.obj.vibration };
            });
            refreshMap();
        }
        bubbleRemove = [];
        removeBubbleAlone();
    }
}
async function removeIce(x, y) {
    await boom(x, y, checkIce);
    if (iceBuble.length) {
        for (let i = 0; i < iceBuble.length; i++) {
            const item = iceBuble[i];
            bubbleDie(item.color, item.x, item.y);
        }
        iceBuble = []
        return true
    } else return false
};
function bubbleDie(color, x, y) {
    if (color <= 8) {
        var bubble = new createjs.Sprite(spriteSheet, convertAnimations(color));
        bubble.scale = color == 7 ? (stage.canvas.width / 25) / bubble.getBounds().width : (stage.canvas.width / 10.4) / bubble.getBounds().width;
        bubble.x = x;
        bubble.y = y;
        stage.addChild(bubble);
        bubble.on("animationend", handleComplete);
        function handleComplete() {
            stage.removeChild(this);
            bubble = null;
            if (game.total_score == 0) setStar();
        }

    }
    else if (color >= 10 && color < 20) {
        var item = new createjs.Sprite(spriteSheet, convertAnimations(color));
        item.scaleX = game.bubble.scale;
        item.scaleY = game.bubble.scale;
        item.x = x;
        item.y = y;
        var calculation = Math.floor(Math.random() * 2);
        stage.addChild(item);
        var a = Math.floor(Math.random() * 50) + 50;
        var xNew = calculation == 1 ? (x + a > stage.canvas.width ? stage.canvas.width - item.getBounds().width : x + a) : x - a < 0 ? 0 : x - a;
        createjs.Tween.get(item)
            .to({ y: y + stage.canvas.width / 5 + Math.floor((Math.random() * stage.canvas.width) / 10) }, 400)
            .to({ guide: { path: [x, y + stage.canvas.width / 5 + Math.floor((Math.random() * stage.canvas.width) / 10), xNew, stage.canvas.height / 5, -10, -30] } }, 1100)
            .call(() => {
                stage.removeChild(item);
                game.scores += 1;
                text_scores.text = game.scores + " / " + game.total_score;
                createjs.Tween.get(avatar, { loop: 2 }).to({ rotation: 15 }, 50).to({ rotation: -10 }, 50).to({ rotation: 0 }, 50);
                setStar();
            });
    }
}
function checkAlone(direction, x, y) {
    var index = renderXY(direction, x, y);
    var a = mapDuong[index.y][index.x];
    if (a.existing == true && a.checkAlone == false) {
        mapDuong[index.y][index.x] = { x: a.x, y: a.y, existing: a.existing, bubble: a.bubble, color: a.color, checked: a.checked, checkAlone: true, vibration: a.vibration };
        boom(index.x, index.y, checkAlone);
    }
}
async function getBubbleAlone() {
    for (let i = 0; i < mapDuong[0].length; i++) {
        var a = mapDuong[0][i];
        mapDuong[0][i] = { x: a.x, y: a.y, existing: a.existing, bubble: a.bubble, color: a.color, checked: a.checked, checkAlone: true, vibration: a.vibration };
    }
    for (let j = 0; j < mapDuong[0].length; j++) {
        if (mapDuong[0][j].existing) await boom(j, 0, checkAlone);
    }
    var arr = [];
    var x = 0,
        y = 0;
    mapDuong.forEach((element) => {
        x = 0;
        element.forEach((bubble) => {
            if (bubble.checkAlone == false && bubble.existing == true) {
                arr.push(mapDuong[y][x]);
                updateLocationEmpty(x, y);
            }
            x++;
        });
        y++;
    });
    return arr;
}
function resetAlone() {
    var x = 0,
        y = 0;
    mapDuong.forEach((element) => {
        x = 0;
        element.forEach((bubble) => {
            var a = mapDuong[y][x];
            mapDuong[y][x] = { x: a.x, y: a.y, existing: a.existing, bubble: a.bubble, color: a.color, checked: a.checked, checkAlone: false, vibration: a.vibration };
            x++;
        });
        y++;
    });
    refreshMap();
}
async function removeBubbleAlone() {
    var arr = await getBubbleAlone();
    if (arr.length != 0) {
        var minY = arr[0].y;
        var maxY = arr[0].y;
        arr.forEach((bubble) => {
            if (bubble.y < minY) minY = bubble.y;
        });
        arr.forEach((bubble) => {
            if (bubble.y > maxY) maxY = bubble.y;
        });
        var averageY = (maxY + minY) / 2;
        for (let i = 0; i < arr.length; i++) {
            var rangeX = Math.floor(Math.random() * 2) + 10;
            var calculation = Math.floor(Math.random() * 2);
            var x = arr[i].x;
            var y = arr[i].y;
            var scale = arr[i].bubble.scaleX;
            var x1 = (x1 = x - rangeX < 0 ? 0 : x - rangeX);
            var y1 = y >= averageY ? y - Math.floor(Math.random() * 20) - (y - averageY - 20) : y - Math.floor(Math.random() * 20) - 50;
            if (calculation == 1) x1 = x + rangeX > stage.canvas.width ? stage.canvas.width : x + rangeX;
            createjs.Tween.get(arr[i].bubble)
                .to({ scaleX: scale - 0.1, scaleY: scale - 0.1, x: x1, y: y1 }, 200)
                .to({ y: maxY + 200 }, (maxY + 200 - y) / 0.6)
                .call(async () => {
                    bubbleDie(arr[i].color, arr[i].bubble.x, arr[i].bubble.y);
                    containerMain.removeChild(arr[i].bubble);
                    arr[i].bubble = null;
                    if (i == arr.length - 1) {
                        var itemEnd = getItemEnd();
                        addRow();
                        if (mapAm.length > 0) {
                            if (itemEnd.y < rowDuong - 1) {
                                turnDow();
                            } else if (itemEnd.y > rowDuong - 1) {
                                turnUp();
                            }
                        };
                        addEvent();
                        resetAlone();
                        setLose();
                        setPlayer();
                    };
                });


        }
    } else {
        var itemEnd = getItemEnd();
        addRow();
        if (mapAm.length > 0) {
            if (itemEnd.y < rowDuong - 1) {
                turnDow();
            } else if (itemEnd.y > rowDuong - 1) {
                turnUp();
            }
        }
        removeEvent()
        resetAlone();
        setPlayer();
        setLose();
    }
}
function addRow() {
    const yMax = mapDuong[mapDuong.length - 1][0].y;
    const col = mapDuong[mapDuong.length - 1];
    if (yMax < stage.canvas.height - game.bubble.currentHeight * 0.87) {
        const x = game.bubble.currentWidth;
        if (col == 10) {
            var arr = [];
            for (let j = 0; j < 10; j++) {
                var xb = j * x;
                xb += x / 2;
                xb -= game.bubble.currentWidth / 20;
                arr.push({ x: xb, y: yMax + game.bubble.currentHeight * 0.87, existing: false, bubble: null, color: null, checked: false, checkAlone: false, vibration: false });
            }
            mapDuong.push(arr);
        } else {
            var arr = [];
            for (let j = 0; j < 11; j++) {
                var xb = j * x;
                xb -= game.bubble.currentWidth / 20;
                arr.push({ x: xb, y: yMax + game.bubble.currentHeight * 0.87, existing: false, bubble: null, color: null, checked: false, checkAlone: false, vibration: false });
            }
            mapDuong.push(arr);
        }
    }
    refreshMap();
}
function turnDow() {
    var itemEnd = getItemEnd();
    var down = rowDuong - 1 - itemEnd.y > mapAm.length ? mapAm.length : rowDuong - 1 - itemEnd.y;
    var increase = down * game.bubble.currentHeight * 0.87;
    var newMap = [];
    mapAm.forEach((row) => {
        var arr = [];
        row.forEach((item) => {
            arr.push({ x: item.x, y: item.y + increase, existing: item.existing, bubble: item.bubble, color: item.color, checked: item.checked, checkAlone: item.checkAlone, vibration: item.vibration });
        });
        newMap.push(arr);
    });
    mapAm = newMap;
    newMap = [];
    mapDuong.forEach((row) => {
        var arr = [];
        row.forEach((item) => {
            arr.push({ x: item.x, y: item.y + increase, existing: item.existing, bubble: item.bubble, color: item.color, checked: item.checked, checkAlone: item.checkAlone, vibration: item.vibration });
        });
        newMap.push(arr);
    });
    mapDuong = newMap;
    newMap = [];
    var arrItemSend = mapAm.slice(-down);
    mapAm = mapAm.slice(0, mapAm.length - down);
    var newArr = arrItemSend.concat(mapDuong);
    mapDuong = newArr;
    game.map.forEach((row) => {
        row.forEach((item) => {
            if (item.existing) {
                var bubble = item.bubble;
                createjs.Tween.get(bubble).to({ y: bubble.y + increase }, 500, createjs.Ease.linear);
            }
        });
    });
    refreshMap();
}
function turnUp() {
    var itemEnd = getItemEnd();
    var up = itemEnd.y - (rowDuong - 1);
    var increase = up * game.bubble.currentHeight * 0.87;
    var newMap = [];
    mapAm.forEach((row) => {
        var arr = [];
        row.forEach((item) => {
            arr.push({ x: item.x, y: item.y - increase, existing: item.existing, bubble: item.bubble, color: item.color, checked: item.checked, checkAlone: item.checkAlone, vibration: item.vibration });
        });
        newMap.push(arr);
    });
    mapAm = newMap;
    newMap = [];
    mapDuong.forEach((row) => {
        var arr = [];
        row.forEach((item) => {
            arr.push({ x: item.x, y: item.y - increase, existing: item.existing, bubble: item.bubble, color: item.color, checked: item.checked, checkAlone: item.checkAlone, vibration: item.vibration });
        });
        newMap.push(arr);
    });
    mapDuong = newMap;
    newMap = [];
    var arrItemSend = mapDuong.slice(0, up);
    mapDuong = mapDuong.slice(up);
    var newArr = mapAm.concat(arrItemSend);
    mapAm = newArr;
    game.map.forEach((row) => {
        row.forEach((item) => {
            if (item.existing) {
                var bubble = item.bubble;
                createjs.Tween.get(bubble).to({ y: bubble.y - increase }, 800, createjs.Ease.linear);
            }
        });
    });
    refreshMap();
}
function getItemEnd() {
    var x = 0,
        y = 0;
    var itemEnd = { x: x, y: y, item: null };
    mapDuong.forEach((row) => {
        x = 0;
        row.forEach((item) => {
            if (item.existing) itemEnd = { x: x, y: y, item: item };
            x++;
        });
        y++;
    });
    return itemEnd;
}
function checkComplete() {
    var complete = true;
    var y = 0
    if (mapAm.length > 0) return false;
    else {
        game.map.forEach((element) => {
            var x = 0
            element.forEach((bubble) => {
                if (bubble.existing == true && y != 0) complete = false;
                x++
            });
            y++
        });
        return complete;
    }
}
async function setStar() {
    var complete = await checkComplete();
    if ((complete == true && win == true && game.scores == game.total_score) || (game.scores == game.total_score && win == true && game.total_score != 0)) {
        stage.removeChild(tay);
        clearInterval(handMove);
        win = false;
        removeEvent();

        containerMain.removeAllChildren();
        stage.removeChild(containerLine);
        containerPoint.removeAllChildren();
        stage.removeChild(containerPoint);
        stage.removeChild(install_now);
        setInterval(emitParticles, Math.random() * 700 + 300);
        setInterval(emitParticles, Math.random() * 700 + 300);
        var colorarr = [];
        for (let i = 0; i < game.indexBubbleInlocal.length; i++) {
            for (let j = 0; j < game.indexBubbleInlocal[i].length; j++) {
                if (colorarr.indexOf(game.indexBubbleInlocal[i][j]) === -1 && game.indexBubbleInlocal[i][j] != 100 && game.indexBubbleInlocal[i][j] >= 0 && game.indexBubbleInlocal[i][j] <= 7) {
                    colorarr.push(game.indexBubbleInlocal[i][j]);
                }
            }
        }
        var iBubble = 1;
        var renBubble = setInterval(() => {
            var idBubble = colorarr[Math.floor(Math.random() * colorarr.length)];
            var bubble = new createjs.Sprite(spriteSheet, convertIdtoBubble(idBubble));
            bubble.scaleX = bubble.scaleY = Math.random() * (stage.canvas.width / 365);
            bubble.x = (Math.random() * stage.canvas.width * 6) / 8 + stage.canvas.width / 10;
            bubble.y = (Math.random() * stage.canvas.height) / 3 + stage.canvas.height;
            bubble.alpha = Math.floor(Math.random() * 2) == 1 ? 1 : Math.random() + 0.7;
            stage.addChild(bubble);
            createjs.Tween.get(bubble)
                .to({ y: bubble.y - stage.canvas.height * 0.99, alpha: 0.7 }, 1000, createjs.Ease.linear)
                .call(() => {
                    stage.removeChild(bubble);
                    bubbleDie(idBubble, bubble.x, bubble.y);
                });
            iBubble++;
            if (iBubble == 40) clearInterval(renBubble);
        }, 50);
        game.map.forEach((row) => {
            row.forEach((bubbles) => {
                if (bubbles.existing == true && bubbles.color < 20) {
                    containerMain.removeChild(bubbles.bubble);
                    bubbleDie(bubbles.color, bubbles.x, bubbles.y);
                }
            });
        });
        var btn_continue = new createjs.Sprite(spriteSheet, "play_now");
        btn_continue.scaleX = stage.canvas.width / 3 / btn_continue.getBounds().width;
        btn_continue.scaleY = stage.canvas.width / 3 / btn_continue.getBounds().width;
        btn_continue.x = (stage.canvas.width - btn_continue.scaleX * btn_continue.getBounds().width) / 2;
        btn_continue.y = -btn_continue.getBounds().height;
        stage.addChild(btn_continue);
        createjs.Tween.get(btn_continue)
            .to({ y: stage.canvas.height / 2.6 }, 500, createjs.Ease.linear)
            .call(() => {
                var x = btn_continue.x,
                    y = btn_continue.y,
                    scale = stage.canvas.width / 3 / btn_continue.getBounds().width;
                createjs.Tween.get(btn_continue, { loop: true })
                    .to(
                        {
                            scaleX: stage.canvas.width / 2.5 / btn_continue.getBounds().width,
                            scaleY: stage.canvas.width / 2.5 / btn_continue.getBounds().width,
                            x: (stage.canvas.width - (stage.canvas.width / 2.5 / btn_continue.getBounds().width) * btn_continue.getBounds().width) / 2,
                            y: y - (stage.canvas.width / 2.5 - stage.canvas.width / 3) / 2,
                        },
                        500,
                        createjs.Ease.linear
                    )
                    .to({ scaleX: scale, scaleY: scale, x: x, y: y }, 500, createjs.Ease.linear);
            });
        btn_continue.addEventListener("click", () => { getLinkInstall() }, false);
        removeEvent();
    }
}
async function setLose() {
    var complete = await checkComplete();
    if (complete == false && life == 0 && fail == false) {
        stage.removeChild(tay);
        clearInterval(handMove);
        fail = true
        stage.removeChild(install_now);
        removeEvent();
        var particle = new createjs.Shape();
        particle.graphics.f("#fafafa").dr(0, 0, stage.canvas.width, stage.canvas.height); particle.alpha = 0.3

        var failed = new createjs.Sprite(spriteSheet, "failed");
        failed.scale = (stage.canvas.width * 2) / failed.getBounds().width;
        failed.regX = (failed.getBounds().width) / 2;
        failed.regY = (failed.getBounds().height) / 2;
        var x = (stage.canvas.width - failed.getBounds().width) / 2 + failed.getBounds().width / 2
        failed.x = x
        failed.y = (stage.canvas.height) / 3.5
        failed.rotation = -30

        var play_again = new createjs.Sprite(spriteSheet, "btn_again");
        play_again.scale = stage.canvas.width / 3 / play_again.getBounds().width
        play_again.x = (stage.canvas.width - play_again.getBounds().width * play_again.scale) / 2
        play_again.y = (stage.canvas.height) / 4


        stage.addChild(particle, play_again, failed);

        createjs.Tween.get(failed)
            .to({ scale: (stage.canvas.width * 2.5 / 3) / failed.getBounds().width }, 300, createjs.Ease.linear)
            .to({ x: x - stage.canvas.width / 30 }, 100, createjs.Ease.linear)
            .wait(200)
            .call(
                () => {
                    createjs.Tween.get(failed, { loop: 3 })
                        .to({ x: x + stage.canvas.width / 30 }, 100, createjs.Ease.linear)
                        .to({ x: x - stage.canvas.width / 30 }, 100, createjs.Ease.linear)
                }
            )
        createjs.Tween.get(play_again)
            .wait(600)
            .to({ rotation: 90, x: stage.canvas.width * 2 / 3 }, 300, createjs.Ease.linear)
            .wait(300)
            .to({ rotation: 0, x: (stage.canvas.width - play_again.getBounds().width * play_again.scale) / 2, y: stage.canvas.height * 1.6 / 3 }, 800, createjs.Ease.linear)

        play_again.addEventListener("click", () => { getLinkInstall() }, false);
    }
}
function renderXY(direction, x, y) {
    var xNew = x,
        yNew = y;
    switch (direction) {
        case "Left":
            xNew = x - 1;
            break;
        case "TopLeft":
            xNew = x - 1;
            yNew = y - 1;
            break;
        case "Top":
            yNew = y - 1;
            break;
        case "TopRight":
            xNew = x + 1;
            yNew = y - 1;
            break;
        case "Right":
            xNew = x + 1;
            break;
        case "BottomRight":
            xNew = x + 1;
            yNew = y + 1;
            break;
        case "Bottom":
            yNew = y + 1;
            break;
        case "BottomLeft":
            xNew = x - 1;
            yNew = y + 1;
            break;
    }
    return { x: xNew, y: yNew };
}
function getDistance(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
}
function updateLocationEmpty(x, y) {
    var a = mapDuong[y][x];
    mapDuong[y][x] = { x: a.x, y: a.y, existing: false, bubble: null, color: null, checked: false, checkAlone: false, vibration: false };
    refreshMap();
}
function detectMobile() {
    try {
        var opts = Object.defineProperty({}, "passive", {
            get: function () {
                supportsPassive = true;
            },
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    } catch (e) { }
    var iOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false;
    if (iOS) {
        return true;
    }
    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1;
    if (isAndroid) {
        return true;
    }
    return false;
}
function onMouseDown(evt) {
    downtime = 0;
    stage.removeChild(tay);
    pressMove = true;
    var location = currentMouse(evt);
    var anpha = radToDeg(location.x - player.x, location.y - player.y) + 180;
    if (anpha >= 8 && anpha <= 172) {
        player.angle = limitAngle(anpha);
        renderDotLine();
    } else {
        stage.removeChild(containerLine);
        containerLine = new createjs.Container();
        destinations = [];
    }
}
function onPressMove(evt) {
    if (pressMove) {
        var location = currentMouse(evt);
        var anpha = radToDeg(location.x - player.x, location.y - player.y) + 180;
        if (anpha >= 8 && anpha <= 172) {
            player.angle = limitAngle(anpha);
            renderDotLine();
        } else {
            stage.removeChild(containerLine);
            containerLine = new createjs.Container();
            destinations = [];
        }
    }
}
function updateTextLife() {
    life--;
    textLife.text = life;
    textLife.y = outer1.y - outer1.regX / 4
    textLife.x = (stage.canvas.width - textLife.getMeasuredWidth() * textLife.scale) / 2
}
function onMouseUp(evt) {
    pressMove = false;
    var end = true;
    var arrTemp = [];
    if (destinations.length == 0) {
        return null;
    }
    if (indexClarity) {
        for (let i = 0; i < indexClarity.length; i++) {
            const item = indexClarity[i];
            var check = true;
            for (let j = 0; j < arrTemp.length; j++) {
                const item1 = arrTemp[j];
                if (item.y == item1.y && item.x == item1.x) check = false
            }
            if (check) arrTemp.push(item)
        }
    }
    var endP = destinations[destinations.length - 1];
    if (destinations.length == 1) {
        updateTextLife()
        updateAllCheck()
        removeEvent();
        var endP = destinations[destinations.length - 1];
        var s = getDistance({ x: player.bubble.x, y: player.bubble.y }, destinations[0]);
        createjs.Tween.get(player.bubble)
            .to({ x: endP.x, y: endP.y }, s / player.v, createjs.Ease.linear)
            .call(() => {
                end = false;
                moveBubbleEnd();
            })
            .addEventListener("change", itemChange);
    } else {
        updateTextLife()
        updateAllCheck()
        removeEvent();
        var s = getDistance({ x: player.bubble.x, y: player.bubble.y }, destinations[0]);
        createjs.Tween.get(player.bubble)
            .to({ x: destinations[0].x, y: destinations[0].y }, s / player.v, createjs.Ease.linear)
            .call(move)
            .addEventListener("change", itemChange);
        var i = 1;
        function move() {
            s = getDistance(destinations[i - 1], destinations[i]);
            createjs.Tween.get(player.bubble)
                .to({ x: destinations[i].x, y: destinations[i].y }, s / (player.v * (1 + i / 10)), createjs.Ease.linear)
                .call(() => {
                    if (i < destinations.length - 1) {
                        i++;
                        move();
                    } else {
                        end = false;
                        moveBubbleEnd();
                    }
                })
                .addEventListener("change", itemChange);
        }
    }
    function itemChange(event) {
        if (event && end) {
            var y = event.target.target.y - game.bubble.currentHeight * 0.87;
            for (let i = 0; i < arrTemp.length; i++) {
                var bubble = arrTemp[i].item;
                if (y <= bubble.y && arrTemp[i].remove == false) {
                    arrTemp[i] = { x: arrTemp[i].x, y: arrTemp[i].y, item: bubble, remove: true };
                    bubbleDie(bubble.color, bubble.x, bubble.y);
                    containerMain.removeChild(bubble.bubble);
                    updateLocationEmpty(arrTemp[i].x, arrTemp[i].y);
                }
            }
        }
    }
    stage.removeChild(containerLine);
    containerLine = new createjs.Container();
}
function currentMouse(evt) {
    return isMobile ? { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY } : { x: evt.layerX, y: evt.layerY }
}
function limitAngle(mouseangle) {
    var lbound = 8;
    var ubound = 172;
    if (mouseangle > ubound && mouseangle < 270) mouseangle = ubound;
    if (mouseangle < lbound || mouseangle >= 270) mouseangle = lbound;
    return mouseangle;
}
function tick(event) {
    if (update) {
        updateParticles();
        stage.update(event);
        if (outer1 && outer2) {
            outer1.rotation++;
            outer2.rotation--;
        }
    }
}
var handMove = setInterval(function () {
    if (downtime == 5) {
        stage.removeChild(tay);
        stage.addChild(tay);
    }
    downtime += 1;
}, 1000);
var particles = [];
const MAX_LIFE = 100;
var count = 0;
function emitParticles() {
    var fire_x = Math.floor(Math.random() * stage.canvas.width);
    var circle_r = Math.round(Math.random() * stage.canvas.width * 0.01 + stage.canvas.width * 0.006);
    var a = Math.floor(Math.random() * 2);
    var fire_y = a == 0 ? Math.floor((Math.random() * stage.canvas.height) / 5) - stage.canvas.height / 30 : Math.floor((Math.random() * stage.canvas.height) / 10) + (stage.canvas.height * 2) / 5;
    for (var i = 0; i < 180; i += 5) {
        var particle = new createjs.Shape();
        particle.graphics.beginFill(createjs.Graphics.getHSL(0, 75, 75)).drawPolyStar(100, 100, circle_r, 5, 0.6, 0);
        particle.x = fire_x;
        particle.y = fire_y;
        particle.regX = particle.regY = 100;
        particle.compositeOperation = "lighter";
        stage.addChild(particle);
        var angle = i + 1;
        var pow = Math.random() * stage.canvas.width * 0.02 + stage.canvas.width * 0.007;
        particle.vx = pow * Math.cos((angle * 5 * Math.PI) / 180);
        particle.vy = pow * Math.sin((angle * 5 * Math.PI) / 180);
        particle.life = MAX_LIFE;
        particles.push(particle);
    }
}
function updateParticles() {
    for (var i = 0; i < particles.length; i++) {
        var particle = particles[i];
        particle.vy += 0.3;
        particle.vx *= 0.9;
        particle.vy *= 0.9;
        particle.x += particle.vx - 0.9;
        particle.y += particle.vy;
        var scale = particle.life / MAX_LIFE;
        particle.scaleX = particle.scaleY = scale;
        particle.life -= 1;
        particle.rotation -= 4;
        if (particle.life <= 0) {
            stage.removeChild(particle);
            particles.splice(i, 1);
        }
    }
}
function getLinkInstall() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/windows phone/i.test(userAgent)) {
        window.open("https://play.google.com/store/apps/details?id=bubble.shooter.primitive.dinosaurs.egg.shot")
    } else if (/android/i.test(userAgent)) {
        window.open("https://play.google.com/store/apps/details?id=bubble.shooter.primitive.dinosaurs.egg.shot");
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        window.open("https://apps.apple.com/vn/app/dinosaurs-bubble-shooter/id1563711673?itsct=apps_box_link&itscg=30200");
    } else {
        window.open("https://play.google.com/store/apps/details?id=bubble.shooter.primitive.dinosaurs.egg.shot")
    }
}