//动画显示随机数字
function ShowNumberWithAnimation(i,j,randNumber) {
    //获取当前的数字格
    var numberCell = $("#number-cell-" + i + "-" + j);
    //设置当前的数字格的背景色和前景色及数字值
    numberCell.css("background-color", getNumberBackgroundColor(randNumber));
    numberCell.css("color", getNumberColor(randNumber));
    numberCell.text(randNumber);
    //设置当前的数字格的显示动画
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}
//实现数字格移动的动画逻辑
function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $("#number-cell-" + fromx + "-" + fromy);
    numberCell.animate({
        top: getPosTop(tox, toy),
        left: getPosLeft(tox, toy)
    }, 200);
}

//更新分数
function updateScore(score) {
    $("#score").text(score);
}