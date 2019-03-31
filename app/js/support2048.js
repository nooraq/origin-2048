const documentWidth = window.screen.availWidth;
let gridContainerWidth = 0.92 * documentWidth
let cellSideLength = 0.18 * documentWidth;
let cellSpace = 0.04 * documentWidth;
//获取当前格子正确位置
const getPosTop = (i) => {
    return cellSpace + i * (cellSpace + cellSideLength);
}
const getPosLeft = (j) => {
    return cellSpace + j * (cellSpace + cellSideLength);
}

//设置格子背景色
const getNumberBackgroundColor = (number) =>{
    switch(number){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break; 
        case 8:return "#f2b179";break; 
        case 16:return "#f59563";break; 
        case 32:return "#f67c5f";break; 
        case 64:return "#f65e3b";break; 
        case 128:return "#edcf72";break; 
        case 256:return "#edcc61";break; 
        case 512:return "#9c0";break; 
        case 1024:return "#33b5e5";break; 
        case 2048:return "#09c";break; 
        case 4096:return "#a6c";break;  
        case 8912:return "#93c";break;  
    }
    return "black";
}

//设置文字颜色
const getNumberColor = (number) => {
    if (number<=4) return "#776e65";

    return "white";
}
//判断十六个格子是否已满
const ifnospace = (board) => {
    for(var i=0;i<4;i++){
        for(var j=0;j<4;j++){
            if(board[i][j]==0)
            return false;
        }
    }
    return true;
}
// 判断是否可以行动，（合并或者移动）
const nomove = (board) => {
    for(let i = 0;i < 4; i+=1){
        for(let j = 0;j < 4;j += 1){
            if(i !== 0){
                if (board[i][j] === board[i-1][j]){
                    return false;
                }
            }
            if( i !== 3 ){
                if(board[i+1][j] === board[i][j]){
                    return false;
                }
            }
            if( j !== 0){
                if(board[i][j-1] === board[i][j]) return false;
            }
            if (j !== 3){
                if(board[i][j+1] ===board[i][j]) return false;
            }
            
        }
    }
    return true;
}
// 向左移动
const moveLeft = () => {
if (canMoveLeft(board)){
    for(let i = 0; i < 4; i+=1 ){
        for(let j = 1; j < 4; j += 1){
            if(board[i][j] !== 0){
                for(let k = 0;k < j; k += 1){
                    if(board[i][k] == 0 && noBlockHorizontalRow(i,k,j,board)){
                        //move
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }else if(board[i][k] == board[i][j] 
                        && noBlockHorizontalRow(i,k,j,board)
                        && hasConflicted[i][k] === false){
                        //move
                        showMoveAnimation(i,j,i,k);
                        hasConflicted[i][k] = true;
                        //add
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //addScore;
                        score += board[i][k];
                        updateScore(score);
                        continue;
                    }
                }
            }
        }

    }
    setTimeout("updateBoardView()",200);
    return true;
}
    return false;
}
//查看是否可以移动
const canMoveLeft = (board) => {
for(let i = 0;i < 4;i++){
    for(let j = 1; j < 4; j+=1){
        if(board[i][j] !== 0){
            if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
                    return true;
            }

        }
    }

}
    return false;
}

//同左，向上移动
const moveUp = () =>{
    if (canMoveUp(board)){
        for(let j = 0; j < 4; j+=1 ){
            for(let i = 1; i < 4; i += 1){
                if(board[i][j] !== 0){
                    for(let k = 0;k < i; k += 1){
                        if(board[k][j] == 0 && noBlockHorizontalCol(j,k,i,board)){
                            //move
                            showMoveAnimation(i,j,k,j);
                            board[k][j] = board[i][j];
                            board[i][j] = 0;
                            continue;
                        }else if(board[k][j] == board[i][j] 
                            && noBlockHorizontalCol(j,k,i,board)
                            && hasConflicted[k][j] === false){
                            //move
                            showMoveAnimation(i,j,k,j);
                            hasConflicted[k][j] = true;
                            //add
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            //addScore;
                            score += board[k][j];
                            updateScore(score);
                            continue;
                        }
                    }
                }
            }
    
        }
        setTimeout("updateBoardView()",200);
        return true;
    }
        return false;
    }
    
    const canMoveUp = (board) => {
    for(let j = 0;j < 4;j++){
        for(let i = 1; i < 4; i+=1){
            if(board[i][j] !== 0){
                if(board[i-1][j] == 0 || board[i-1][j] == board[i][j]){
                        return true;
                }
    
            }
        }
    
    }
        return false;
    }

    const moveRight = () => {
        if (canMoveRight(board)){
            for(let i = 0; i < 4; i+=1 ){
                for(let j = 2; j>=0 ; j -= 1){
                    if(board[i][j] !== 0){
                        for(let k = 3;k > j; k -= 1){
                            if(board[i][k] == 0 && noBlockHorizontalRow(i,j,k,board)){
                                //move
                                showMoveAnimation(i,j,i,k);
                                board[i][k] = board[i][j];
                                board[i][j] = 0;
                                continue;
                            }else if(board[i][k] == board[i][j] 
                                && noBlockHorizontalRow(i,j,k,board)
                                && hasConflicted[i][k] === false ){
                                //move
                                showMoveAnimation(i,j,i,k);
                                hasConflicted[i][k] = true;
                                //add
                                board[i][k] += board[i][j];
                                board[i][j] = 0;
                                //addScore;
                            score += board[i][k];
                            updateScore(score);
                                continue;
                            }
                        }
                    }
                }
        
            }
            setTimeout("updateBoardView()",200);
            return true;
        }
            return false;
        }
        
        const canMoveRight = (board) =>{
        for(let i = 0;i < 4;i++){
            for(let j = 2; j >= 0; j-=1){
                if(board[i][j] !== 0){
                    if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
                            return true;
                    }
        
                }
            }
        
        }
            return false;
        }

        const moveDown = () =>{
            if (canMoveDown(board)){
                for(let j = 0; j < 4; j+=1 ){
                    for(let i = 2; i >= 0; i -= 1){
                        if(board[i][j] !== 0){
                            for(let k = 3;k > i; k -= 1){
                                if(board[k][j] == 0 && noBlockHorizontalCol(j,i,k,board)){
                                    //move
                                    showMoveAnimation(i,j,k,j);
                                    board[k][j] = board[i][j];
                                    board[i][j] = 0;
                                    continue;
                                }else if(board[k][j] == board[i][j] 
                                    && noBlockHorizontalCol(j,i,k,board)
                                    && hasConflicted[k][j] === false ){
                                    //move
                                    showMoveAnimation(i,j,k,j);
                                    hasConflicted[k][j] = true;
                                    //add
                                    board[k][j] += board[i][j];
                                    board[i][j] = 0;
                            //addScore;
                            score += board[k][j];
                            updateScore(score);
                                    continue;
                                }
                            }
                        }
                    }
            
                }
                setTimeout("updateBoardView()",200);
                return true;
            }
                return false;
            }
            
            const canMoveDown = (board) =>{
            for(let j = 0;j < 4;j++){
                for(let i = 2; i >=0; i-=1){
                    if(board[i][j] !== 0){
                        if(board[i+1][j] == 0 || board[i+1][j] == board[i][j]){
                                return true;
                        }
            
                    }
                }
            
            }
                return false;
            }

//看第row横行从左到右是否有空格
const noBlockHorizontalRow = (row,col1,col2,board) => {  
    for(let i = col1+1; i < col2; i+= 1){
        if(board[row][i] !== 0){
            return false;
        }
    }
    return true;
    
}
//看第col列从上到下是否有空的格
const noBlockHorizontalCol = (col,row1,row2,board) => {

    for(let i = row1+1; i < row2; i+= 1){
        if(board[i][col] !== 0){
            return false;
        }
    }
    return true;
    
}
// 移动端做出修改，当分辨率大于500 就为pc端正常设置，《500为移动端
 const preForMoblie = () =>{
    if (documentWidth > 500){
        gridContainerWidth = 500;
        cellSpace = 20;
        cellSideLength = 100;
        //触发鼠标hover变黑
        $('#newgamebutton').mouseover(function (){
            $(this).css('color','black');
        });
        $('#newgamebutton').mouseout(function (){
            $(this).css('color','white');
        });
    }
    $('#grid-container').css('width',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('height',gridContainerWidth-2*cellSpace);
    $('#grid-container').css('padding',cellSpace);
    $('#grid-container').css('border-radius',0.02 * gridContainerWidth);
    $('.grid-cell').css('width',cellSideLength);
    $('.grid-cell').css('height',cellSideLength);
    $('.grid-cell').css('border-radius', 0.02 * cellSideLength);
}