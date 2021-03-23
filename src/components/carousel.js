import React, {Component, Fragment} from 'react'
import {gallery} from './gallery'
import {showGallery} from './showGallery'

import '../style/carousel.css'
import NavigationArrow from './navigationArrow'
import ImgDetailContainer from './imgDetailContainer'
import ShowPictures from './showPictures'

const galeries = gallery,
galerie = galeries[0]

console.log(galerie.src)

let idGalerie = 0,
galleryShown = false,
rank = 0

class Carousel extends Component {

    state = {
        galerie, rank
    }

    handleClick = (value) => {
        const galerie = { ...this.state.galerie }

        idGalerie += value
        if(idGalerie < 0){idGalerie = galeries.length - 1}
        if(idGalerie === galeries.length){ idGalerie = 0 }
        
        galerie.name = galeries[idGalerie].name
        galerie.src = galeries[idGalerie].src
        galerie.color = galeries[idGalerie].color
        galerie.id = galeries[idGalerie].id
        galerie.img = galeries[idGalerie].img
        this.setState({ galerie })

        // document.documentElement.style.setProperty('--main-color', galerie.color)
    }

    // handleLoad = (color) => {
    //     document.documentElement.style.setProperty('--main-color', color)
    // }

    handleClickPhoto = (galerie) => {
        if(!galleryShown){
            galleryShown = true
            showGallery(galerie)
        }
    }

    // handleUpdateRank = (newRank) => {
    //     const rank = { ...this.state.rank }
    //     rank = newRank
    //     this.setState ({rank})
    // }

    render(){
        const { galerie } = this.state

        document.documentElement.style.setProperty('--main-color', galerie.color)

        return(
            <Fragment>
            <div className="show__container">

                <div className="show__pictures-column show__pictures-column-left">
                    <NavigationArrow 
                        direction='left' 
                        chgt = { () => this.handleClick(-1)}/>
                </div>

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

                {/* <ShowPictures
                    galerie={galerie}
                /> */}

                <div className="show__pictures-column show__pictures-column-right">
                    <NavigationArrow 
                        direction='right' 
                        chgt = { () => this.handleClick(1)}/>
                </div>

                <h2 className="titre">
                    {galerie.name}
                </h2>
                
            </div>

            {/* <div className="image__detail"></div> */}
            <ImgDetailContainer 
                galerie = {galerie}
                rank = {rank}
                />
            </Fragment>
        )
    }
}

export default Carousel