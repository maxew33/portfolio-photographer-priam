export const showGallery = (galerie) => {
    const titre = document.querySelector('.titre'),
    name = document.querySelector('.name'),
    showNavigation = document.getElementsByClassName('show__navigation'),
    mainPictureContainer = document.querySelector('.show__pictures'),
    mainPicture = document.querySelector('.show__pictures-img')

    let imageRank = 2

    console.log('showGallery, galerie : ' + galerie.img[1].name)
    
    mainPictureContainer.classList.add('show__pictures-disappear')
    mainPicture.classList.add('show__pictures-img-shown')
    mainPicture.dataset.follow = true
    mainPicture.dataset.coef = 1.1
    mainPicture.dataset.pos = 'main'
    mainPicture.dataset.bottom = window.innerHeight
    console.log(mainPicture.dataset.bottom)

    titre.classList.add('titreToTop')
    name.classList.add('nameToTop')
    for ( const element of showNavigation){
        element.classList.add('disappear')
    }

    // ajouter 2 div dans mainPictureContainer pour les img de gauche et de droite
    // setTimeout(function(){ 
    //     const pictureLeft = document.createElement('img')
    //     pictureLeft.className = "show__pictures-img-left"
    //     pictureLeft.alt = galerie.img[1].name
    //     pictureLeft.src = galerie.img[1].src
    //     pictureLeft.dataset.follow = true
    //     pictureLeft.dataset.coef = 0.9
    //     pictureLeft.dataset.pos = 'left'
    //     mainPictureContainer.appendChild(pictureLeft)
    //     pictureLeft.addEventListener('click', () => {console.log('click picture left')})
    //     pictureLeft.dataset.bottom = pictureLeft.getBoundingClientRect().bottom

    //     const pictureRight = document.createElement('img')
    //     pictureRight.className = "show__pictures-img-right"
    //     pictureRight.src = galerie.img[2].src
    //     pictureRight.alt = galerie.img[2].name
    //     pictureRight.dataset.follow = true
    //     pictureRight.dataset.coef = 1
    //     pictureRight.dataset.pos = 'right'
    //     mainPictureContainer.appendChild(pictureRight)
    //     pictureRight.dataset.bottom = pictureRight.getBoundingClientRect().bottom

    // }, 500);

    mainPictureContainer.addEventListener('wheel', (e) => {
        const picturesFollowed = document.querySelectorAll('img[data-follow = true]')

        for(const followed of picturesFollowed){

            const bottomPos = followed.getBoundingClientRect().bottom
            const deltaBottom = window.innerHeight - bottomPos

            if(!followed.dataset.bottomCalc){
                console.log('old bottom : ' + followed.dataset.bottom)
                console.log(typeof(followed.dataset.bottom))
                followed.dataset.bottom = parseInt(followed.dataset.bottom)
                console.log(typeof(followed.getBoundingClientRect().height))
                followed.dataset.bottom = parseInt(followed.dataset.bottom) + followed.getBoundingClientRect().height
                console.log('new bottom : ' + followed.dataset.bottom)
                followed.dataset.bottomCalc = true
            }

            console.log('height : ' + followed.getBoundingClientRect().height)
            console.log('bottom : ' + followed.getBoundingClientRect().bottom)
            console.log('height - bottom = ' + (followed.getBoundingClientRect().bottom - followed.getBoundingClientRect().height))

            if (window.innerHeight >= followed.getBoundingClientRect().bottom){
                followed.dataset.follow = false
                console.log('top : ' + followed.getBoundingClientRect().top)
                console.log('bottom : ' + bottomPos)
                console.log(followed.dataset.bottom)
                if (followed.dataset.pos === 'main'){
                    imageRank++
                console.log(imageRank)
                imageRank < galerie.img.length-1 ? showNewPicture(followed.dataset.pos, imageRank, parseInt(followed.dataset.bottom)) : console.log('fin des images')
                }
            }
        }
    })

    const showNewPicture = (position, rank, bottom) =>{

        // console.log('new picture à ' + position)
        // console.log('position : ' + bottom)
        const topImg = bottom + 250
        // console.log('top : ' + topImg)
        // console.log(typeof bottom)

        const picture = document.createElement('img')
        picture.className = "show__pictures-img-" + position
        picture.src = galerie.img[rank].src
        picture.alt = galerie.img[rank].name
        picture.dataset.follow = true
        picture.dataset.coef = 1
        picture.dataset.pos = position
        picture.dataset.bottomCalc = false
        picture.dataset.bottom = bottom
        mainPictureContainer.appendChild(picture)
        picture.setAttribute('style', 'top : ' + (bottom + 50) + 'px;')

        // console.log('old bottom : ' + bottom + ' / et new bottom : ' + (picture.getBoundingClientRect().height + bottom) + ' / height : ' +  picture.getBoundingClientRect().height)
        // picture.dataset.bottom = picture.getBoundingClientRect().height + bottom + 50
    }

    // mainPictureContainer.addEventListener('wheel', (e) => {
    //     console.log(e.deltaY / Math.abs(e.deltaY))

    //     const leftPictures = document.querySelectorAll('.show__pictures-img-left'),
    //     rightPictures = document.querySelectorAll('.show__pictures-img-right'),
    //     middlePictures = document.querySelectorAll('.show__pictures-img')


    //     console.log(leftPictures)

    //         for(const picture of leftPictures){
    //             const pictureTop = picture.getBoundingClientRect().top
    //             console.log(pictureTop)
    //             // picture.style.top = pictureTop + (300 * (e.deltaY / Math.abs(e.deltaY))) + 'px'
    //             picture.style.transform = 'translateY(' + (300 * (e.deltaY / Math.abs(e.deltaY))) + 'px)'
    //         }
            
    //         for(const picture of rightPictures){
    //             const pictureTop = picture.getBoundingClientRect().top
    //             console.log(pictureTop)
    //             picture.style.top = pictureTop + (450 * (e.deltaY / Math.abs(e.deltaY))) + 'px'
    //         }

    //         for(const picture of middlePictures){
    //             const pictureTop = picture.getBoundingClientRect().top
    //             console.log(pictureTop)
    //             picture.style.transform = 'translateY(' + pictureTop + (200 * (e.deltaY / Math.abs(e.deltaY))) + 'px)'
    //         }

    // })

}