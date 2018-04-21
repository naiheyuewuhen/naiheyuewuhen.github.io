//依靠键盘的上、下、左、右来完成,捕获键盘响应的事件
$(document).keydown(function (event) {
    switch (event.keyCode){
        case 37://left
            /**
             * moveleft()方法完成向左移动的逻辑
             * 返回值是Boolean类型，判断是否可以向左移动
             */
            if(moveLeft()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 38://up
            if(moveUp()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 39://right
            if(moveRight()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        case 40://down
            if(moveDown()){
                setTimeout("generateOneNumber()", 210);
                setTimeout("isgameover()", 300);
            }
            break;
        default :
            break;
    }
})

//向左移动
function moveLeft() {
    //canMoveLeft 判断是否可以向左移动
    if (!canMoveLeft(board)) {
        //说明无法移动
        return false;
    }
    //左移逻辑
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //当前数字格有值的（2，4，······一定不是0）
            if (board[i][j] != 0) {
                //左移逻辑
                for (var k = 0; k < j; k++) {
                    //判断当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
                    if (board[i][k] == 0 && noBlokHorizontalCol(i, k, j, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, k, j, board) && !hasConflicted[i][k]) {
                        //判断当前值不为0的数字格与左边的数字格值相等并且中间的数字格必须值也为0
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

//向上移动
function moveUp() {
    //canMoveLeft 判断是否可以向左移动
    if (!canMoveUp(board)) {
        //说明无法移动
        return false;
    }
    for (var i = 1; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //当前数字格有值的（2，4，······一定不是0）
            if (board[i][j] != 0) {
                //左移逻辑
                for (var k = 0; k < i; k++) {
                    //判断当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
                    if (board[k][j] == 0 && noBlokHorizontalRow(k, i, j, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(k, i, j, board) && !hasConflicted[k][j]) {
                        //判断当前值不为0的数字格与左边的数字格值相等并且中间的数字格必须值也为0
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

//向右移动
function moveRight() {
    if (!canMoveRight(board)) {
        //说明无法移动
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            //当前数字格有值的（2，4，······一定不是0）
            if (board[i][j] != 0) {
                for (var k = 3; k > j; k--) {
                    //判断当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
                    if (board[i][k] == 0 && noBlokHorizontalCol(i, j, k, board)) {
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[i][k] == board[i][j] && noBlokHorizontalCol(i, j, k, board) && !hasConflicted[i][k]) {
                        //判断当前值不为0的数字格与左边的数字格值相等并且中间的数字格必须值也为0
                        showMoveAnimation(i, j, i, k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

//向下移动
function moveDown() {
    //canMoveDown 判断是否可以向下移动
    if (!canMoveDown(board)) {
        //说明无法移动
        return false;
    }
    //左移逻辑
    for (var i = 2; i >= 0 ; i--) {
        for (var j = 0; j < 4; j++) {
            //当前数字格有值的（2，4，······一定不是0）
            if (board[i][j] != 0) {
                //左移逻辑
                for (var k = 3; k > i; k--) {
                    //判断当前值不为0的数字格左边的数字格必须值为0并且中间的数字格必须值也为0
                    if (board[k][j] == 0 && noBlokHorizontalRow(i, k, j, board)) {
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    } else if (board[k][j] == board[i][j] && noBlokHorizontalRow(i, k, j, board) && !hasConflicted[k][j]) {
                        //判断当前值不为0的数字格与左边的数字格值相等并且中间的数字格必须值也为0
                        showMoveAnimation(i, j, k, j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        score += board[k][j];
                        updateScore(score);
                        hasConflicted[k][j] = true;
                        continue;
                    }
                }
            }
        }
    }
    setTimeout("updateBoardView();",200);
    return true;
}

function isgameover() {
    if(nospace(board) && nomove(board)){
        gameover();
    }
}

function gameover() {
    $("#grid-container").append("<div id='gameover' class='gameover'><p>本次得分</p>" +
        "<span>"+score+"</span><a href='javascript:restartgame();' id='restartgamebutton'>Restart</a></div>");
    var gameover = $("#gameover");
    gameover.css("width", "500px");
    gameover.css("height", "500px");
    gameover.css("background-color", "rgba(0, 0, 0, 0.5)");
}
