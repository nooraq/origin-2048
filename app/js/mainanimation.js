const showNumberWithAnimation = (i,j,randNumber) =>{
    const numberCell = $('#number-cell-'+i+'-'+j);

    numberCell.css("background-color",getNumberBackgroundColor(randNumber));
    numberCell.css("color",getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate( {
        width: cellSideLength,
        height: cellSideLength,
        top: getPosTop(i),
        left:getPosLeft(j),
    },50 );
}

const showMoveAnimation = ( fromx,fromy,tox,toy) => {

    const numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        top:getPosTop(tox),
        left:getPosLeft(toy),
    },200);
    return true;
}

const updateScore = ()  => {
    $("#score").text(score);
}