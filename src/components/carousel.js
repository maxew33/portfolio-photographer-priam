import React, {Component, Fragment} from 'react'
import {gallery} from './gallery'
// import {showGallery} from './showGallery'

import '../style/carousel.css'
import NavigationArrow from './navigationArrow'
import ImgDetailContainer from './imgDetailContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ShowPicture from './showPicture'

const galeries = gallery,
galerie = galeries[0],
$ = document.querySelector.bind(document),
$$ = document.querySelectorAll.bind(document)


console.log(galerie.src)

let idGalerie = 0,
galleryShown = false,
exitAllowed = false

const showGallery = (galerie) => {
    const titre = $('.titre'),
    name = $('.name'),
    container = $('.show__container'),
    navigationLeft = $('.navigation-left'),
    navigationRight = $('.navigation-right'),
    mainPicture = $('.show__pictures-img'),
    leftPictureContainer = $('.show__pictures-column-left'),
    centerPictureContainer = $('.show__pictures-column-center'),
    rightPictureContainer = $('.show__pictures-column-right'),
    backToTop = $('.backToTop')

    mainPicture.classList.add('show__pictures-img-shown')    


    backToTop.classList.add('backToTop-apparition')

    centerPictureContainer.setAttribute('style', 'position: absolute; top: 0;')
    rightPictureContainer.setAttribute('style', 'position: absolute; top: 70vh; align-items: center;')
    leftPictureContainer.setAttribute('style', 'position: absolute; top: 70vh; align-items: center;')

    let imageRank = 2

    let mainImageRank = 1
    
    titre.classList.add('titreToTop')
    name.classList.add('nameToTop')
    container.style.overflowY = 'scroll'
    navigationLeft.style.transform = 'translateX(-75vh)'
    navigationRight.style.transform = 'translateX(75vh)'

    setTimeout(function(){ 
        showPictures('left', 1)
        showPictures('right', 2)
    }, 500);

    //  AJOUTER UN EVENT LISTENER SUR KEY DOWN ET SWIPE

    container.addEventListener('scroll', (e) => {

        //chargement des images au cours du défilement
        const picturesFollowed = $$('img[data-follow = true]')
        for(const followed of picturesFollowed){
            const bottomPos = followed.getBoundingClientRect().bottom
            let rank = 0

            if (window.innerHeight >= bottomPos){
                followed.dataset.follow = false
                const place = followed.dataset.column
                if(place === 'center'){
                    mainImageRank++
                    if(mainImageRank >= galerie.img.length){mainImageRank = 0}
                    rank = mainImageRank
                }
                else{
                    imageRank++
                    if(imageRank >= galerie.img.length){imageRank = 0}
                    rank = imageRank
                }                
                showPictures(place, rank)
                }
            }

            //parallax effect j'accèlère le défilement des images des côtés par rapport à celles du centre
        const fastPictures = $$('img[data-parallax = true]')
        for(const fast of fastPictures){
            fast.style.transform = 'translateY( ' + 0.5 * centerPictureContainer.getBoundingClientRect().top + 'px)'
        }
    })

    const showPictures = (place, rank) =>{

        const picture = document.createElement('img')
        picture.className = "show__pictures-img-shown"
        picture.src = galerie.img[rank].src
        picture.alt = galerie.img[rank].name
        picture.dataset.follow = true
        picture.dataset.column = place
        picture.style.width = 100 + (Math.random()-1)*10 + '%'
        picture.addEventListener('click', () => { 
            //Modifier le state de carousel en mettant à jour le rank
            showPicture(galerie, rank)

        })

        switch(place){
            case 'right':
                picture.dataset.parallax='true'
                rightPictureContainer.appendChild(picture)
                picture.style.marginRight = 10 - (Math.random() * 10)+ 'vw'
                break

            case 'left':
                picture.dataset.parallax='true'
                leftPictureContainer.appendChild(picture)
                picture.style.marginLeft = 10 - (Math.random() * 10)+ 'vw'
                break

            // case 'center':
            //     centerPictureContainer.appendChild(picture)
            //     break

            default: 
                centerPictureContainer.appendChild(picture)
                break
        }
    }
}

const showPicture = (galerie, rank) => {

    console.log(galerie.img[rank].name)
    const img = galerie.img[rank]

        console.log('click sur : ' + img.name)
        console.log(img)
        $('.slide-transition').style.left = '100vw'
        setTimeout(function(){
            $('.image__detail').style.left = '0'
            $('.exitcross').style.opacity = '1'
        }, 500)
}

class Carousel extends Component {

    state = {
        galerie, 
        rank : 3,
        centerRank : 1,
        clicked : false,
        leftCol : [],
        middleCol : [],
        rightCol : []
    }


    handleClickArrow = (value) => {
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

    handleClickPhoto = (galerie, newRank) => {
        if(!galleryShown){
            galleryShown = true
            
            $('.show__pictures-img').classList.toggle('show__pictures-img-shown')
            $('.show__pictures-img').classList.toggle('step2')

            $('.backToTop').classList.toggle('backToTop-apparition')

            $('.show__pictures-column-center').setAttribute('style', 'position: absolute; top: 0;')
            $('.show__pictures-column-right').setAttribute('style', 'position: absolute; top: 70vh; align-items: center;')
            $('.show__pictures-column-left').setAttribute('style', 'position: absolute; top: 70vh; align-items: center;')
           
            $('.titre').classList.toggle('titreToTop')
            $('.name').classList.toggle('nameToTop')
            $('.show__container').style.overflowY = 'scroll'
            $('.navigation-left').style.transform = 'translateX(-75vh)'
            $('.navigation-right').style.transform = 'translateX(75vh)'

            setTimeout(() =>{
                this.setState({
                    leftCol : [...this.state.leftCol, <ShowPicture galerie = {galerie}  position = 'left' rank = '1' clicked = { () => this.handleClickPhoto(galerie, 1)}/>]
                })
                this.setState({
                    rightCol : [...this.state.rightCol, <ShowPicture galerie = {galerie}  position = 'right' rank = '2' clicked = { () => this.handleClickPhoto(galerie, 2)}/>]
                })
               console.log('apparition sur les côtés')
            }, 500);
        }
        else{
            console.log('click, rank : ' + newRank)
            this.setState({ rank: newRank })
            this.setState({ clicked: !this.state.clicked })
            console.log('rank state : ' + this.state.rank)
            showPicture(galerie, newRank)
            exitAllowed = true
        }
    }

    handleClickExit = (rank) => {
        console.log('click on exit : ' + rank)
        if (exitAllowed){
            $('.slide-transition').style.left = '-100vw'
            $('.exitcross').style.opacity = '0'
            setTimeout(() => {
                $('.image__detail').style.left = '-100vw'
                this.setState({ clicked: !this.state.clicked })
            }, 500)
            exitAllowed = false
        }
    }

    handleScroll = () => {
       console.log('scroll de handlescroll')
               //chargement des images au cours du défilement
               const picturesFollowed = $$('img[data-follow = true]')
               const galerie = this.state.galerie
               for(const followed of picturesFollowed){
                   const bottomPos = followed.getBoundingClientRect().bottom
       
                   if (window.innerHeight >= bottomPos){
                       followed.dataset.follow = false
                       const place = followed.dataset.column
                       if(place === 'center'){
                           let rank = this.state.centerRank
                           rank++
                           if(rank >= galerie.img.length){rank = 0}
                           this.setState ({centerRank : rank})
                           this.setState({
                            middleCol : [...this.state.middleCol, <ShowPicture galerie = {galerie}  position = 'center' rank = {rank} clicked = { () => this.handleClickPhoto(galerie, rank)}/>]
                         })

                       }
                       else {
                        let rank = this.state.rank
                        rank++
                        if(rank >= galerie.img.length){rank = 0}
                        this.setState ({rank : rank})

                           if(place === 'left'){
                               this.setState({
                                   leftCol : [...this.state.leftCol, <ShowPicture galerie = {galerie}  position = 'left' rank = {rank} clicked = { () => this.handleClickPhoto(galerie, rank)}/>]
                                })
                            }
                            else if(place === 'right'){
                                this.setState({
                                    rightCol : [...this.state.rightCol, <ShowPicture galerie = {galerie}  position = 'right' rank = {rank} clicked = { () => this.handleClickPhoto(galerie, rank)}/>]
                                })
                            }             
                    //    showPictures(place, rank)
                       }
                   }
       
                   //parallax effect j'accèlère le défilement des images des côtés par rapport à celles du centre
               const fastPictures = $$('img[data-parallax = true]')
               for(const fast of fastPictures){
                   fast.style.transform = 'translateY( ' + 0.5 * $('.show__pictures-column-center').getBoundingClientRect().top + 'px)'
               }
            }
    }

    // handleUpdateRank = (newRank) => {
    //     const rank = { ...this.state.rank }
    //     rank = newRank
    //     this.setState ({rank})
    // }

    render(){
        const { galerie, rank } = this.state

        document.documentElement.style.setProperty('--main-color', galerie.color)

        return(
            <Fragment>
            <div className="show__container"
            onScroll = { () => this.handleScroll()}
            >

                <div className="show__pictures-column show__pictures-column-left">
                    <NavigationArrow 
                        direction='left' 
                        chgt = { () => this.handleClickArrow(-1)}/>
                    {this.state.leftCol}
                </div>

                <div className="show__pictures-column show__pictures-column-center">
                    <img
                        className="show__pictures-img"
                        data-follow='true'
                        data-column='center'
                        src = {galerie.img[0].src} 
                        alt = {galerie.name}
                        onClick = { () => this.handleClickPhoto(galerie, 0) }
                        // onLoad = { () => this.handleLoad(galerie.color) }
                        // updateRank = { (newRank) => this.handleUpdateRank(newRank) }
                    />
                    {this.state.middleCol}
                </div>

                {/* <ShowPictures
                    galerie = {galerie}
                /> */}

                <div className="show__pictures-column show__pictures-column-right">
                    <NavigationArrow 
                        direction='right' 
                        chgt = { () => this.handleClickArrow(1)}/>
                    {this.state.rightCol}
                </div>

                <h2 className="titre">
                    {galerie.name}
                </h2>
                
            </div>

            {/* <div className="image__detail"></div> */}

            {this.state.clicked ? <ImgDetailContainer 
                galerie = {galerie}
                rank = {rank}
                /> : null}

                <div className="exitcross"
                    onClick={ () => this.handleClickExit(rank) }>
                    <FontAwesomeIcon icon={faTimes} />
                </div>

            </Fragment>

        )
    }
}

export default Carousel