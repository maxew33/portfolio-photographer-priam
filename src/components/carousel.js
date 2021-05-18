import React, {Component, Fragment} from 'react'
import {gallery} from './gallery'
// import {showGallery} from './showGallery'

import '../style/carousel.css'
import NavigationArrow from './navigationArrow'
import ImgDetailContainer from './imgDetailContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ShowPicture from './showPicture'
import Social from './social'
import ContactForm from './contactForm'

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
            $('.exitcross').style.display = 'block'
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
    
    handleClickExitRubrique = (rubrique) => {
        console.log('click on exit rubrique: ' + rubrique)
        $('.slide-transition').style.left = '-100vw'
        setTimeout(() => {
            $('.' + rubrique).style.left = '-100vw'
        }, 500)
        setTimeout(() => {
            $('.' + rubrique).style.left = '0'
            $('.' + rubrique).style.display = 'none'
        }, 1000)
    }

    handleScroll = () => {
       console.log('scroll de handlescroll')
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
                        <div className="rubrique-left">
                            <h2 className="contact-title">
                            Contact
                            </h2>
                            <p>
                            Vous avez besoin d'un photographe pour immortaliser un événement (un mariage, un baptème), pour agrémenter vos profils professionnels ou tout simplement pour des photos de vous et de vos proches.
                            </p>
                            <p>
                            N'hésitez plus, contactez-moi.
                            </p>
                        </div>
                        <div className="rubrique-right">
                            <ContactForm/>
                        </div>
                    </div>
                    <div className="rubrique-exitcross"
                        onClick={ () => this.handleClickExitRubrique('contact') }>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>

                <div className="rubrique about">
                    <div className="rubrique-container">
                        <div className="rubrique-title">
                            Benedict Priam
                            <br/>
                            photographe
                        </div>
                        <div className="rubrique-left">
                            <img className="portrait"
                            src="https://live.staticflickr.com/1866/buddyicons/156511039@N02_r.jpg?1535820205#156511039@N02" 
                            alt="Benedict Priam"/>
                        </div>
                        <div className="rubrique-right">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque adipisci omnis quasi debitis provident iure perferendis consequatur tenetur earum, esse, in modi facilis soluta labore iusto. Maiores porro pariatur harum nihil id eius! Vel debitis numquam alias. Ab, rerum laudantium? Quaerat eaque tempora dolor omnis deserunt fugiat libero distinctio quis officiis. Laboriosam ex fugiat perspiciatis consequuntur? Tempora, quisquam ipsum. Vero adipisci id, eligendi beatae consequatur impedit dolore debitis, praesentium sapiente nostrum maxime in temporibus dolor asperiores laudantium minus cupiditate reprehenderit doloribus delectus dolorum eos dolorem atque officia? Esse recusandae nobis, unde eos, impedit, hic accusantium eum magnam animi ullam quidem.
                        </div>
                    </div>
                    <div>reseaux sociaux et contact</div>
                    <div className="rubrique-exitcross"
                        onClick={ () => this.handleClickExitRubrique('about') }>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>

            </Fragment>

        )
    }
}

export default Carousel