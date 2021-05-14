var isMobile = detectMobile();

var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
width = isMobile ? width : height / 1.7;
var loadDataComp = { loadImage: false, loadSound: false }
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
    total_score: 44
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
var destinations = [], bubbleRemove = [];
var textContainer, containerPoint, text_scores, avatar, downtime = 0, tay;
var containerMain = new createjs.Container();
var spriteSheet;
var win = true;
async function gameinit() {
    createjs.RotationPlugin.install();
    createjs.MotionGuidePlugin.install();
    setStage();
    loadImage();
    loadSound()

    game.indexBubbleInlocal = [
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 12, 5, 5, 1, 12, 12, 12, 5, 5],
        [1, 12, 12, 5, 5, 5, 12, 12, 12, 12, 5],
        [1, 1, 1, 1, 12, 5, 1, 12, 5, 12],
        [12, 12, 5, 5, 1, 1, 12, 1, 1, 5, 5],
        [1, 5, 5, 12, 1, 5, 5, 5, 1, 1],
        [1, 5, 5, 12, 12, 12, 12, 5, 1, 5, 5],
        [1, 1, 5, 5, 1, 12, 5, 1, 1, 5],
        [5, 1, 5, 5, 1, 5, 12, 12, 1, 1, 1],
        [12, 12, 12, 5, 1, 1, 1, 5, 1, 12],
        [1, 1, 1, 12, 5, 5, 5, 5, 12, 12, 1],
        [5, 1, 1, 1, 1, 1, 5, 5, 1, 1],
        [12, 5, 12, 12, 5, 12, 12, 1, 1, 12, 12],
        [12, 5, 12, 5, 5, 5, 1, 5, 12, 12],
        [5, 5, 5, 12, 12, 5, 5, 5, 1, 1, 1],
    ];
    game.map = setMap();
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
            [1, 1, 280, 221, 0, 0, 0],
            [1, 224, 124, 152, 0, 0, 0],
            [1, 378, 65, 60, 0, -10, -15],
            [283, 1, 77, 109, 0, 0, 0],
            [127, 224, 87, 61, 0, -3, -18],
            [362, 1, 109, 38, 0, -1, 0],
            [127, 287, 85, 61, 0, -1, -16],
            [283, 112, 77, 59, 0, -7, -21],
            [362, 41, 79, 56, 0, -8, -23],
            [362, 99, 71, 59, 0, -8, -16],
            [216, 224, 68, 56, 0, -9, -18],
            [283, 173, 97, 35, 0, -1, 0],
            [286, 210, 72, 55, 0, -10, -22],
            [68, 378, 55, 55, 0, 0, 0],
            [473, 1, 35, 35, 0, -10, -10],
            [382, 160, 53, 53, 0, -1, -2],
            [127, 350, 60, 48, 0, 0, 0],
            [125, 400, 41, 38, 0, -10, -7],
            [168, 400, 41, 38, 0, -10, -7],
            [443, 41, 55, 55, 0, 0, 0],
            [360, 215, 55, 55, 0, 0, 0],
            [417, 215, 53, 53, 0, -1, -2],
            [286, 267, 55, 27, 0, 0, 0],
            [189, 350, 47, 42, 0, -7, -5],
            [214, 296, 53, 52, 0, 0, 0],
            [269, 296, 51, 53, 0, -2, -2],
            [322, 296, 45, 53, 0, -5, -1],
            [369, 272, 49, 49, 0, -3, -5],
            [420, 270, 47, 42, 0, -7, -5],
            [469, 270, 39, 36, 0, 0, 0],
            [369, 323, 47, 42, 0, -7, -5],
            [472, 98, 36, 36, 0, -9, -9],
            [435, 99, 35, 35, 0, -10, -10],
            [472, 136, 36, 36, 0, -9, -10],
            [437, 136, 33, 31, 0, -11, -11],
            [472, 174, 36, 36, 0, -9, -9],
            [472, 212, 36, 36, 0, -9, -10],
            [437, 169, 32, 30, 0, -11, -12],
            [211, 394, 40, 38, 0, -7, -8],
            [420, 314, 41, 38, 0, -10, -7],
            [418, 354, 40, 38, 0, -7, -8],
            [238, 351, 40, 38, 0, -7, -8],
            [280, 351, 37, 50, 0, 0, 0],
            [253, 403, 36, 35, 0, -9, -11],
            [291, 403, 35, 35, 0, -10, -10],
            [319, 351, 36, 36, 0, -9, -9],
            [328, 389, 35, 34, 0, -13, -10],
            [365, 367, 35, 34, 0, -13, -10],
            [365, 403, 35, 34, 0, -13, -10],
            [402, 394, 34, 32, 0, -10, -11],
            [438, 394, 34, 32, 0, -10, -11],
            [474, 308, 34, 32, 0, -10, -11],
            [474, 342, 34, 32, 0, -10, -11]
        ],

        animations: {
            logo: { frames: [0] },
            body_dino: { frames: [1] },
            out_yellow: { frames: [2, 10, 9, 6, 4, 7, 8, 12] },
            owl: { frames: [3] },
            play_now: { frames: [5] },
            install_now: { frames: [11] },
            explosive_red: { frames: [49, 31, 38, 50, 13, 43, 46, 17, 23, 14] },
            B_Red: { frames: [15] },
            avatar: { frames: [16] },
            explosive_yellow: { frames: [37, 35, 40, 51, 19, 33, 47, 18, 28, 32] },
            explosive_purple: { frames: [34, 45, 41, 52, 20, 36, 48, 39, 30, 44] },
            B_Yellow: { frames: [21] },
            topbar: { frames: [22] },
            CircleLight: { frames: [24] },
            B_Purple: { frames: [25] },
            tay: { frames: [26] },
            in_yellow: { frames: [27] },
            star: { frames: [29] },
            hand_dino: { frames: [42] }
        }
    });
    var temp = loadDataComp
    loadDataComp = { loadImage: true, loadSound: temp.loadSound }
    render()
}

function render() {
    if (loadDataComp.loadImage == true && loadDataComp.loadSound == true) {
        setDinosaursAndBird();
        renderBubble();
        setPlayer(5);
    }
}
function loadSound() {
    createjs.Sound.removeAllSounds();
    var queue = new createjs.LoadQueue();
    createjs.Sound.alternateExtensions = ["mp3"];
    queue.installPlugin(createjs.Sound);

    queue.on("complete", loadHandler);
    queue.loadManifest([{ id: "popular", src: "../sound/popular.wav" },
    { id: "popularDino", src: "../sound/popularDino.mp3" },
    { id: "shoot", src: "../sound/shoot.wav" },
    ]);
    function loadHandler(event) {
        var temp = loadDataComp
        loadDataComp = { loadImage: temp.loadImage, loadSound: true }
        render()
    }
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
    game.bubble.currentWidth = Math.round((stage.canvas.width / 11) * 100) / 100;
    game.bubble.currentHeight = Math.round((stage.canvas.width / 11) * 100) / 100;
    game.bubble.scale = Math.round((stage.canvas.width / 11 / 50) * 100) / 100;
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
function setDinosaursAndBird() {
    var dinosaur = new createjs.Container();
    var body_dinosaur = new createjs.Sprite(spriteSheet, "body_dino");
    body_dinosaur.scaleX = stage.canvas.width / 4.3 / body_dinosaur.getBounds().width;
    body_dinosaur.scaleY = stage.canvas.width / 4.3 / body_dinosaur.getBounds().width;
    body_dinosaur.x = stage.canvas.width / 2.5 - body_dinosaur.getBounds().width * body_dinosaur.scaleX;
    body_dinosaur.y = stage.canvas.height - body_dinosaur.getBounds().height * body_dinosaur.scaleX - stage.canvas.height / 9;
    var hand_dinosaur = new createjs.Sprite(spriteSheet, "hand_dino");
    hand_dinosaur.scaleX = body_dinosaur.scaleX;
    hand_dinosaur.scaleY = body_dinosaur.scaleX;
    hand_dinosaur.x = stage.canvas.width / 2.5 - (body_dinosaur.getBounds().width * body_dinosaur.scaleX) / 2;
    hand_dinosaur.y = stage.canvas.height - (body_dinosaur.getBounds().height * body_dinosaur.scaleX) / 2.1 - stage.canvas.height / 9;
    install_now = new createjs.Sprite(spriteSheet, "install_now");
    install_now.scaleX = stage.canvas.width / 4.5 / install_now.getBounds().width;
    install_now.scaleY = stage.canvas.width / 4.5 / install_now.getBounds().width;
    install_now.x = (stage.canvas.width - install_now.getBounds().width * install_now.scaleX) / 2;
    install_now.y = stage.canvas.height - install_now.getBounds().height * install_now.scaleY * 1.7;
    dinosaur.addChild(body_dinosaur, hand_dinosaur);
    createjs.Tween.get(hand_dinosaur, { loop: true }).to({ rotation: -25 }, 1000).to({ rotation: 0 }, 1000);
    var bird = new createjs.Sprite(spriteSheet, "owl");
    bird.scaleX = stage.canvas.width / 8 / bird.getBounds().width;
    bird.scaleY = stage.canvas.width / 8 / bird.getBounds().width;
    bird.x = (stage.canvas.width * 2.8) / 5 + (bird.getBounds().width * bird.scaleX * 2) / 3;
    bird.y = stage.canvas.height - bird.getBounds().height * bird.scaleX - stage.canvas.height / 9;
    stage.addChild(dinosaur, bird, install_now);
    var x = install_now.x,
        y = install_now.y,
        scale = stage.canvas.width / 4.5 / install_now.getBounds().width;
    createjs.Tween.get(install_now, { loop: true })
        .to(
            {
                scaleX: stage.canvas.width / 7 / bird.getBounds().width,
                scaleY: stage.canvas.width / 7 / bird.getBounds().width,
                x: x - (stage.canvas.width / 7 - stage.canvas.width / 8) / 10,
                y: y - (stage.canvas.width / 7 - stage.canvas.width / 8) / 10,
            },
            500,
            createjs.Ease.linear
        )
        .to({ scaleX: scale, scaleY: scale, x: x, y: y }, 500, createjs.Ease.linear);
    install_now.addEventListener("click", () => { getLinkInstall() }, false);
    outer1 = new createjs.Sprite(spriteSheet, "CircleLight");
    outer1.scaleX = stage.canvas.width / 5.2 / outer1.getBounds().width;
    outer1.scaleY = stage.canvas.width / 5.2 / outer1.getBounds().width;
    outer1.regX = outer1.regY = outer1.getBounds().width / 2;
    outer1.x = stage.canvas.width / 2 + outer1.getBounds().width / 32;
    outer1.y = (stage.canvas.height * 8.7) / 10 - (game.bubble.currentWidth * 1.3) / 2;
    outer2 = outer1.clone();
    stage.addChild(outer1, outer2);
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


    textContainer = new createjs.Container();
    var t1 = new createjs.Text("SAVE THE BABY DINOS", "bold 40px Impact", "#ffffff");
    t1.x = stage.canvas.width / 2;
    t1.y = stage.canvas.height * 2.05 / 3;
    t1.textAlign = 'center'
    t1.scale = 0
    t1.textBaseline = "alphabetic";
    var t2 = t1.clone()
    t2.outline = 2;
    t2.color = '#bd3bc2'
    textContainer.addChild(t1, t2);

    createjs.Tween.get(t1)
        .to({ scale: stage.canvas.width / 500 }, 500)
    createjs.Tween.get(t2)
        .to({ scale: stage.canvas.width / 500 }, 500)

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
    var t = t1.clone()
    t.y = stage.canvas.height * 1.97 / 3;
    t.scale = stage.canvas.width / 500
    t.text = '- - - - - -          - - - - - -'
    t3 = t.clone()
    t3.text = '<                                         >'
    t3.y = stage.canvas.height * 1.98 / 3;
    createjs.Tween.get(hand, { loop: true })
        .to({ x: (stage.canvas.width * 3.6) / 5 }, 800)
        .to({ x: stage.canvas.width / 2 - (hand.getBounds().width * hand.scale) / 2 }, 1000)
        .to({ x: (stage.canvas.width * 0.5) / 5 }, 800)
        .to({ x: stage.canvas.width / 2 - (hand.getBounds().width * hand.scale) / 2 }, 1000);
    tay.addChild(t, t3, hand);
    containerPoint.addChild(rect, circle, text_scores, avatar);
    stage.addChild(textContainer, containerPoint);

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
    bubble.y = (stage.canvas.height * 8.7) / 10 - game.bubble.currentWidth * 2;
    player.x = stage.canvas.width / 2;
    player.y = (stage.canvas.height * 8.7) / 10 - game.bubble.currentWidth * 2;
    player.currentColor = id;
    player.bubble = bubble;
    stage.addChild(bubble);
}
function updateColor() {
    var arColor = [];
    player.color = [];
    var itemEnd = getItemEnd();
    var y;
    loop1:
    for (let i = mapDuong.length - 1; i >= (itemEnd.y - 4 <= 0 ? 0 : itemEnd.y - 4); i--) {
        var lengthI = mapDuong[i].length;
        loop2:
        for (let j = 0; j < mapDuong[i].length; j++) {
            if (mapDuong[i][j].existing == true) lengthI -= 1;
            if (j == mapDuong[i].length - 1 && lengthI == 0) {
                y = i;
                break loop1;
            };
        };
    };
    if (y) {
        mapDuong[y].forEach(item => {
            if (item.color < 7) arColor.push(item.color);
        });
    } else {
        if (itemEnd.y > 3) {
            for (let row = itemEnd.y; row >= itemEnd.y - 3; row--) {
                for (let i = 0; i < mapDuong[row].length; i++) {
                    if (mapDuong[row][i].color != null && mapDuong[row][i].color < 20 && mapDuong[row][i].color != 7) {
                        if (mapDuong[row][i].color >= 10) {
                            arColor.push(mapDuong[row][i].color - 10);
                        } else {
                            arColor.push(mapDuong[row][i].color);
                        };
                    };
                };
            };
        } else {
            for (let row = 0; row <= itemEnd.y; row++) {
                for (let i = 0; i < mapDuong[row].length; i++) {
                    if (mapDuong[row][i].color != null && mapDuong[row][i].color < 20 && mapDuong[row][i].color != 7) {
                        if (mapDuong[row][i].color >= 10) {
                            arColor.push(mapDuong[row][i].color - 10);
                        } else {
                            arColor.push(mapDuong[row][i].color);
                        };
                    };
                };
            };
        };
    };


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
    function moveVibration(arr, side, turn) {
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
            refreshMap();
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
            if (index <= arrL.length - 1) {
                var a = arrL[index].obj;
                containerMain.removeChild(a.bubble);
                bubbleDie(a.color, a.x, a.y);
                if (arrL.length > arrS.length && index == arrL.length - 1) {
                    clearInterval(bubbleDie1);
                    bubbleRemove = [];
                    removeBubbleAlone();
                }
            }
            if (index <= arrS.length - 1) {
                var a = arrS[index].obj;
                containerMain.removeChild(a.bubble);
                bubbleDie(a.color, a.x, a.y);
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
function bubbleDie(color, x, y) {
    if (color <= 7) {
        createjs.Sound.play("popular");
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
    } else if (color >= 10 && color < 20) {
        createjs.Sound.play("popularDino");
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
                        if (itemEnd) {
                            if (itemEnd.y < rowDuong - 1 && mapAm.length > 0) {
                                turnDow();
                            } else if (itemEnd.y > rowDuong - 1) {
                                turnUp();
                            }
                        };
                        addEvent();
                        resetAlone();
                    };
                });


        }
    } else {
        var itemEnd = getItemEnd();
        addRow();
        if (itemEnd) {
            if (itemEnd.y < rowDuong - 1 && mapAm.length > 0) {
                turnDow();
            } else if (itemEnd.y > rowDuong - 1) {
                turnUp();
            }
        }
        addEvent();
        resetAlone();
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
    setPlayer();
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
    var itemEnd = null;
    var x = 0,
        y = 0;
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
    if (mapAm.length > 0) return false;
    else {
        game.map.forEach((element) => {
            element.forEach((bubble) => {
                if (bubble.existing === true && bubble.y != 0) complete = false;
            });
        });
        return complete;
    }
}
async function setStar() {
    var complete = await checkComplete();
    if ((complete == true && win == true && game.scores == game.total_score) || (game.scores == game.total_score && win == true)) {
        stage.removeChild(tay);
        clearInterval(handMove);
        win = false;
        removeEvent();
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
        game.map[0].forEach((top) => {
            containerMain.removeChild(top.bubble);
        });
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
                            x: x - (stage.canvas.width / 2.5 - stage.canvas.width / 3) / 2,
                            y: y - (stage.canvas.width / 2.5 - stage.canvas.width / 3) / 2,
                        },
                        500,
                        createjs.Ease.linear
                    )
                    .to({ scaleX: scale, scaleY: scale, x: x, y: y }, 500, createjs.Ease.linear);
            });
        btn_continue.addEventListener("click", () => { getLinkInstall() }, false);
    } else if ((complete == true && win == false) || (game.scores == game.total_score && win == false)) {
        game.map.forEach((row) => {
            row.forEach((bubbles) => {
                if (bubbles.existing == true && bubbles.color < 20) {
                    containerMain.removeChild(bubbles.bubble);
                    bubbleDie(bubbles.color, bubbles.x, bubbles.y);
                }
            });
        });
        stage.removeChild(containerLine);
        removeEvent();
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
    stage.removeChild(textContainer)
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
    if (destinations.length == 1) {
        createjs.Sound.play("shoot");
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
        createjs.Sound.play("shoot");
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
        stage.removeChild(textContainer)
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