
//定义一个javascript数组
var board = new Array();

var hasConflicted = new Array();

//定义分数
var score = 0;

$(function () {
   newgame(); 
});

function newgame() {
    //初始化棋盘格
    init();
    //生成随机位置的两个随机数字
    generateOneNumber();
    generateOneNumber();
}

function restartgame(){
    $("#gameover").remove();
    updateScore(0);
    newgame();
}

//棋盘格是一个4乘4的16块的方格，所以我们需要创建一个二位数组来表示。
function init() {
    for (var i = 0; i < 4; i++) {
        //创建一个二位数组
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            //初始化每个小格子值为0
            board[i][j] = 0;
            hasConflicted[i][j] = false;

            //通过双重遍历获取每个格子的元素
            var gridCell = $("#grid-cell-" + i + "-" + j);
            //通过getPostTop() 方法设置每个格子距顶端的距离
            gridCell.css("top", getPosTop(i, j));
            //通过getPosLeft()方法设置每个格子距左端的距离
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    updateBoardView();
    score = 0;
    $("#score").text(score);
}

//需要一个4乘4的格子用来显示数字
function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //向棋盘格上增加数字格
            $("#grid-container").append("<div class='number-cell' id='number-cell-" + i + "-" + j + "'></div>");
            var numberCell = $("#number-cell-" + i + "-" + j);
            //如果棋盘格的值为0的话,设置数字格为高宽都为0
            if (board[i][j] == 0) {
                numberCell.css("width", "0px");
                numberCell.css("height", "0px");
                numberCell.css("top", getPosTop(i, j) + 50);
                numberCell.css("left", getPosLeft(i, j) + 50);
            }
            //如果棋盘格的值不为0的话,设置数字格为高宽为75并设置背景色和前景色及数字值
            else {
                numberCell.css("width", "100px");
                numberCell.css("height", "100px");
                numberCell.css("top", getPosTop(i, j));
                numberCell.css("left", getPosLeft(i, j));
                numberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
                numberCell.css("color", getNumberColor(board[i][j]));
                numberCell.text(board[i][j]);
            }
            hasConflicted[i][j] = false;
        }
    }
    //设置数字值的字体样式
    $(".number-cell").css("line-height", "100px");
    $(".number-cell").css("font-size", "60px");
}

//生成随机位置的一个随机数字
function generateOneNumber() {
    //1 生成一个随机位置
    //随机一个x坐标的位置
    var randx = parseInt(Math.floor(Math.random() * 4));
    //随机一个y坐标的位置
    var randy = parseInt(Math.floor(Math.random() * 4));
    //定义一个死循环,完成生成随机空格子
    while (true) {
        //如果当前格子的值为0,满足条件
        if (board[randx][randy] == 0) {
            break;
        }
        //否则重新随机一个位置
        var randx = parseInt(Math.floor(Math.random() * 4));
        var randy = parseInt(Math.floor(Math.random() * 4));
    }
    //2 生成一个随机数字（2048游戏规则只能是2或者4）
    var randNumber = Math.random() < 0.5 ? 2 : 4;

    //3 在随机位置显示随机数字
    board[randx][randy] = randNumber;
    //实现随机数字显示的动画
    ShowNumberWithAnimation(randx,randy,randNumber);
}
















