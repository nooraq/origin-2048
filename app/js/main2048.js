//游戏分数
let score=0;
let board = [];
let hasConflicted = [];
let times = 0;
let startx = 0;
let starty = 0;
let endx = 0;
let endy = 0;
$(document).ready( () =>{
    preForMoblie();
    newgame();});
const newgame = () =>{
       //在随机两个格子生成数字。
    //初始化棋盘格
    init();
    generateOneNumber();
    generateOneNumber();
}
const init = () => {
    for (let i=0;i<4;i++){
        for(let j=0;j<4;j++){
            let gridCell=$("#grid-cell-"+i+"-"+j);
            //传入相应坐标值TOP
            gridCell.css('top',getPosTop(i));
            gridCell.css('left',getPosLeft(j));
            //  console.log(i);
            //  console.log(j);
            //  console.log(gridCell);
            
           }
    }
    for(let i=0;i<4;i++){
        board[i]=[];
        hasConflicted[i] = [];
        for(let j=0;j<4;j++){
            board[i].push(0);
            hasConflicted[i].push(false);
            // console.log(board[i][j]);
        }
    }
    updateBoardView();
    score = 0;
}


const updateBoardView = () =>{
    $(".number-cell").remove();
    for(let i=0;i<4;i++)
        for(let j=0;j<4;j++){
           $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            const theNumberCell = $('#number-cell-'+i+'-'+j);
            //判断该地方是否有分数快，board数值为0时，证明该地没有移动块。
            if(board[i][j]==0){
                theNumberCell.css("width","0px");
                theNumberCell.css("height","0px");
                //分数为0时，他的num块不是没有，而是大小为0；所以同时居中他们的num，就要在原本的位置加1/2；
                theNumberCell.css("top",getPosTop(i) + cellSideLength/2);
                theNumberCell.css("left",getPosLeft(j) + cellSideLength/2);
            }else{
                // theNumberCell.css("line-height",cellSideLength + 'px');
                // theNumberCell.css("font-size",0.6 *cellSideLength + 'px');
                // console.log(theNumberCell);
                theNumberCell.css("width",cellSideLength);
                theNumberCell.css("height",cellSideLength);
                theNumberCell.css("top",getPosTop(i));
                theNumberCell.css("left",getPosLeft(j));
                theNumberCell.css("background-color",getNumberBackgroundColor(board[i][j]));
                theNumberCell.css("color",getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);

            }
            hasConflicted[i][j] = false;
        }
        // console.log(document.getElementsByClassName('number-cell'));
        
    $('.number-cell').css('line-height',cellSideLength+'px');
    $('.number-cell').css('font-size',cellSideLength * 0.6+'px');
}
    
    const generateOneNumber = () =>{
        if(ifnospace(board))
        return false;

    //随机一个位置
    let randx;
    let randy;
    do{
         randx=parseInt(Math.floor(Math.random()*4));
         randy=parseInt(Math.floor(Math.random()*4));
        if(board[randx][randy]==0)
        break;
        times += 1;
        }
          while( times < 50);
    if(times >= 50){
        findSuccess:
        for(let i = 0; i <= 3; i += 1){
            for(let j = 0;j <= 3; j +=1){
                if(board[i][j] === 0){
                    randx = i;
                    randy = j;
                    break findSuccess;
                }
            }
        }
    }
    times = 0;
    //随机一个数字
        let randNumber=Math.random()<0.5?2 : 4;
    //在随机位置显示随机数字
        board[randx][randy]=randNumber;
        showNumberWithAnimation(randx,randy,randNumber);
        return true;
    }

document.addEventListener('touchstart',(event) => {
    startx = event.touches[0].pageX;
    starty = event.touches[0].pageY;
});

document.addEventListener('touchmove', (event) => {
    event.preventDefault();
    event.stopPropagetion();
})
document.addEventListener('touchend',(event) => {
    endx = event.changedTouches[0].pageX;
    endy = event.changedTouches[0].pageY;
    let deltax = endx - startx;
    let deltay = endy - starty;
    if(Math.abs(deltax)< 0.15 * documentWidth && Math.abs(deltay) < 0.15 * documentWidth){
        return false;
    }
    if(Math.abs(deltax) >= Math.abs(deltay)){
        if(deltax > 0){
            //move right
            if(moveRight()){
                generateOneNumber();
                isGameOver();
            }
        }else{
            if(moveLeft()){
                generateOneNumber();
                isGameOver();
            }
        }
    }else{
        if(deltay > 0){
            //move up
            if(moveDown()){
                generateOneNumber();
                isGameOver();
            }
        }else{
            if(moveUp()){
                generateOneNumber();
                isGameOver();
            }
        }
    }
    return true;
});

$(document).keydown( (event) => {
    switch(event.keyCode){
        //left
        case 37 :     event.preventDefault();
        if(moveLeft()){
            generateOneNumber();
            isGameOver();
        } break;
        //up
        case 38 :     event.preventDefault();  
        if(moveUp()){
            generateOneNumber();
            isGameOver();
        } break;
        //right
        case 39 :      event.preventDefault(); 
        if(moveRight()){
            generateOneNumber();
            isGameOver();
        } break;
        // down
        case 40 :     event.preventDefault(); 
        if(moveDown()){
            generateOneNumber();
            isGameOver();
        } break;
        default : break;
    }
});

const isGameOver = () =>{
    if (ifnospace(board) && nomove(board)){
        gameOver();
    }
};

const gameOver = () =>{
   setTimeout("alert('GameOver!')",250) ;
}

