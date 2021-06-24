import React, {Component, Fragment} from 'react'
import {gallery} from './gallery'
import '../style/carousel.css'

import NavigationArrow from './navigationArrow'
import ImgDetailContainer from './imgDetailContainer'
import ShowPicture from './showPicture'
import ContactForm from './contactForm'
import Social from './social'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFlickr } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faTimes, faChevronLeft, faChevronUp, faChevronRight } from '@fortawesome/free-solid-svg-icons'


const galeries = gallery,
galerie = galeries[0],
$ = document.querySelector.bind(document),
$$ = document.querySelectorAll.bind(document)


let idGalerie = 0,
galleryShown = false,
exitAllowed = false,
xStart,
xEnd,
xDelta

const showPicture = (galerie, rank) => {

    console.log(galerie.img[rank].name)
    const img = galerie.img[rank]

        console.log('click sur : ' + img.name)
        console.log(img)
        $('.slide-transition').style.transform = 'translateX(100vw)'
        setTimeout(function(){
            $('.image__detail').style.transform = 'translateX(0)'
            $('.exitcross').style.opacity = '1'
            $('.exitcross').style.display = 'block'
        }, 500)
}

class Carousel extends Component {

    state = {
        galerie, 
        leftRank : 3,
        rightRank : 4,
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
    }

    handleClickPhoto = (galerie, newRank) => {
        if(!galleryShown){
            galleryShown = true
            
            $('.show__pictures-img').classList.toggle('show__pictures-img-shown')
            $('.show__pictures-img').classList.toggle('step2')

            $('.backToTop').classList.toggle('backToTop-apparition')
            $('.previous').classList.toggle('previous-apparition')

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
                    leftCol : [...this.state.leftCol, <ShowPicture galerie = {galerie}  position = 'left' rank = '1' clicked = { () => this.handleClickPhoto(galerie, 1)}/>],
                    rightCol : [...this.state.rightCol, <ShowPicture galerie = {galerie}  position = 'right' rank = '4' clicked = { () => this.handleClickPhoto(galerie, 4)}/>],
                    centerRank : '2',
                    middleCol : [...this.state.middleCol, <ShowPicture galerie = {galerie}  position = 'center' rank = '2' clicked = { () => this.handleClickPhoto(galerie, 2)}/>]
              })

               console.log('apparition sur les côtés')
            }, 500);
        }
        else{
            console.log('click, rank : ' + newRank)
            this.setState({ 
                rank: newRank,
                clicked: !this.state.clicked 
            })
            console.log('rank state : ' + this.state.rank)
            showPicture(galerie, newRank)
            $('.backToTop').classList.toggle('backToTop-apparition')
            $('.previous').classList.toggle('previous-apparition')
            exitAllowed = true
        }
    }

    handleClickExit = () => {
        if (exitAllowed){
            $('.slide-transition').style.transform = 'translateX(-100vw)'
            $('.exitcross').style.opacity = '0'
            setTimeout(() => {
                $('.backToTop').classList.toggle('backToTop-apparition')
                $('.previous').classList.toggle('previous-apparition')
                $('.image__detail').style.transform = 'translateX(-100vw)'
                this.setState({ clicked: !this.state.clicked })
            }, 500)
            exitAllowed = false
        }
    }
    
    handleClickExitRubrique = (rubrique) => {
        console.log('click on exit rubrique: ' + rubrique)
        $('.slide-transition').style.transform = 'translateX(-100vw)'
        setTimeout(() => {
            $('.' + rubrique).style.transform = 'translateX(-100vw)'
        }, 500)
        setTimeout(() => {
            $('.' + rubrique).style.transform = 'translateX(0)'
            $('.' + rubrique).style.display = 'none'
            if(galleryShown){
                $('.backToTop').classList.toggle('backToTop-apparition')
                $('.previous').classList.toggle('previous-apparition')
            }
        }, 1000)
    }

    handleClickToggleRubrique = () => {

        console.log('click on toggle rubrique:')
        $('.slide-transition').style.transform = 'translateX(-100vw)'
       
        setTimeout(() => {
            $('.about').style.transform = 'translateX(-100vw)'
            $('.contact').style.display = 'flex'            
            $('.slide-transition').style.transform = 'translateX(100vw)'
        }, 500)
        setTimeout(() => {
            $('.about').style.transform = 'translateX(0)'
            $('.about').style.display = 'none'
        }, 1000)
    }

    handleScroll = () => {
       console.log('scroll de handlescroll')
       if(galleryShown){
               //chargement des images au cours du défilement
            const picturesFollowed = $$('img[data-follow = true]')
           const galerie = this.state.galerie
           for(const followed of picturesFollowed){
               const bottomPos = followed.getBoundingClientRect().bottom - 50

       
                if (window.innerHeight >= bottomPos){
                       
                console.log('création')

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
                    else if(place === 'left'){
                        let rank = this.state.leftRank
                        rank += 2
                        if(rank >= galerie.img.length){rank = 1}
                        this.setState ({
                            leftRank : rank,
                            leftCol : [...this.state.leftCol, <ShowPicture galerie = {galerie}  position = 'left' rank = {rank} clicked = { () => this.handleClickPhoto(galerie, rank)}/>]
                        })
                    }
                    else if(place === 'right'){
                        let rank = this.state.rightRank
                        rank += 2
                        console.log('rightrank ' + this.state.rightRank + 'et rank : ' + rank)
                        if(rank >= galerie.img.length){rank = 0}
                        this.setState ({
                            rightRank : rank,
                            rightCol : [...this.state.rightCol, <ShowPicture galerie = {galerie}  position = 'right' rank = {rank} clicked = { () => this.handleClickPhoto(galerie, rank)}/>]
                        })
                    }
                }
       
                   //parallax effect j'accèlère le défilement des images des côtés par rapport à celles du centre
               const fastPictures = $$('img[data-parallax = true]')
               for(const fast of fastPictures){
                   fast.style.transform = 'translateY( ' + 0.5 * $('.show__pictures-column-center').getBoundingClientRect().top + 'px)'
               }
            }
        }
    }

    handleClickPrevious = () => {
        console.log('clic before')
        
        this.previous()
    }

    previous(){
        if(galleryShown){
        galleryShown = false
            
        $('.show__pictures-img').classList.toggle('show__pictures-img-shown')
        $('.show__pictures-img').classList.toggle('step2')

        $('.backToTop').classList.toggle('backToTop-apparition')
        $('.previous').classList.toggle('previous-apparition')

        $('.show__pictures-column-center').setAttribute('style', 'position: static;')
        $('.show__pictures-column-right').setAttribute('style', 'position: static;')
        $('.show__pictures-column-left').setAttribute('style', 'position: static;')
       
        $('.titre').classList.toggle('titreToTop')
        $('.name').classList.toggle('nameToTop')
        $('.show__container').style.overflowY = 'scroll'
        $('.navigation-left').style.transform = 'translateX(0)'
        $('.navigation-right').style.transform = 'translateX(0)'
        
        this.setState({
                leftCol : [],
                rightCol : [],
                centerRank : '2',
                middleCol : []
        })
    }
        else{
            console.log('caca')
        }
    }

    handleClickBackToTop = () => {
        const showContainer = $('.show__container')
        showContainer.scrollTo({top: 0, behavior: 'smooth'})
    }

    handleClickBurger = () => {
        console.log('click')
        const burger = document.getElementsByClassName('burger')
        const rubrique = document.getElementsByClassName('menu-rubrique')
    
            burger[0].classList.toggle('burger-top')
            burger[1].classList.toggle('burger-middle')
            burger[2].classList.toggle('burger-bottom')
            for (const element of rubrique){
                element.classList.toggle('menu-rubrique-apparition')
            }
    }

    handleClickMenu = (idRubrique) => {
        switch (idRubrique){
            case 1 : 
                if(galleryShown){this.previous()}
                const galerie = { ...this.state.galerie }

                idGalerie = 0
                
                galerie.name = galeries[idGalerie].name
                galerie.src = galeries[idGalerie].src
                galerie.color = galeries[idGalerie].color
                galerie.id = galeries[idGalerie].id
                galerie.img = galeries[idGalerie].img
                this.setState({ galerie })
                break
    
            case 2 :
                console.log('contact')
                $('.slide-transition').style.transform = 'translateX(100vw)'
                setTimeout(function(){
                    $('.contact').style.display = 'flex'
                    if(galleryShown){
                        $('.backToTop').classList.toggle('backToTop-apparition')
                        $('.previous').classList.toggle('previous-apparition')
                    }
                }, 500)
                break
    
            case 3 :
                console.log('about')
                $('.slide-transition').style.transform = 'translateX(100vw)'
                setTimeout(function(){
                    $('.about').style.display = 'flex'
                    if(galleryShown){
                        $('.backToTop').classList.toggle('backToTop-apparition')
                        $('.previous').classList.toggle('previous-apparition')
                    }
                }, 500)
                break
    
            default : 
                console.log('pas d id passé')
        }
    }

    handleTouchStart = (e) => {
        e.preventDefault()
        const touches = e.changedTouches
        xStart = touches[0].clientX
        console.log('start : ' + xStart)
    }

    handleTouchEnd = (e, galerie) => {

        if(!galleryShown){
            e.preventDefault()

            const touches = e.changedTouches
            xEnd = touches[0].clientX
            xDelta = xEnd - xStart
            const value = Math.sign(xDelta)

            if(Math.abs(xDelta) < 10){
                console.log('clic')
                this.handleClickPhoto(galerie, 0)
            }
            else{
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
            } 
        }
        else{
            
        }
        
    }

    render(){
        const { galerie, rank } = this.state

        document.documentElement.style.setProperty('--main-color', galerie.color)

        return(
            <Fragment>

                <div className = "header">

                    <div className="menu">
                        <div className = "burger-container" 
                            onClick = { () => this.handleClickBurger() }>
                            <div className = "burger"></div>
                            <div className = "burger"></div>
                            <div className = "burger"></div>
                        </div>

                        <div className="menu-rubrique" onClick = { () => this.handleClickMenu(1)}>
                            Accueil
                        </div>

                        <div className="menu-rubrique" onClick = {() => this.handleClickMenu(2)}>
                            Contact
                        </div>

                        <div className="menu-rubrique" onClick = {() => this.handleClickMenu(3)}>
                            À propos
                        </div>

                    </div>

                    <h1 className = "name"
                        onClick = { () => this.handleClickMenu(3)}>
                    Benedict Priam
                    </h1>

                    <Social />

                </div>

            <div className="show__container"
                onScroll = { () => this.handleScroll()}
            >
                <div className="show__pictures-column show__pictures-column-left">
                    <NavigationArrow 
                        direction='left' 
                        chgt = { () => this.handleClickArrow(-1)}/>
                    {this.state.leftCol}
                </div>

                <div className="navigation-chevrons navigation-chevrons-left"
                    onClick = { () => this.handleClickArrow(-1)}>
                    <FontAwesomeIcon icon={faChevronLeft} />
                </div>

                <div className="show__pictures-column show__pictures-column-center"
                    onTouchStart = { (e) => this.handleTouchStart(e)}
                    onTouchEnd = { (e) => this.handleTouchEnd(e, galerie)}>
                        <img
                            className="show__pictures-img"
                            data-follow='true'
                            data-column='center'
                            src = {galerie.img[0].src} 
                            alt = {galerie.name}
                            onClick = { () => this.handleClickPhoto(galerie, 0) }
                        />
                        {this.state.middleCol}
                    </div>

                <div className="show__pictures-column show__pictures-column-right">
                    <NavigationArrow 
                        direction='right' 
                        chgt = { () => this.handleClickArrow(1)}/>
                    {this.state.rightCol}
                </div>

                <div className="navigation-chevrons navigation-chevrons-right"
                    onClick = { () => this.handleClickArrow(1)}>
                    <FontAwesomeIcon icon={faChevronRight} />
                </div>

                <h2 className="titre">
                    {galerie.name}
                </h2>
                
            </div>

            {this.state.clicked ? 
                <ImgDetailContainer 
                galerie = {galerie}
                rank = {rank}
                exit = { this.handleClickExit }
                /> 
                : null}


{/* -------------------- CONTACT */}
            <div className="rubrique contact">
                <svg className="rubrique-curvedline-container"
                     viewBox="0 0 264.58 79.375">
                    <g transform="translate(0 -217.62)">
                        <g transform="matrix(1.073 0 0 1.0805 66.5 -138.05)" className="rubrique-curvedline">
                            <path d="m-61.84 356.02s71.782-29.682 109.05-26.46c16.457 1.423 31.841 10.397 45.436 19.778 19.315 13.329 29.875 37.034 49.178 50.38 1.9196 1.3273 6.4145 2.8063 6.4145 2.8063"/>
                            <path d="m-61.84 374.77s31.884-16.974 49.329-20.62c10.815-2.2603 22.677-4.0794 33.141-0.53454 9.7914 3.3168 17.291 11.664 24.322 19.243 8.1162 8.7502 20.045 29.667 20.045 29.667"/>
                            <path d="m-61.84 378.9s40.161-8.7562 60.221-13.224c16.582-3.6926 32.96-8.4047 49.712-11.225 11.05-1.8606 22.207-4.0422 33.409-3.7418 5.4172 0.14525 11.179 0.26938 16.036 2.6727 5.3666 2.6554 9.7695 7.316 13.096 12.294 4.7621 7.1265 6.0279 16.048 9.0872 24.054 1.6321 4.2714 4.9445 12.796 4.9445 12.796"/>
                            <path d="m-61.84 364.4s25.735 8.5221 38.904 11.666c9.3318 2.2278 18.827 3.7637 28.331 5.0781 8.1577 1.1283 16.359 2.0954 24.589 2.4054 8.0144 0.30187 16.076 0.28025 24.054-0.53454 5.4064-0.55211 10.719-1.8189 16.036-2.94 7.8867-1.6628 15.531-4.5458 23.52-5.6127 8.4815-1.1326 17.119-1.3629 25.658-0.80179 5.4952 0.36114 11.021 1.1174 16.303 2.6727 6.4302 1.893 12.534 4.8504 18.442 8.0181 4.7694 2.5575 8.991 6.0342 13.631 8.8199 5.5047 3.305 16.838 9.3544 16.838 9.3544"/>
                            <path d="m-61.84 383.44s19.369 0.0884 28.966 1.2256c9.1959 1.0898 18.114 3.9038 27.261 5.3454 8.154 1.285 16.341 2.5928 24.589 2.9399 7.6596 0.32239 15.351-0.10054 22.985-0.80179 7.804-0.71684 15.534-2.115 23.252-3.4745 5.73-1.0094 11.363-2.5388 17.105-3.4745 6.4675-1.0539 12.958-2.4307 19.511-2.4054 10.962 0.0424 22.094 1.1722 32.607 4.2763 5.7711 1.7039 11.001 4.9054 16.303 7.7508 4.392 2.357 12.816 7.705 12.816 7.705"/>
                        </g>
                    </g>
                </svg>

                <div className="rubrique-container">
                    <div className="rubrique-contact-left">
                        <h2 className="rubrique-title">
                            Contact
                        </h2>
                        <p>
                            Vous avez besoin d'un photographe pour immortaliser un événement (un mariage, un baptème), pour agrémenter vos profils professionnels ou tout simplement pour des photos de vous et de vos proches.
                        </p>
                        <p>
                            N'hésitez plus, contactez-moi.
                        </p>
                    </div>
                    <div className="rubrique-contact-right">
                        <ContactForm/>
                    </div>
                </div>

                <div className="rubrique-exitcross"
                     onClick={ () => this.handleClickExitRubrique('contact') }>
                    <FontAwesomeIcon icon={faTimes} />
                </div>

            </div>

{/* -------------------- ABOUT */}

            <div className="rubrique about">
                <svg className="rubrique-curvedline-container"
                     viewBox="0 0 264.58 79.375">
                    <g transform="matrix(-1 0 0 1 264.58 -217.62)">
                        <g transform="matrix(1.073 0 0 1.0805 66.5 -138.05)" className="rubrique-curvedline">
                        <path d="m-61.84 356.02s71.782-29.682 109.05-26.46c16.457 1.423 31.841 10.397 45.436 19.778 19.315 13.329 29.875 37.034 49.178 50.38 1.9196 1.3273 6.4145 2.8063 6.4145 2.8063"/>
                        <path d="m-61.84 374.77s31.884-16.974 49.329-20.62c10.815-2.2603 22.677-4.0794 33.141-0.53454 9.7914 3.3168 17.291 11.664 24.322 19.243 8.1162 8.7502 20.045 29.667 20.045 29.667"/>
                        <path d="m-61.84 378.9s40.161-8.7562 60.221-13.224c16.582-3.6926 32.96-8.4047 49.712-11.225 11.05-1.8606 22.207-4.0422 33.409-3.7418 5.4172 0.14525 11.179 0.26938 16.036 2.6727 5.3666 2.6554 9.7695 7.316 13.096 12.294 4.7621 7.1265 6.0279 16.048 9.0872 24.054 1.6321 4.2714 4.9445 12.796 4.9445 12.796"/>
                        <path d="m-61.84 364.4s25.735 8.5221 38.904 11.666c9.3318 2.2278 18.827 3.7637 28.331 5.0781 8.1577 1.1283 16.359 2.0954 24.589 2.4054 8.0144 0.30187 16.076 0.28025 24.054-0.53454 5.4064-0.55211 10.719-1.8189 16.036-2.94 7.8867-1.6628 15.531-4.5458 23.52-5.6127 8.4815-1.1326 17.119-1.3629 25.658-0.80179 5.4952 0.36114 11.021 1.1174 16.303 2.6727 6.4302 1.893 12.534 4.8504 18.442 8.0181 4.7694 2.5575 8.991 6.0342 13.631 8.8199 5.5047 3.305 16.838 9.3544 16.838 9.3544"/>
                        <path d="m-61.84 383.44s19.369 0.0884 28.966 1.2256c9.1959 1.0898 18.114 3.9038 27.261 5.3454 8.154 1.285 16.341 2.5928 24.589 2.9399 7.6596 0.32239 15.351-0.10054 22.985-0.80179 7.804-0.71684 15.534-2.115 23.252-3.4745 5.73-1.0094 11.363-2.5388 17.105-3.4745 6.4675-1.0539 12.958-2.4307 19.511-2.4054 10.962 0.0424 22.094 1.1722 32.607 4.2763 5.7711 1.7039 11.001 4.9054 16.303 7.7508 4.392 2.357 12.816 7.705 12.816 7.705"/>
                        </g>
                    </g>
                </svg>

                <div className="rubrique-container">

                    <div className="rubrique-about-left">
                        <div className="about-portrait-container">
                        <img className="portrait"
                            src="https://live.staticflickr.com/1866/buddyicons/156511039@N02_r.jpg?1535820205#156511039@N02" 
                            alt="Benedict Priam"/>
                        <div className="portrait-name">
                            Benedict Priam
                        </div>
                        </div>
                    </div>

                    <div className="rubrique-about-right">
                        <h2 className="rubrique-title">
                            À propos ...
                        </h2>
                        <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam, quisquam esse. Voluptatibus dolorem, illo atque, tempore animi fugit quod, exercitationem adipisci nesciunt aliquam rerum illum.
                        </p>

                        <p>
                        Suivez-moi sur les réseaux ...
                        </p>

                        <p className = "about-social">

                            <a href="https://www.flickr.com/people/lilbennyhill/" 
                            target="_blank"
                            rel="noopener" 
                            className = "about-social__icon about-social__icon-flickr"
                            >
                                <FontAwesomeIcon icon={faFlickr} />
                            </a>

                            <a href="#"  
                            target="_blank"
                            rel="noopener" 
                            className = "about-social__icon social__icon-instagram">
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>

                            <span
                            className = "about-social__icon about-social__icon-contact"
                            onClick={ () => this.handleClickToggleRubrique()}>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </span>

                        </p>

                    </div>
                </div>

                <div className="rubrique-exitcross"
                     onClick={ () => this.handleClickExitRubrique('about') }>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                
            </div>
            
            <div className = "footer">
                <div className = "previous" >
                    <div className = "previous-icon"
                        onClick = { () => this.handleClickPrevious() }>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </div>
                </div>

                <div className = "backToTop" >
                    <div className = "backToTop-icon"
                        onClick = { () => this.handleClickBackToTop() }>
                        <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                </div>

                <a href="https://www.maxime-malfilatre.com/"
                    target="_blank"
                    rel="noopener">
                    <div className="link">
                        <span>
                            &#123;
                        </span>
                        <span className="before">
                            <span className="before-text">
                                site&nbsp;:
                            </span>
                        </span>
                        <span className="my-name">
                            m
                        </span>
                        <span className="after">
                            <span className="after-text"> 
                                <span className="spin">axe</span>
                                <span>w</span>
                            </span>
                        </span>
                        <span>
                            &#125;
                        </span>
                    </div>
                </a>
            </div>  
        </Fragment>

        )
    }
}

export default Carousel