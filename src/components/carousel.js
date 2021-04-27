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
                    <div className="rubrique-container">

<svg
    className="contourBen"

    viewBox="0 0 79.375 79.375"
>
        <path
        className="contourBen-lines"
        d="m 89.401657,204.92564 -0.801809,3.74178 1.870887,7.75081 -1.202714,6.28084 c 0,0 -1.905822,10.03676 -1.737251,15.10073 0.106972,3.21348 -0.45463,7.1357 1.737251,9.48806 1.097414,1.17776 3.087082,1.45353 4.677217,1.20272 3.124996,-0.4929 8.018082,-5.07812 8.018082,-5.07812 l 5.21176,-5.47903 2.00452,1.87089 2.6727,2.80633 -0.40091,3.60814 c 0,0 -2.97348,0.82096 -4.00904,1.87088 -1.37207,1.39109 -2.37801,3.39169 -2.40543,5.34539 -0.0162,1.15806 0.92613,2.12415 1.33635,3.20724 0.65862,1.7389 1.80407,5.27858 1.80407,5.27858 l 45.65897,-0.0727 -0.4236,-11.21949 -8.95353,-18.8425 -6.01357,-16.83798 c 0,0 -4.13922,-5.05015 -7.08264,-6.01356 -1.7826,-0.58346 -5.61266,0.4009 -5.61266,0.4009 l -3.34087,0.93544 -1.06907,-3.34086 1.20271,-3.0736 -0.13364,-3.0736 -0.93544,-0.66818 c 0,0 -0.942,-4.17152 -2.13816,-5.87993 -1.0337,-1.47637 -2.44212,-2.87756 -4.14267,-3.4745 -1.84982,-0.64934 -4.03218,-0.52158 -5.87993,0.13363 -1.64595,0.58365 -3.13243,1.78274 -4.14268,3.20724 -0.89636,1.26392 -1.27281,2.87305 -1.46998,4.40995 -0.0852,0.66421 0.13363,2.00452 0.13363,2.00452 l -2.53906,0.53454 -3.741773,-2.80633 -3.474503,-3.34087 -4.276313,-0.66818 -0.267271,3.74178 -2.00452,2.13815 z"/>
     <path
        className="contourBen-lines"
        d="m 96.21703,219.09093 -0.133636,7.34991 1.069078,5.7463 3.474508,-6.94901 -1.336352,-4.40995 -3.073598,-1.73725 -1.069078,-1.5368 -4.476766,-5.87993 1.00226,-3.54132 -2.271789,-3.20724"/>
     <path
        className="contourBen-lines"
        d="m 103.83421,200.5157 0.13363,15.63527 2.53907,3.8754 4.27631,-1.06908 -0.80181,-1.46998 -2.13816,-1.20271 -4.00904,-9.48806"/>
     <path
        className="contourBen-lines"
        d="m 109.98141,217.48731 6.41447,-1.73725 2.33861,-4.07586"/>
     <path
        className="contourBen-lines"
        d="m 89.401657,204.92564 4.944485,0.80181 2.939966,2.6727 3.608142,0.0668 0.66817,-2.27179 -0.26727,-5.14492"/>
     <path
        className="contourBen-lines"
        d="m 132.6325,233.32303 -10.55714,14.09847 -7.41673,-1.60362 -2.80633,-3.20723"/>
     <path
        className="contourBen-lines"
        d="m 100.62698,225.23813 6.5481,12.6953"/>
     <path
        className="contourBen-lines"
        d="m 106.50691,220.02637 c 0,0 3.91389,5.88736 6.61492,8.08491 1.79278,1.4586 6.14719,3.20723 6.14719,3.20723 l 1.06908,3.54132"/>
   <path
      className="contourBen-lines"
      d="m 103.40899,201.93311 3.66586,-0.11447 -2.43883,6.74855"
      />
</svg>

                            
                        <div className="rubrique-left">
                            Vous avez un projet ? 
                            <br/>
                            Contactez-moi...
                        </div>
                        <div className="rubrique-right">
                            <ContactForm/>
                        </div>
                        <svg className="rubrique-curvedline-container"
                        height="330"
                        width="1000"
                                viewBox="0 0 1000 330">
                                    <path 
                                        className="rubrique-curvedline"
                                        d="M-67.87 210.44C14.23 210.52 95.03 251.69 257.94 251.69 420.84 251.69 419.44 210.26 583.74 210.44 748.05 210.62 822.16 335.17 909.55 337.39
                                        M-112.05 249.79C-28.09 249.87 54.61 291.04 221.26 291.04 387.92 291.04 386.72 249.65 554.58 249.79 722.44 249.93 799.22 369.37 887.89 371.24
                                        M-163 135.11C-45.05 134.37 60.87 24.96 296.08 26.21 531.28 27.46 616.83 325.89 755.15 340.46
                                        M-1.78 189.63C110.23 189.35 266.63 111.48 439.79 113.73 612.94 115.98 576.82 362.62 660.57 392.37
                                        M-183.88 231.55C-100.88 229.87-32.56 118.11 128.68 119.35 289.91 120.59 339.38 372.39 441.23 390.36"/>
                        </svg>
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