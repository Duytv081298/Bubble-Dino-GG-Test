var isMobile = detectMobile();

var width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;

var height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
width = isMobile ? width : height / 1.7;
var canvas, stage, context, update = true
var supportsPassive = false, pressMove = false
var containerLine = new createjs.Container();
var outer1, outer2
var queue, game = {
    levels: 1,
    indexBubbleInlocal: null,
    map: [],
    bubble: {
        width: 110,
        height: 110,
        currentWidth: 0,
        currentHeight: 0,
        leftoverX: 0,
        leftoverY: 0,
        scale: 0,
        color: null
    },
    surplus: 0,
    scores: 0,
    total_score: 38
}
var player = {
    x: 0,
    y: 0,
    v: 1.5,
    angle: 0,
    bubble: null,
    color: [],
    currentColor: null,
    end: null
}
var destinations = [], bubbleRemove = []
var textContainer, containerPoint, text_scores, avatar, downtime = 0, tay
var containerMain = new createjs.Container();
var spriteSheet
var win = true
async function gameinit() {
    createjs.RotationPlugin.install();
    createjs.MotionGuidePlugin.install();
    setStage()
    loadImage()
    game.indexBubbleInlocal = [
        [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        [1, 1, 12, 3, 3, 10, 4, 4, 11, 2, 2],
        [11, 2, 2, 13, 0, 0, 14, 1, 1, 12],
        [1, 1, 12, 3, 3, 10, 4, 4, 11, 2, 2],
        [11, 2, 2, 13, 0, 0, 14, 1, 1, 12],
        [1, 1, 12, 3, 3, 10, 4, 4, 11, 2, 2],
        [11, 2, 2, 13, 0, 0, 14, 1, 1, 12],
        [1, 1, 12, 3, 3, 10, 4, 4, 11, 2, 2],
        [11, 2, 2, 13, 0, 0, 14, 1, 1, 12],
        [1, 1, 12, 3, 3, 10, 4, 4, 11, 2, 2],
        [11, 2, 2, 13, 0, 0, 14, 1, 1, 12],
        [1, 1, 12, 3, 3, 10, 4, 4, 11, 2, 2],
    ]
    game.map = setMap()

    createjs.Ticker.framerate = 60
    createjs.Ticker.addEventListener("tick", tick);
}

async function loadImage() {
    queue = new createjs.LoadQueue(false);
    var manifest = [
        { src: './images/bubble_full.png', id: 'bubble_full' },
    ]
    queue.on("complete", setAnimation);
    queue.loadManifest(manifest);
}
function setAnimation() {
    spriteSheet = new createjs.SpriteSheet({
        images: [queue.getResult("bubble_full")],
        framerate: 25,
        frames: [
            [1, 1, 300, 524, 0, 0, 0],
            [1, 527, 278, 221, 0, -1, 0],
            [303, 1, 124, 152, 0, 0, 0],
            [1, 750, 95, 34, 0, -2, 0],
            [303, 155, 77, 109, 0, 0, 0],
            [429, 1, 87, 60, 0, -3, -19],
            [429, 63, 86, 59, 0, -3, -19],
            [518, 1, 107, 38, 0, -2, 0],
            [303, 266, 84, 60, 0, -2, -17],
            [303, 328, 85, 59, 0, -4, -19],
            [303, 389, 85, 59, 0, -4, -19],
            [303, 450, 85, 59, 0, -4, -19],
            [627, 1, 84, 59, 0, -2, -17],
            [429, 124, 84, 59, 0, -2, -17],
            [382, 155, 45, 40, 0, -8, -6],
            [382, 197, 64, 60, 0, -11, -15],
            [448, 185, 75, 59, 0, -9, -21],
            [389, 259, 83, 59, 0, -2, -17],
            [390, 320, 84, 59, 0, -2, -17],
            [390, 381, 78, 56, 0, -9, -23],
            [390, 439, 75, 57, 0, -8, -22],
            [98, 750, 34, 34, 0, -10, -11],
            [134, 750, 34, 34, 0, -10, -10],
            [170, 750, 34, 34, 0, -10, -11],
            [206, 750, 34, 34, 0, -10, -10],
            [242, 750, 34, 34, 0, -10, -11],
            [518, 41, 78, 54, 0, -8, -24],
            [517, 97, 77, 54, 0, -9, -24],
            [474, 246, 64, 59, 0, -11, -15],
            [476, 307, 68, 58, 0, -10, -17],
            [525, 153, 69, 57, 0, -9, -17],
            [303, 511, 77, 54, 0, -9, -24],
            [281, 567, 75, 57, 0, -9, -22],
            [281, 626, 75, 57, 0, -9, -22],
            [281, 685, 75, 57, 0, -9, -22],
            [281, 744, 45, 40, 0, -8, -6],
            [328, 744, 45, 40, 0, -8, -6],
            [390, 498, 77, 54, 0, -9, -24],
            [525, 212, 55, 27, 0, 0, 0],
            [540, 241, 63, 58, 0, -11, -16],
            [546, 301, 63, 58, 0, -12, -16],
            [476, 367, 71, 53, 0, -11, -23],
            [549, 361, 64, 58, 0, -11, -16],
            [470, 422, 70, 53, 0, -11, -23],
            [469, 477, 69, 57, 0, -10, -17],
            [469, 536, 70, 53, 0, -11, -23],
            [358, 567, 69, 57, 0, -10, -17],
            [358, 626, 68, 57, 0, -10, -17],
            [358, 685, 68, 56, 0, -10, -17],
            [429, 554, 38, 36, 0, -8, -9],
            [375, 743, 45, 40, 0, -8, -6],
            [598, 62, 70, 53, 0, -11, -23],
            [596, 117, 70, 53, 0, -11, -23],
            [596, 172, 66, 56, 0, -11, -18],
            [664, 172, 60, 48, 0, 0, 0],
            [605, 230, 66, 54, 0, -10, -19],
            [673, 222, 51, 52, 0, -2, -3],
            [673, 276, 51, 52, 0, -2, -3],
            [670, 62, 53, 54, 0, -1, -1],
            [668, 118, 53, 52, 0, 0, 0],
            [611, 286, 53, 54, 0, -1, -1],
            [615, 342, 53, 54, 0, -1, -1],
            [670, 330, 53, 54, 0, -1, -1],
            [615, 398, 53, 54, 0, -1, -1],
            [670, 386, 51, 52, 0, -2, -3],
            [429, 592, 51, 52, 0, -2, -3],
            [482, 591, 66, 54, 0, -11, -19],
            [428, 646, 51, 52, 0, -2, -3],
            [481, 647, 65, 54, 0, -11, -19],
            [428, 700, 47, 47, 0, -4, -6],
            [477, 703, 47, 47, 0, -4, -6],
            [526, 703, 37, 50, 0, 0, 0],
            [422, 752, 33, 32, 0, -14, -11],
            [457, 752, 33, 32, 0, -14, -11],
            [492, 752, 32, 30, 0, -11, -12],
            [670, 440, 47, 47, 0, -4, -6],
            [526, 755, 30, 28, 0, -12, -13],
            [542, 422, 43, 51, 0, -6, -2],
            [548, 647, 47, 47, 0, -4, -6],
            [565, 696, 47, 47, 0, -4, -6],
            [565, 745, 39, 36, 0, -11, -8],
            [542, 475, 45, 40, 0, -8, -6],
            [541, 517, 39, 36, 0, -11, -8],
            [541, 555, 34, 34, 0, -10, -10],
            [550, 591, 37, 36, 0, -9, -9],
            [577, 555, 34, 34, 0, -10, -10],
            [582, 517, 39, 36, 0, -11, -8],
            [589, 591, 37, 36, 0, -9, -9],
            [613, 555, 34, 34, 0, -10, -11],
            [628, 591, 39, 36, 0, -11, -8],
            [597, 629, 39, 36, 0, -11, -8],
            [638, 629, 38, 36, 0, -8, -9],
            [614, 667, 39, 36, 0, 0, 0],
            [614, 705, 38, 36, 0, -8, -9],
            [655, 667, 34, 34, 0, -10, -10],
            [691, 489, 33, 33, 0, -11, -11],
            [691, 524, 33, 33, 0, -11, -11],
            [691, 559, 33, 33, 0, -11, -11],
            [691, 594, 33, 33, 0, -11, -11],
            [691, 629, 33, 33, 0, -11, -11],
            [691, 664, 33, 32, 0, -14, -11],
            [691, 698, 33, 32, 0, -14, -11],
            [655, 703, 34, 33, 0, -10, -12],
            [691, 732, 33, 32, 0, -14, -11],
            [606, 745, 32, 30, 0, -11, -12],
            [640, 743, 32, 30, 0, -11, -12],
            [623, 454, 32, 30, 0, -11, -12],
            [589, 454, 32, 30, 0, -11, -12],
            [623, 486, 32, 30, 0, -11, -12],
            [657, 489, 32, 30, 0, -11, -12],
            [623, 518, 32, 30, 0, -11, -12],
            [657, 521, 32, 30, 0, -11, -12]
        ],
        animations: {
            bg1: { frames: [0] },
            logo: { frames: [1] },
            body_dino: { frames: [2] },
            install_now: { frames: [3] },
            owl: { frames: [4] },
            out_blue: { frames: [15, 53, 29, 8, 5, 16, 19, 41] },
            out_red: { frames: [28, 48, 47, 18, 6, 34, 26, 52] },
            out_yellow: { frames: [39, 55, 30, 17, 9, 20, 27, 43] },
            out_green: { frames: [40, 66, 44, 12, 10, 32, 31, 45] },
            out_pink: { frames: [42, 68, 46, 13, 11, 33, 37, 51] },
            in_blue: { frames: [69] },
            in_green: { frames: [70] },
            in_pink: { frames: [75] },
            in_red: { frames: [78] },
            in_yellow: { frames: [79] },
            explosive_blue: { frames: [74, 22, 49, 104, 58, 21, 72, 80, 14, 95] },
            explosive_green: { frames: [105, 24, 84, 106, 60, 23, 73, 82, 35, 96] },
            explosive_pink: { frames: [107, 83, 87, 108, 61, 25, 100, 86, 36, 97] },
            explosive_red: { frames: [109, 85, 91, 110, 62, 102, 101, 89, 50, 98] },
            explosive_yellow: { frames: [76, 94, 93, 111, 63, 88, 103, 90, 81, 99] },
            play_now: { frames: [7] },
            topbar: { frames: [38] },
            avatar: { frames: [54] },
            B_Blue: { frames: [56] },
            B_Green: { frames: [57] },
            CircleLight: { frames: [59] },
            B_Pink: { frames: [64] },
            B_Red: { frames: [65] },
            B_Yellow: { frames: [67] },
            hand_dino: { frames: [71] },
            tay: { frames: [77] },
            star: { frames: [92] }
        }
    })
    setBackground()
    setDinosaursAndBird()
    // setStar()
    renderBubble()
    setPlayer()
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
    canvas = document.getElementById("myCanvas")
    // context = canvas.getContext("2d");
    // // context.doStuffWithCanvasAPIs();
    // context.webkitImageSmoothingEnabled = context.mozImageSmoothingEnabled = true;
    stage = new createjs.Stage(canvas);
    stage.mouseMoveOutside = true;
    canvas.height = height
    canvas.width = width
    addEvent()
    console.log(width + ' : ' + stage.canvas.width);
    console.log(height + ' : ' + stage.canvas.height);
    game.bubble.currentWidth = Math.round((stage.canvas.width / 11) * 100) / 100
    game.bubble.currentHeight = Math.round((stage.canvas.width / 11) * 100) / 100
    game.bubble.scale = Math.round((stage.canvas.width / 11) / 50 * 100) / 100
}
function convertAnimations(color) {
    switch (color) {
        case 0:
            return "explosive_blue"
        case 1:
            return "explosive_red"
        case 2:
            return "explosive_yellow"
        case 3:
            return "explosive_green"
        case 4:
            return "explosive_pink"
        case 5:
            return "explosive_purple"
        case 6:
            return "explosive_cyan"
        case 10:
            return "out_blue"
        case 11:
            return "out_red"
        case 12:
            return "out_yellow"
        case 13:
            return "out_green"
        case 14:
            return "out_pink"
        case 15:
            return "out_purple"
        case 16:
            return "out_cyan"
        default:
            return null;
    }
}
function setMap() {
    var locationArr = []
    for (let i = 0; i < stage.canvas.height / game.bubble.currentHeight; i++) {
        var x = game.bubble.currentWidth,
            y = i * game.bubble.currentHeight * 0.87
        var arr = []
        if (i > 0 && i % 2 != 0 || i == 0) {
            for (let j = 0; j < 11; j++) {
                var xb = j * x
                xb -= game.bubble.currentWidth / 20
                arr.push({ x: xb, y: y, existing: false, bubble: null, color: null, checked: false, checkAlone: false, vibration: false })
            }
        } else {
            for (let j = 0; j < 10; j++) {
                var xb = j * x
                xb += x / 2
                xb -= game.bubble.currentWidth / 20
                arr.push({ x: xb, y: y, existing: false, bubble: null, color: null, checked: false, checkAlone: false, vibration: false })
            }
        }
        locationArr.push(arr)
    }
    game.surplus = (game.bubble.currentWidth) / 2
    return locationArr
}
function lToIndex(x, y) {
    var estimateY = Math.floor(y / (Math.round((game.bubble.currentHeight * 0.87) * 100) / 100))
    x += Math.round(((game.bubble.currentWidth / 20) * 100) / 100)
    if (estimateY % 2 == 0 && estimateY > 1) x -= Math.round(((game.bubble.currentWidth / 2) * 100) / 100)
    if (estimateY > 25) estimateY = 25
    var estimateX = Math.floor(x / (game.bubble.currentWidth), 0)
    if (estimateX < 0) estimateX = 0
    if (estimateX > 10) estimateX = 10
    if (estimateY % 2 == 0 && estimateY > 1 && estimateX > 9) estimateX = 9
    return ({ x: estimateX, y: estimateY })

}
function convertIdtoBubble(id) {
    switch (id) {
        case 0:
            return "B_Blue"
        case 1:
            return "B_Red"
        case 2:
            return "B_Yellow"
        case 3:
            return "B_Green"
        case 4:
            return "B_Pink"
        case 5:
            return "B_Purple"
        case 6:
            return "B_Cyan"
        case 10:
            return "in_blue"
        case 11:
            return "in_red"
        case 12:
            return "in_yellow"
        case 13:
            return "in_green"
        case 14:
            return "in_pink"
        case 15:
            return "in_purple"
        case 16:
            return "in_cyan"
        case 100:
            return "topbar"
        default:
            return null;
    }
}
function setBackground() {
    var bg = new createjs.Sprite(spriteSheet, "bg1");
    bg.scaleX = stage.canvas.width / bg.getBounds().width;
    bg.scaleY = stage.canvas.height / bg.getBounds().height;
    stage.addChild(bg);


}
function setDinosaursAndBird() {
    var dinosaur = new createjs.Container();
    var body_dinosaur = new createjs.Sprite(spriteSheet, "body_dino");
    body_dinosaur.scaleX = (stage.canvas.width / 4.3) / body_dinosaur.getBounds().width;
    body_dinosaur.scaleY = (stage.canvas.width / 4.3) / body_dinosaur.getBounds().width;
    body_dinosaur.x = stage.canvas.width / 2.5 - (body_dinosaur.getBounds().width * body_dinosaur.scaleX)
    body_dinosaur.y = stage.canvas.height - body_dinosaur.getBounds().height * body_dinosaur.scaleX - stage.canvas.height / 9;


    var hand_dinosaur = new createjs.Sprite(spriteSheet, "hand_dino");
    hand_dinosaur.scaleX = body_dinosaur.scaleX
    hand_dinosaur.scaleY = body_dinosaur.scaleX
    hand_dinosaur.x = stage.canvas.width / 2.5 - (body_dinosaur.getBounds().width * body_dinosaur.scaleX) / 2
    hand_dinosaur.y = stage.canvas.height - body_dinosaur.getBounds().height * body_dinosaur.scaleX / 2.1 - stage.canvas.height / 9;

    dinosaur.addChild(body_dinosaur, hand_dinosaur);

    createjs.Tween.get(hand_dinosaur, { loop: true })
        .to({ rotation: -25 }, 1000)
        .to({ rotation: 0 }, 1000)


    var bird = new createjs.Sprite(spriteSheet, "owl");
    bird.scaleX = (stage.canvas.width / 8) / bird.getBounds().width;
    bird.scaleY = (stage.canvas.width / 8) / bird.getBounds().width;
    bird.x = stage.canvas.width * 2.8 / 5 + (bird.getBounds().width * bird.scaleX * 2 / 3)
    bird.y = stage.canvas.height - bird.getBounds().height * bird.scaleX - stage.canvas.height / 9
    stage.addChild(dinosaur, bird);

    outer1 = new createjs.Sprite(spriteSheet, 'CircleLight')
    outer1.scaleX = (stage.canvas.width / 5.2) / outer1.getBounds().width;
    outer1.scaleY = (stage.canvas.width / 5.2) / outer1.getBounds().width;
    outer1.regX = outer1.regY = (outer1.getBounds().width) / 2;
    outer1.x = (stage.canvas.width / 2)
    outer1.y = stage.canvas.height * 8.7 / 10 - game.bubble.currentWidth * 1.5 + outer1.getBounds().width / 1.4


    outer2 = outer1.clone()

    stage.addChild(outer1, outer2);
}
function renderBubble() {
    var arr = game.indexBubbleInlocal
    for (let y = 0; y < arr.length; y++) {
        for (let x = 0; x < arr[y].length; x++) {
            var id = arr[y][x]
            if (id == 100) {
                var bars = new createjs.Sprite(spriteSheet, convertIdtoBubble(id))
                var a = game.map[y][x]
                bars.scaleX = (stage.canvas.width / 10.4) / bars.getBounds().width
                bars.scaleY = (game.bubble.currentHeight) / bars.getBounds().height
                bars.x = a.x
                bars.y = a.y
                containerMain.addChild(bars)
                game.map[y][x] = { x: a.x, y: a.y, existing: true, bubble: bars, color: id, checked: false, checkAlone: false, vibration: false }
            }
            if (id < 7) {
                var bubble = new createjs.Sprite(spriteSheet, convertIdtoBubble(id))
                var a = game.map[y][x]
                bubble.scaleX = (stage.canvas.width / 10.4) / bubble.getBounds().width
                bubble.scaleY = (stage.canvas.width / 10.4) / bubble.getBounds().width
                bubble.x = a.x
                bubble.y = a.y
                containerMain.addChild(bubble)
                game.map[y][x] = { x: a.x, y: a.y, existing: true, bubble: bubble, color: id, checked: false, checkAlone: false, vibration: false }
            } else if (id >= 10 && id < 20) {
                var bubble = new createjs.Sprite(spriteSheet, convertIdtoBubble(id))
                var a = game.map[y][x]
                bubble.scaleX = (stage.canvas.width / 11.7) / bubble.getBounds().width
                bubble.scaleY = (stage.canvas.width / 11.7) / bubble.getBounds().width
                bubble.x = a.x
                bubble.y = a.y
                containerMain.addChild(bubble)
                game.map[y][x] = { x: a.x, y: a.y, existing: true, bubble: bubble, color: id, checked: false, checkAlone: false, vibration: false }
            }
        }
    }
    stage.addChild(containerMain)

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
    circle.graphics.ss(stage.canvas.width / 100).s("#4231c4").f('#150c62').dc(0, 0, stage.canvas.width / 26);

    var rect = new createjs.Shape();
    rect.graphics.ss(stage.canvas.width / 100)
        .s("#3e2ebb").f('#ffffff')
        .rc(0, 0, (stage.canvas.width / 5.6), stage.canvas.width / 16, 0, stage.canvas.width / 35, stage.canvas.width / 35, 0);
    rect.y = - stage.canvas.width / 32

    text_scores = new createjs.Text(game.scores + " / " + game.total_score, "bold 22px Impact", "#722b1b");
    text_scores.x = stage.canvas.width / 19
    text_scores.y = stage.canvas.width / 60
    text_scores.scale = stage.canvas.width / 555
    t1.textAlign = 'center'
    text_scores.textBaseline = "alphabetic";

    containerPoint.x = stage.canvas.width / 23;
    containerPoint.y = stage.canvas.width / 22;

    avatar = new createjs.Sprite(spriteSheet, 'avatar')
    avatar.scaleX = (stage.canvas.width / 14) / avatar.getBounds().width
    avatar.scaleY = (stage.canvas.width / 14) / avatar.getBounds().width
    if (isMobile) {
        avatar.x = stage.canvas.width / 555
        avatar.y = stage.canvas.height / 555
    } else {
        avatar.x = stage.canvas.width / 64
        avatar.y = stage.canvas.height / 100
    }
    avatar.regX = (avatar.getBounds().width * avatar.scaleX)
    avatar.regY = (avatar.getBounds().width * avatar.scaleY)

    tay = new createjs.Container();

    var hand = new createjs.Sprite(spriteSheet, 'tay')
    hand.scale = stage.canvas.width / 420
    hand.x = stage.canvas.width / 2 - hand.getBounds().width * hand.scale / 2;
    hand.y = stage.canvas.height * 1.9 / 3;
    var t = t1.clone()
    t.y = stage.canvas.height * 1.97 / 3;
    t.scale = stage.canvas.width / 500
    t.text = '- - - - - -          - - - - - -'
    t3 = t.clone()
    t3.text = '<                                         >'
    t3.y = stage.canvas.height * 1.98 / 3;
    createjs.Tween.get(hand, { loop: true })
        .to({ x: stage.canvas.width * 3.5 / 5 }, 800)
        .to({ x: stage.canvas.width / 2 - hand.getBounds().width * hand.scale / 2 }, 1000)
        .to({ x: stage.canvas.width * 0.5 / 5 }, 800)
        .to({ x: stage.canvas.width / 2 - hand.getBounds().width * hand.scale / 2 }, 1000)
    tay.addChild(hand, t, t3)

    containerPoint.addChild(rect, circle, text_scores, avatar);

    stage.addChild(textContainer, containerPoint);

}
// //khởi tạo player
function setPlayer() {
    updateColor()
    var id = player.color[Math.floor(Math.random() * player.color.length)]
    var bubble = new createjs.Sprite(spriteSheet, convertIdtoBubble(id))


    bubble.scaleX = game.bubble.scale;
    bubble.scaleY = game.bubble.scale;

    bubble.x = stage.canvas.width / 2 - (game.bubble.currentWidth / 2)
    bubble.y = stage.canvas.height * 8.7 / 10 - game.bubble.currentWidth * 2

    player.x = stage.canvas.width / 2
    player.y = stage.canvas.height * 8.7 / 10 - game.bubble.currentWidth * 1.5
    player.currentColor = id
    player.bubble = bubble

    stage.addChild(bubble);
}
function updateColor() {
    var arColor = []
    player.color = []
    game.map.forEach(element => {
        element.forEach(bubble => {
            if (bubble.color != null) arColor.push(bubble.color)
        });
    });

    for (var i = 0; i < arColor.length; i++) {
        var color = arColor[i]
        if (player.color.indexOf(color) === -1) {
            if (color == 0 || color == 1 || color == 2 || color == 3 || color == 4 || color == 5 || color == 6 || color == 7) player.color.push(arColor[i])
        }
    }
    player.color = player.color.sort()
    if (player.color.length == 0) player.color.push(Math.floor(Math.random() * 5))
}
function radToDeg(x, y) {
    return Math.atan2(y, x) * 180 / Math.PI;
}
function degToRad(angle) {
    return angle * (Math.PI / 180);
}
function getTanAngle(angle) {
    return Math.tan(angle * Math.PI / 180);
}
//vẽ định hướng
function renderDotLine() {
    var map = game.map

    if (containerLine) {
        stage.removeChild(containerLine)
        containerLine = new createjs.Container();
    }
    var dotLineArr = []
    var turnCheck = []
    var check = true
    if (player.angle < 90) {
        drawDotLeft()
    } else {
        drawDotRight()
    }
    function setCheck() {
        if (check == true) turnCheck[turnCheck.length - 1] == 0 ? drawDotRight() : drawDotLeft()
    }
    function drawDotLeft() {
        var startX = player.x,
            startY = player.y,
            sideK = startX
        if (dotLineArr.length != 0) {
            startX = dotLineArr[dotLineArr.length - 1].x
            startY = dotLineArr[dotLineArr.length - 1].y
            sideK = stage.canvas.width
        }
        var cosAngle = Math.abs(Math.cos(degToRad(player.angle)))
        var sideHMax = sideK / cosAngle
        var tanAngle = Math.abs(getTanAngle(player.angle))
        for (var sideH = 0; sideH < sideHMax + 30; sideH += 30) {
            if (sideH > sideHMax) sideH = sideHMax
            var sideKNew = cosAngle * sideH
            var sideD = sideKNew * tanAngle
            if (checkEndLine(startX - sideKNew, startY - sideD)) {
                check = false
                return
            }
            dotLineArr.push({ x: startX - sideKNew, y: startY - sideD })
        }
        if (dotLineArr[dotLineArr.length - 1].y <= 0) check = false
        turnCheck.push(0)
        setCheck()
    }
    function drawDotRight() {
        var startX = player.x,
            startY = player.y,
            sideK = startX
        if (dotLineArr.length != 0) {
            startX = dotLineArr[dotLineArr.length - 1].x,
                startY = dotLineArr[dotLineArr.length - 1].y
            sideK = stage.canvas.width
        }
        var cosAngle = Math.abs(Math.cos(degToRad(180 - player.angle)))

        var sideHMax = sideK / cosAngle
        var tanAngle = Math.abs(getTanAngle(180 - player.angle))
        for (var sideH = 0; sideH < sideHMax + 30; sideH += 30) {
            if (sideH > sideHMax) sideH = sideHMax
            var sideKNew = cosAngle * sideH
            var sideD = sideKNew * tanAngle
            if (checkEndLine(startX + sideKNew, startY - sideD)) {
                check = false
                return
            }
            dotLineArr.push({ x: startX + sideKNew, y: startY - sideD })
        }
        if (dotLineArr[dotLineArr.length - 1].y <= 0) check = false
        turnCheck.push(1)
        setCheck()
    }
    function checkEndLine(x, y) {
        if (y >= 0) {
            var index = lToIndex(x, y)
            return map[index.y][index.x].existing
        }
    }
    dotLineArr.shift()
    dotLineArr.forEach(dot => {
        drawDot(dot.x, dot.y)
    });
    var dotEnd = dotLineArr[dotLineArr.length - 1]
    var index = lToIndex(dotEnd.x, dotEnd.y)
    player.end = index
    var a = dotLineArr.filter(dot => dot.x == 0 || dot.x == stage.canvas.width)
    destinations = removeDuplicates(a)
    destinations.push({ x: game.map[index.y][index.x].x, y: game.map[index.y][index.x].y })
    for (let i = 0; i < destinations.length; i++) {
        if (destinations[i].x == stage.canvas.width) destinations[i] = { x: destinations[i].x - game.bubble.currentWidth, y: destinations[i].y }
    }
    stage.addChild(containerLine)

}
function drawDot(x, y) {
    var dot = new createjs.Sprite(spriteSheet, convertIdtoBubble(player.currentColor))
    dot.scaleX = game.bubble.scale;
    dot.scaleY = game.bubble.scale;

    dot.scaleX = (stage.canvas.width / 30) / game.bubble.width;
    dot.scaleY = (stage.canvas.width / 30) / game.bubble.width;

    dot.x = x
    dot.y = y
    containerLine.addChild(dot);
}
function removeDuplicates(arr) {
    var dataArr = arr.map(item => {
        return [JSON.stringify(item), item]
    });
    var maparr = new Map(dataArr);
    return [...maparr.values()]
}
function moveBubbleEnd() {
    var bubble = player.bubble.clone()
    var aReality = player.end
    var loacaton = game.map[aReality.y][aReality.x]
    containerMain.addChild(bubble)
    game.map[aReality.y][aReality.x] = { x: loacaton.x, y: loacaton.y, existing: true, bubble: bubble, color: player.currentColor, checked: false, checkAlone: false, vibration: false }
    stage.removeChild(player.bubble)
    player.end = null
    player.bubble = null
    destinations = []
    vibration(aReality.x, aReality.y)


}
// rung khi bubble player va chamj
async function vibration(x, y) {
    var arr = []
    var a = x, b = y
    await setVibration(x, y)
    var arr1 = await delaminations(x, y, 1)
    var arr2 = await delaminations(x, y, 2)
    var arr3 = await delaminations(x, y, 3)

    var index = game.map[y][x]
    game.map[y][x] = { x: index.x, y: index.y, existing: index.existing, bubble: index.bubble, color: index.color, checked: index.checked, checkAlone: index.checkAlone, vibration: false }

    await moveVibration(arr1, 7, 1)
    await moveVibration(arr2, 5, 2)
    moveVibration(arr3, 2, 3)
    function moveVibration(arr, side, turn) {
        arr.forEach(element => {
            var bubbles = game.map[element.y][element.x]
            var oldx = bubbles.x
            var oldy = bubbles.y
            var newIndex = setMove(index.x, index.y, oldx, oldy, side)
            game.map[element.y][element.x] = { x: bubbles.x, y: bubbles.y, existing: bubbles.existing, bubble: bubbles.bubble, color: bubbles.color, checked: bubbles.checked, checkAlone: bubbles.checkAlone, vibration: false }
            createjs.Tween.get(bubbles.bubble)
                .to({ x: newIndex.x, y: newIndex.y }, 100)
                .to({ x: oldx, y: oldy }, 100)
                .call(() => {
                    if (turn === 3 && element == arr[arr.length - 1]) {

                    }
                })
        });
        if (turn === 3) removeBubble(x, y)
    }
    // removeBubble(x, y)
    function setVibration(x, y) {
        if (x < a + 3 && y < b + 3 && x > a - 3 && y > b - 3) {
            y = y - 1 < 0 ? 1 : y
            y = y + 1 > 22 ? 22 : y
            x = x - 1 < 0 ? 1 : x
            if (y > 0 && y % 2 == 0) x = x + 1 > 9 ? 9 : x
            else x = x + 1 > 10 ? 10 : x
            if (y == 0) {
                if (x == 0) {
                    checkVibration('Right', x, y)
                    checkVibration('BottomRight', x, y)
                    checkVibration('Bottom', x, y)
                } else if (x == 10) {
                    checkVibration('Left', x, y)
                    checkVibration('BottomLeft', x, y)
                    checkVibration('Bottom', x, y)
                } else {
                    checkVibration('Left', x, y)
                    checkVibration('Right', x, y)
                    checkVibration('BottomRight', x, y)
                    checkVibration('Bottom', x, y)
                    checkVibration('BottomLeft', x, y)
                }
            } else if (y == 1) {
                if (x == 0) {
                    checkVibration('Top', x, y)
                    checkVibration('TopRight', x, y)
                    checkVibration('Right', x, y)
                    checkVibration('Bottom', x, y)
                } else if (x == 10) {
                    checkVibration('Left', x, y)
                    checkVibration('TopLeft', x, y)
                    checkVibration('Top', x, y)
                    checkVibration('BottomLeft', x, y)
                } else {
                    checkVibration('Left', x, y)
                    checkVibration('TopLeft', x, y)
                    checkVibration('Top', x, y)
                    checkVibration('TopRight', x, y)
                    checkVibration('Right', x, y)
                    checkVibration('Bottom', x, y)
                    checkVibration('BottomLeft', x, y)
                }
            } else if (y > 0 && y % 2 == 0) {
                checkVibration('Top', x, y)
                checkVibration('TopRight', x, y)
                checkVibration('Bottom', x, y)
                checkVibration('BottomRight', x, y)
                if (x == 0) {
                    checkVibration('Right', x, y)
                } else if (x == 9) {
                    checkVibration('Left', x, y)
                } else {
                    checkVibration('Left', x, y)
                    checkVibration('Right', x, y)
                }
            }
            else {
                if (x == 0) {
                    checkVibration('Top', x, y)
                    checkVibration('Right', x, y)
                    checkVibration('Bottom', x, y)
                } else if (x == 10) {
                    checkVibration('Left', x, y)
                    checkVibration('TopLeft', x, y)
                    checkVibration('BottomLeft', x, y)
                } else {
                    checkVibration('Left', x, y)
                    checkVibration('TopLeft', x, y)
                    checkVibration('Top', x, y)
                    checkVibration('Right', x, y)
                    checkVibration('Bottom', x, y)
                    checkVibration('BottomLeft', x, y)
                }
            }
        }
    }
    function checkVibration(direction, x, y) {
        var index = renderXY(direction, x, y)
        var bubble = game.map[index.y][index.x]
        if (bubble.vibration == false) {
            game.map[index.y][index.x] = { x: bubble.x, y: bubble.y, existing: bubble.existing, bubble: bubble.bubble, color: bubble.color, checked: bubble.checked, checkAlone: bubble.checkAlone, vibration: true }
            if (game.map[index.y][index.x].existing == true && y != 0) {
                arr.push({ x: index.x, y: index.y });
                setVibration(index.x, index.y)
            }
        }
    }

    function delaminations(x, y, turn) {
        var array = []
        var a = arr.filter(bubble => bubble.y == (y - turn) && bubble.x >= (x - turn) && bubble.x < (x + turn) || bubble.y == (y + turn) && bubble.x >= (x - turn) && bubble.x < (x + turn));
        var b = arr.filter(bubble => bubble.x == (x - turn) && bubble.y >= (y - turn) && bubble.y < (y + turn) || bubble.x == (x + turn) && bubble.y >= (y - turn) && bubble.y < (y + turn));
        var xNew = a.concat(b);
        xNew.forEach(element => {
            if (array.indexOf(element) < 0) array.push(element)
        });
        return array
    }
}
//di chuyển khi chạm
function setMove(x1, y1, x2, y2, anpha) {
    x = x2 - x1
    y = y2 - y1
    if (x < 0) {
        var xNew = x2 - anpha
        if (y < 0) {
            var yNew = y2 - ((anpha * (y1 - y2)) / (x1 - x2))
            return ({ x: xNew, y: yNew })
        } else if (y == 0) {
            var yNew = y2
            xNew = x2 - 2 * anpha
            return ({ x: xNew, y: yNew })
        } else {
            var yNew = y2 + ((anpha * (y2 - y1)) / (x1 - x2))
            return ({ x: xNew, y: yNew })
        }
    } else if (x == 0) {
        var xNew = x1
        if (y < 0) {
            var yNew = y2 - 3 * anpha
            return ({ x: xNew, y: yNew })
        } else if (y == 0) {
            var yNew = y2
            return ({ x: xNew, y: yNew })
        } else {
            var yNew = y2 - anpha
            return ({ x: xNew, y: yNew })
        }
    } else {
        var xNew = x2 + anpha
        if (y < 0) {
            var yNew = y2 - ((anpha * (y1 - y2)) / (x2 - x1))
            return ({ x: xNew, y: yNew })
        } else if (y == 0) {
            var yNew = y2

            xNew = x2 + 2 * anpha
            return ({ x: xNew, y: yNew })
        } else {
            var yNew = y2 + ((anpha * (y2 - y1)) / (x2 - x1))
            return ({ x: xNew, y: yNew })
        }
    }
}
//Check die bubble
function getAdjacentDie(x, y) {
    if (y == 1) {
        if (x == 0) {
            checkDie('Right', x, y)
            checkDie('Bottom', x, y)
        } else if (x == 10) {
            checkDie('Left', x, y)
            checkDie('BottomLeft', x, y)
        } else {
            checkDie('Left', x, y)
            checkDie('BottomLeft', x, y)
            checkDie('Bottom', x, y)
            checkDie('Right', x, y)
        }
    }
    else if (y > 0 && y % 2 == 0) {
        checkDie('Top', x, y)
        checkDie('TopRight', x, y)
        checkDie('Bottom', x, y)
        checkDie('BottomRight', x, y)
        if (x == 0) checkDie('Right', x, y)
        else if (x == 9) checkDie('Left', x, y)
        else {
            checkDie('Left', x, y)
            checkDie('Right', x, y)
        }
    }
    else {
        if (x == 0) {
            checkDie('Top', x, y)
            checkDie('Right', x, y)
            checkDie('Bottom', x, y)
        } else if (x == 10) {
            checkDie('Left', x, y)
            checkDie('TopLeft', x, y)
            checkDie('BottomLeft', x, y)
        } else {
            checkDie('Left', x, y)
            checkDie('TopLeft', x, y)
            checkDie('Top', x, y)
            checkDie('Right', x, y)
            checkDie('Bottom', x, y)
            checkDie('BottomLeft', x, y)
        }
    }
}
function checkDie(direction, x, y) {
    var index = renderXY(direction, x, y)
    var a = game.map[index.y][index.x]
    var color = a.color >= 10 && a.color < 20 ? a.color - 10 : a.color
    var color1 = game.map[y][x].color >= 10 && game.map[y][x].color < 20 ? game.map[y][x].color - 10 : game.map[y][x].color
    if (a.existing == true) {
        if (color1 == color && a.checked == false) {
            game.map[index.y][index.x] = { x: a.x, y: a.y, existing: a.existing, bubble: a.bubble, color: a.color, checked: true, checkAlone: a.checkAlone, vibration: a.vibration }
            getAdjacentDie(index.x, index.y)
            bubbleRemove.push({ x: index.x, y: index.y, obj: game.map[index.y][index.x] })
            updateLocationEmpty(index.x, index.y)
        }
    }
}
// xóa bubbles khi bắn khi thỏa mãn đk
async function removeBubble(x, y) {
    await getAdjacentDie(x, y)
    setPlayer()
    if (bubbleRemove.length >= 3) {
        var arrL = [], arrS = []
        bubbleRemove.forEach(index => {
            index.y >= y ? arrL.push(index) : arrS.push(index)
        });
        arrL.sort((a, b) => Number(a.y) - Number(b.y))
        arrS.sort((a, b) => Number(b.y) - Number(a.y))
        var index = 0
        var bubbleDie1 = setInterval(function () {
            if (index <= arrL.length - 1) {
                var a = arrL[index].obj
                containerMain.removeChild(a.bubble)
                bubbleDie(a.color, a.x, a.y)
                if (arrL.length > arrS.length && index == arrL.length - 1) {
                    clearInterval(bubbleDie1);
                    bubbleRemove = []
                    removeBubbleAlone()
                }
            }
            if (index <= arrS.length - 1) {
                var a = arrS[index].obj
                containerMain.removeChild(a.bubble)
                bubbleDie(a.color, a.x, a.y)
                if (arrS.length >= arrL.length && index == arrS.length - 1) {
                    clearInterval(bubbleDie1);
                    bubbleRemove = []
                    removeBubbleAlone()
                }
            }
            index++
        }, 30);

    }
    else {
        if (bubbleRemove.length != 0) bubbleRemove.forEach(i => {
            game.map[i.y][i.x] = { x: i.obj.x, y: i.obj.y, existing: i.obj.existing, bubble: i.obj.bubble, color: i.obj.color, checked: false, checkAlone: i.obj.checkAlone, vibration: i.obj.vibration }
        });
        bubbleRemove = []
        removeBubbleAlone()
    }
}
// call animation bubble die
function bubbleDie(color, x, y) {
    if (color < 7) {
        var bubble = new createjs.Sprite(spriteSheet, convertAnimations(color));
        bubble.scaleX = (stage.canvas.width / 10.4) / bubble.getBounds().width
        bubble.scaleY = (stage.canvas.width / 10.4) / bubble.getBounds().width
        bubble.x = x
        bubble.y = y;

        stage.addChild(bubble);
        bubble.on('animationend', handleComplete);
        function handleComplete() {
            stage.removeChild(this)
            bubble = null
        }
    }
    else if (color >= 10 && color < 20) {
        var item = new createjs.Sprite(spriteSheet, convertAnimations(color));
        item.scaleX = game.bubble.scale;
        item.scaleY = game.bubble.scale;
        item.x = x
        item.y = y;

        var calculation = Math.floor(Math.random() * 2);
        stage.addChild(item);
        var a = Math.floor(Math.random() * 50) + 50
        var xNew = calculation == 1 ? (x + a) > stage.canvas.width ? (stage.canvas.width - item.getBounds().width) : (x + a)
            : x - a < 0 ? 0 : x - a
        createjs.Tween.get(item)
            .to({ y: y + 100 + Math.floor(Math.random() * 50) }, 400)
            .to({
                guide: {
                    path: [
                        x, y + 100 + Math.floor(Math.random() * 50),
                        xNew, stage.canvas.height / 5,
                        -10, -30
                    ]
                },
            }, 1100)
            .call(() => {
                stage.removeChild(item)
                game.scores += 1
                text_scores.text = game.scores + " / " + game.total_score
                setStar()
                createjs.Tween.get(avatar, { loop: 2 })
                    .to({ rotation: 15 }, 50)
                    .to({ rotation: -10 }, 50)
                    .to({ rotation: 0 }, 50)

            })

    }
}
//check bubble alone
function getAdjacent(x, y) {
    if (y == 0) {
        if (x == 0) {
            checkAlone('Right', x, y)
            checkAlone('BottomRight', x, y)
            checkAlone('Bottom', x, y)
        } else if (x == 10) {
            checkAlone('Left', x, y)
            checkAlone('BottomLeft', x, y)
            checkAlone('Bottom', x, y)
        } else {
            checkAlone('Left', x, y)
            checkAlone('Right', x, y)
            checkAlone('BottomRight', x, y)
            checkAlone('Bottom', x, y)
            checkAlone('BottomLeft', x, y)
        }
    } else if (y == 1) {
        if (x == 0) {
            checkAlone('Top', x, y)
            checkAlone('TopRight', x, y)
            checkAlone('Right', x, y)
            checkAlone('Bottom', x, y)
        } else if (x == 10) {
            checkAlone('Left', x, y)
            checkAlone('TopLeft', x, y)
            checkAlone('Top', x, y)
            checkAlone('BottomLeft', x, y)
        } else {
            checkAlone('Left', x, y)
            checkAlone('TopLeft', x, y)
            checkAlone('Top', x, y)
            checkAlone('TopRight', x, y)
            checkAlone('Right', x, y)
            checkAlone('Bottom', x, y)
            checkAlone('BottomLeft', x, y)
        }
    } else if (y > 0 && y % 2 == 0) {
        checkAlone('Top', x, y)
        checkAlone('TopRight', x, y)
        checkAlone('Bottom', x, y)
        checkAlone('BottomRight', x, y)
        if (x == 0) {
            checkAlone('Right', x, y)
        } else if (x == 9) {
            checkAlone('Left', x, y)
        } else {
            checkAlone('Left', x, y)
            checkAlone('Right', x, y)
        }
    }
    else {
        if (x == 0) {
            checkAlone('Top', x, y)
            checkAlone('Right', x, y)
            checkAlone('Bottom', x, y)
        } else if (x == 10) {
            checkAlone('Left', x, y)
            checkAlone('TopLeft', x, y)
            checkAlone('BottomLeft', x, y)
        } else {
            checkAlone('Left', x, y)
            checkAlone('TopLeft', x, y)
            checkAlone('Top', x, y)
            checkAlone('Right', x, y)
            checkAlone('Bottom', x, y)
            checkAlone('BottomLeft', x, y)
        }
    }
}
function checkAlone(direction, x, y) {
    var index = renderXY(direction, x, y)
    var a = game.map[index.y][index.x]
    if (a.existing == true && a.checkAlone == false) {
        game.map[index.y][index.x] = { x: a.x, y: a.y, existing: a.existing, bubble: a.bubble, color: a.color, checked: a.checked, checkAlone: true, vibration: a.vibration }
        getAdjacent(index.x, index.y)
    }
}
async function getBubbleAlone() {
    var arr = []
    var x = 0, y = 0
    await getAdjacent(0, 0)
    game.map.forEach(element => {
        x = 0
        element.forEach(bubble => {
            if (bubble.checkAlone == false && bubble.existing == true && y != 0) {
                arr.push(game.map[y][x])
                updateLocationEmpty(x, y)
            }
            x++
        });
        y++
    });
    return arr
}
function resetAlone() {
    var x = 0, y = 0
    game.map.forEach(element => {
        x = 0
        element.forEach(bubble => {
            var a = game.map[y][x]
            game.map[y][x] = { x: a.x, y: a.y, existing: a.existing, bubble: a.bubble, color: a.color, checked: a.checked, checkAlone: false, vibration: a.vibration }
            x++
        });
        y++
    });
}
async function removeBubbleAlone() {
    var arr = await getBubbleAlone()
    if (arr.length != 0) {
        var minY = arr[0].y
        var maxY = arr[0].y
        arr.forEach(bubble => {
            if (bubble.y < minY) minY = bubble.y
        });
        arr.forEach(bubble => {
            if (bubble.y > maxY) maxY = bubble.y
        });
        var averageY = (maxY + minY) / 2

        arr.forEach(obj => {
            var rangeX = Math.floor(Math.random() * 2) + 10;
            var calculation = Math.floor(Math.random() * 2);

            var x = obj.x
            var y = obj.y
            var scale = obj.bubble.scaleX
            var x1 = x1 = x - rangeX < 0 ? 0 : x - rangeX
            var y1 = y >= averageY ? y - Math.floor(Math.random() * 20) - (y - averageY - 20) : y - Math.floor(Math.random() * 20) - 50
            if (calculation == 1) x1 = x + rangeX > stage.canvas.width ? stage.canvas.width : x + rangeX
            createjs.Tween.get(obj.bubble)
                .to({ scaleX: scale - 0.1, scaleY: scale - 0.1, x: x1, y: y1 }, 200)
                .to({ y: maxY + 200 }, (maxY + 200 - y) / 0.6)
                .call(() => {
                    bubbleDie(obj.color, obj.bubble.x, obj.bubble.y)
                    containerMain.removeChild(obj.bubble)
                    obj.bubble = null
                    setStar()
                })
        });
    }
    resetAlone()
    setStar()
}
//check win
function checkComplete() {
    var complete = true
    game.map.forEach(element => {
        element.forEach(bubble => {
            if (bubble.existing === true && bubble.y != 0) complete = false
        });
    });
    return complete
}
async function setStar() {
    var complete = await checkComplete()
    // var complete = true
    // win = true
    // game.total_score = game.scores
    if (complete == true && win == true && game.scores == game.total_score || game.scores == game.total_score && win == true) {
        setInterval(emitParticles, (Math.random() * 700) + 300);
        setInterval(emitParticles, (Math.random() * 700) + 300);
        var newBubble = []
        for (let i = 0; i < 16; i++) {
            var idBubble = Math.floor(Math.random() * 5);
            var bubble = new createjs.Sprite(spriteSheet, convertIdtoBubble(idBubble))
            bubble.scaleX = bubble.scaleY = Math.random() + 0.5
            bubble.x = Math.random() * stage.canvas.width * 6 / 8 + stage.canvas.width / 10
            bubble.y = Math.random() * stage.canvas.height / 3 + stage.canvas.height
            bubble.alpha = Math.floor(Math.random() * 2) == 1 ? 1 : Math.random()

            stage.addChild(bubble)
            createjs.Tween.get(bubble)
                .to({ y: stage.canvas.height * 0.5 / 2, alpha: 0.5 }, (bubble.y - (stage.canvas.height * 0.7 / 2)), createjs.Ease.linear)
                .call(() => {
                    newBubble.forEach(bubble => {
                        stage.removeChild(bubble)
                    });

                })
            newBubble.push(bubble)
        }
        console.log(idBubble);


        clearInterval(handMove);
        removeEvent()
        win = false
        game.map[0].forEach(top => {
            containerMain.removeChild(top.bubble)
        });
        game.map.forEach(row => {
            row.forEach(bubbles => {
                if (bubbles.existing == true && bubbles.color < 20) {
                    containerMain.removeChild(bubbles.bubble)
                    bubbleDie(bubbles.color, bubbles.x, bubbles.y)

                }
            });

        })

        var star = new createjs.Sprite(spriteSheet, 'logo')
        star.scaleX = (stage.canvas.width * 6.5 / 9) / star.getBounds().width;
        star.scaleY = (stage.canvas.width * 6.5 / 9) / star.getBounds().width;
        star.x = (stage.canvas.width - star.scaleX * star.getBounds().width) / 2
        star.y = - star.scaleY * star.getBounds().height



        var btn_continue = new createjs.Sprite(spriteSheet, 'play_now')
        btn_continue.scaleX = (stage.canvas.width / 3) / btn_continue.getBounds().width;
        btn_continue.scaleY = (stage.canvas.width / 3) / btn_continue.getBounds().width;
        btn_continue.x = (stage.canvas.width - btn_continue.scaleX * btn_continue.getBounds().width) / 2
        btn_continue.y = stage.canvas.height


        stage.addChild(star, btn_continue);
        createjs.Tween.get(star)
            .to({ y: stage.canvas.height * 1.75 / 3 - (star.scaleY * star.getBounds().height) * 1.2 }, 500, createjs.Ease.linear)
        // .call(()=>{
        //     newBubble.forEach(bubble => {
        //         stage.removeChild(bubble)
        //     });
        // })
        createjs.Tween.get(btn_continue)
            .to({ y: stage.canvas.height / 1.7 }, 500, createjs.Ease.linear)
            .call(() => {
                var x = btn_continue.x, y = btn_continue.y, scale = (stage.canvas.width / 3) / btn_continue.getBounds().width
                createjs.Tween.get(btn_continue, { loop: true })
                    .to({ scaleX: scale + 0.2, scaleY: scale + 0.2, x: x - stage.canvas.width / 40 }, 500, createjs.Ease.linear)
                    .to({ scaleX: scale, scaleY: scale, x: x }, 500, createjs.Ease.linear)
            })

        btn_continue.addEventListener("click", () => { window.open("https://play.google.com/store/apps/details?id=bubble.shooter.primitive.dinosaurs.egg.shot") }, false);

        // setTimeout(function () {
        //     var star0 = new createjs.Sprite(spriteSheet, 'star')
        //     var scaleStar = (stage.canvas.width / 10) / star0.getBounds().width
        //     var x1 = stage.canvas.width / 2 - (star0.getBounds().width * scaleStar) / 2


        //     star0.scaleX = (stage.canvas.width / 2) / star0.getBounds().width;
        //     star0.scaleY = (stage.canvas.width / 2) / star0.getBounds().width;
        //     star0.x = stage.canvas.width / 2 - (star0.getBounds().width * star0.scaleX) / 2
        //     star0.y = (stage.canvas.height / 5.5)
        //     var star1 = star0.clone()
        //     var star2 = star0.clone()
        //     createjs.Tween.get(star0)
        //         .to({
        //             rotation: -15,
        //             scaleX: scaleStar,
        //             scaleY: scaleStar,
        //             x: x1 - (star0.getBounds().width * scaleStar) * 1.3,
        //             y: (stage.canvas.height / 9.5)
        //         }, 500, createjs.Ease.linear)
        //         .call(() => {

        //             stage.addChild(star1);
        //             createjs.Tween.get(star1)
        //                 .to({
        //                     scaleX: scaleStar,
        //                     scaleY: scaleStar,
        //                     x: x1,
        //                     y: (stage.canvas.height / 14)
        //                 }, 500, createjs.Ease.linear)
        //                 .call(() => {
        //                     stage.addChild(star2);
        //                     createjs.Tween.get(star2)
        //                         .to({
        //                             rotation: 15,
        //                             scaleX: scaleStar,
        //                             scaleY: scaleStar,
        //                             x: x1 + (star0.getBounds().width * scaleStar) * 1.3,
        //                             y: (stage.canvas.height / 11.3)
        //                         }, 500, createjs.Ease.linear)
        //                 })
        //         })
        //     stage.addChild(star0);
        // }, 600);
    } else if (complete == true && win == false) removeEvent()
    else addEvent()
}
function renderXY(direction, x, y) {
    var xNew = x, yNew = y
    switch (direction) {
        case "Left":
            xNew = x - 1
            break;
        case "TopLeft":
            xNew = x - 1
            yNew = y - 1
            break;

        case "Top":
            yNew = y - 1
            break;

        case "TopRight":
            xNew = x + 1
            yNew = y - 1
            break;

        case "Right":
            xNew = x + 1
            break;

        case "BottomRight":
            xNew = x + 1
            yNew = y + 1
            break;

        case "Bottom":
            yNew = y + 1
            break;

        case "BottomLeft":
            xNew = x - 1
            yNew = y + 1
            break;
    }
    return { x: xNew, y: yNew }
}
//tìm khoảng cách giữa 2 điểm
function getDistance(p1, p2) {
    var a = p1.x - p2.x;
    var b = p1.y - p2.y;
    return Math.sqrt(a * a + b * b);
}
//set rỗng cho các vị trí không có bubble trên map
function updateLocationEmpty(x, y) {
    var a = game.map[y][x]
    game.map[y][x] = { x: a.x, y: a.y, existing: false, bubble: null, color: null, checked: false, checkAlone: false, vibration: false }
}
function detectMobile() {
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        });
        window.addEventListener("testPassive", null, opts);
        window.removeEventListener("testPassive", null, opts);
    } catch (e) { }
    var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) ? true : false);
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
// Event
function onMouseDown(evt) {
    downtime = 0
    stage.removeChild(tay)
    pressMove = true
    stage.removeChild(textContainer)
    var location = currentMouse(evt)
    var anpha = radToDeg(location.x - player.x, location.y - player.y) + 180

    if (anpha >= 8 && anpha <= 172) {
        player.angle = limitAngle(anpha)
        renderDotLine()
    } else {
        stage.removeChild(containerLine)
        containerLine = new createjs.Container();
        destinations = []
    }
}
function onPressMove(evt) {
    if (pressMove) {
        var location = currentMouse(evt)
        var anpha = radToDeg(location.x - player.x, location.y - player.y) + 180
        if (anpha >= 8 && anpha <= 172) {
            player.angle = limitAngle(anpha)
            renderDotLine()
        } else {
            stage.removeChild(containerLine)
            containerLine = new createjs.Container();
            destinations = []
        }
    }
}
function onMouseUp(evt) {
    pressMove = false
    if (destinations.length == 0) {
        return null;
    }
    if (destinations.length == 1) {
        removeEvent()
        var endP = destinations[destinations.length - 1]
        var s = getDistance({ x: player.bubble.x, y: player.bubble.y }, destinations[0])
        createjs.Tween.get(player.bubble)
            .to({ x: endP.x, y: endP.y }, s / player.v, createjs.Ease.linear)
            .call(moveBubbleEnd)
    } else {
        removeEvent()
        var s = getDistance({ x: player.bubble.x, y: player.bubble.y }, destinations[0])
        createjs.Tween.get(player.bubble)
            .to({ x: destinations[0].x, y: destinations[0].y }, s / player.v, createjs.Ease.linear)
            .call(move)
        var i = 1
        function move() {
            s = getDistance(destinations[i - 1], destinations[i])
            createjs.Tween.get(player.bubble)
                .to({ x: destinations[i].x, y: destinations[i].y }, s / (player.v * (1 + i / 10)), createjs.Ease.linear)
                .call(() => {
                    if (i < destinations.length - 1) {
                        i++
                        move()
                    } else moveBubbleEnd()
                })
        }
    }
    stage.removeChild(containerLine)
    containerLine = new createjs.Container();
}
function currentMouse(evt) {
    return isMobile ? { x: evt.changedTouches[0].clientX, y: evt.changedTouches[0].clientY } : { x: evt.layerX, y: evt.layerY }
}
function limitAngle(mouseangle) {
    var lbound = 8;
    var ubound = 172;
    if (mouseangle > ubound && mouseangle < 270) mouseangle = ubound
    if (mouseangle < lbound || mouseangle >= 270) mouseangle = lbound
    return mouseangle
}
function tick(event) {
    if (update) {
        updateParticles();

        stage.update(event);
        if (outer1 && outer2) {
            outer1.rotation++;
            outer2.rotation--;
        }
        // removeBubbleAlone()
    }
}
var handMove = setInterval(function () {
    if (downtime == 5) {
        stage.removeChild(textContainer)
        stage.removeChild(tay)
        stage.addChild(tay)
    }
    downtime += 1
}, 1000);



var particles = [];
const MAX_LIFE = 100;
var count = 0;


function emitParticles() {
    var fire_x = Math.floor(Math.random() * stage.canvas.width);
    var circle_r = Math.round(Math.random() * 3 + 3);
    var a = Math.floor(Math.random() * 2);
    var fire_y = a == 0 ? Math.floor(Math.random() * stage.canvas.height / 5) - stage.canvas.height / 30 : Math.floor(Math.random() * stage.canvas.height / 10) + stage.canvas.height * 2 / 5
    for (var i = 0; i < 180; i += 5) {
        var particle = new createjs.Shape();
        particle.graphics
            .beginFill(createjs.Graphics.getHSL(count, 75, 75))
            .drawPolyStar(100, 100, circle_r, 5, 0.6, -90)
        particle.x = fire_x;
        particle.y = fire_y;
        particle.compositeOperation = "lighter";
        stage.addChild(particle);
        var angle = i + 1;
        var pow = Math.random() * 10 + 3;
        particle.vx = pow * Math.cos((angle * 5) * Math.PI / 180);
        particle.vy = pow * Math.sin((angle * 5) * Math.PI / 180);
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
        particle.x += particle.vx;
        particle.y += particle.vy;
        var scale = particle.life / MAX_LIFE;
        particle.scaleX = particle.scaleY = scale;
        particle.life -= 1;
        // var a = particle.clone()
        // stage.addChild(a);
        // particles.push(a);
        if (particle.life <= 0) {
            stage.removeChild(particle);
            particles.splice(i, 1);
        }
    }
}