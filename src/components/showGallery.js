import {ImgDetail} from './imgDetail'

export const showGallery = (galerie) => {
    const titre = document.querySelector('.titre'),
    name = document.querySelector('.name'),
    container = document.querySelector('.show__container'),
    navigationLeft = document.querySelector('.navigation-left'),
    navigationRight = document.querySelector('.navigation-right'),
    mainPicture = document.querySelector('.show__pictures-img'),
    leftPictureContainer = document.querySelector('.show__pictures-column-left'),
    centerPictureContainer = document.querySelector('.show__pictures-column-center'),
    rightPictureContainer = document.querySelector('.show__pictures-column-right'),
    backToTop = document.querySelector('.backToTop')

    mainPicture.classList.add('show__pictures-img-shown')    
    mainPicture.classList.add('step2')
    mainPicture.addEventListener('click', () => { 
        console.log('click sur : ' + mainPicture.alt)
        ImgDetail(galerie.img[0])
    })

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
        const picturesFollowed = document.querySelectorAll('img[data-follow = true]')
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
        const fastPictures = document.querySelectorAll('img[data-parallax = true]')
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
            ImgDetail(galerie.img[rank])
            //Modifier le state de carousel en mettant à jour le rank

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
