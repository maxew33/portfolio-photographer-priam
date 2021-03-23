import React from 'react'
// import '../style/showPictures.css'

const ShowPictures = ({ galerie }) =>{

    // handleClick = (value) => {
    //     const galerie = { ...this.state.galerie }

    //     idGalerie += value
    //     if(idGalerie < 0){idGalerie = galeries.length - 1}
    //     if(idGalerie === galeries.length){ idGalerie = 0 }
        
    //     galerie.name = galeries[idGalerie].name
    //     galerie.src = galeries[idGalerie].src
    //     galerie.color = galeries[idGalerie].color
    //     galerie.id = galeries[idGalerie].id
    //     galerie.img = galeries[idGalerie].img
    //     this.setState({ galerie })

    //     // document.documentElement.style.setProperty('--main-color', galerie.color)
    // }

    return(
        <div className="show__pictures-column show__pictures-column-center">
            <img
            className="show__pictures-img"
            data-follow='true'
            data-column='center'
            src={galerie.img[0].src}
            alt={galerie.name}
            onClick={ () => this.handleClickPhoto(galerie) }
            // onLoad= { () => this.handleLoad(galerie.color) }
            // updateRank = { (newRank) => this.handleUpdateRank(newRank)}
            />
        </div>
    )
}

export default ShowPictures