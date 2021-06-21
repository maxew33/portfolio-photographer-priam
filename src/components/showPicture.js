import React from 'react'

const ShowPicture = ({ galerie, position, rank, clicked, key }) =>{

    let newSideMarginValue = 5 - (Math.random() * 5),
    newBottomMarginValue = 2.5 + (Math.random() * 5),
    newMargin = '3vw 0 5vw 0',
    widthValue = 100

    if(position === 'right'){
        newMargin = '3vw ' + newSideMarginValue + 'vw ' + newBottomMarginValue + 'vw 0'
    }
    else if(position === 'left'){
        newMargin = '3vw 0' + newBottomMarginValue + 'vw ' + newSideMarginValue + 'vw'
    }
    else if(position === 'center'){
        widthValue = 90
    }

    const divStyle = {
        width : widthValue + (Math.random()-1)*10 + '%',
        margin : newMargin
    }

    return(
            <img
            className="show__pictures-img-shown"
            data-follow='true'
            data-column={position}
            key = {key}
            src={galerie.img[rank].src}
            alt={galerie.img[rank].name}
            style={divStyle}
            onClick={clicked}
            />
    )
}

export default ShowPicture